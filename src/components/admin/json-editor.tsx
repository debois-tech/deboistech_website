"use client";

import { blankLike, humanize, isObject, move, summaryOf, type Json } from "@/lib/json-edit";

export const INPUT =
  "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600";
export const MINI_BTN =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 bg-white px-2 text-xs font-semibold text-gray-600 transition-colors hover:border-primary-600 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-40";
export const TOOL_BTN =
  "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-primary-600 hover:text-primary-700";

// Fields that hold prose or path data get a textarea. Chosen by field name (or
// by the published value's length), never by the live value, so the control
// does not swap, and lose focus, while you type.
const LONG_KEY = /description|content|solution|problem|subtitle|^a$|iconPath/i;

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
      )}
      {children}
    </label>
  );
}

function Text({
  name,
  label,
  value,
  template,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  template?: Json;
  onChange: (v: string) => void;
}) {
  const long = LONG_KEY.test(name) || (typeof template === "string" && template.length > 90);
  const mono = /iconPath/i.test(name);
  return (
    <Labeled label={label}>
      {long ? (
        <textarea
          className={`${INPUT} ${mono ? "font-mono text-xs" : ""}`}
          rows={mono ? 3 : 4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </Labeled>
  );
}

function ListField({
  name,
  label,
  value,
  template,
  onChange,
}: {
  name: string;
  label: string;
  value: Json[];
  template?: Json[];
  onChange: (v: Json[]) => void;
}) {
  const sample = template?.[0] ?? value[0];
  const set = (i: number, v: Json) => onChange(value.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const objects = isObject(sample);

  return (
    <fieldset className="min-w-0 rounded-xl border border-gray-200 p-4">
      <legend className="px-2 text-sm font-bold text-gray-900">
        {label} <span className="font-normal text-gray-400">({value.length})</span>
      </legend>
      <ul className="space-y-3">
        {value.map((item, i) => (
          <li key={i} className="rounded-lg border border-gray-100 bg-gray-50/60 p-3">
            {objects ? (
              <details>
                <summary className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-sm font-semibold text-gray-800">
                    {summaryOf(item, i)}
                  </span>
                  <span className="flex shrink-0 gap-1" onClick={(e) => e.preventDefault()}>
                    <button
                      type="button"
                      className={MINI_BTN}
                      aria-label="Move up"
                      disabled={i === 0}
                      onClick={() => onChange(move(value, i, -1))}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className={MINI_BTN}
                      aria-label="Move down"
                      disabled={i === value.length - 1}
                      onClick={() => onChange(move(value, i, 1))}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className={MINI_BTN}
                      aria-label="Remove"
                      onClick={() => remove(i)}
                    >
                      ✕
                    </button>
                  </span>
                </summary>
                <div className="mt-4">
                  <Field
                    name={name}
                    label=""
                    value={item}
                    template={sample}
                    onChange={(v) => set(i, v)}
                  />
                </div>
              </details>
            ) : (
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <Field
                    name={name}
                    label={`#${i + 1}`}
                    value={item}
                    template={sample}
                    onChange={(v) => set(i, v)}
                  />
                </div>
                <button
                  type="button"
                  className={`${MINI_BTN} mt-6`}
                  aria-label="Remove"
                  onClick={() => remove(i)}
                >
                  ✕
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`${TOOL_BTN} mt-3`}
        onClick={() => onChange([...value, blankLike(sample ?? "")])}
      >
        + Add
      </button>
    </fieldset>
  );
}

/**
 * Renders any JSON value as a form. `template` is the published value; it
 * sizes new list items so "+ Add" works even after a list was emptied.
 */
export function Field({
  name,
  label,
  value,
  template,
  onChange,
}: {
  name: string;
  label: string;
  value: Json;
  template?: Json;
  onChange: (v: Json) => void;
}) {
  if (typeof value === "string") {
    return <Text name={name} label={label} value={value} template={template} onChange={onChange} />;
  }
  if (typeof value === "number") {
    return (
      <Labeled label={label}>
        <input
          className={INPUT}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </Labeled>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          className="h-4 w-4 accent-emerald-600"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    );
  }
  if (Array.isArray(value)) {
    return (
      <ListField
        name={name}
        label={label}
        value={value}
        template={Array.isArray(template) ? template : undefined}
        onChange={onChange}
      />
    );
  }
  if (isObject(value)) {
    const tpl = isObject(template) ? template : undefined;
    return (
      <div className="space-y-4">
        {Object.entries(value).map(([key, child]) => (
          <Field
            key={key}
            name={key}
            label={humanize(key)}
            value={child}
            template={tpl?.[key]}
            onChange={(v) => onChange({ ...value, [key]: v })}
          />
        ))}
      </div>
    );
  }
  return null;
}
