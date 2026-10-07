"use client";

import { useState, useSyncExternalStore } from "react";
import { BlogStudio } from "@/components/admin/blog-studio";
import { Field, TOOL_BTN } from "@/components/admin/json-editor";
import { DATASETS } from "@/components/admin/datasets";
import type { Json } from "@/lib/json-edit";
import type { BlogPost } from "@/lib/types";

const storageKey = (key: string) => `deboistech-admin:${key}`;

function loadDraft(key: string, published: Json): Json {
  try {
    const raw = localStorage.getItem(storageKey(key));
    return raw ? (JSON.parse(raw) as Json) : published;
  } catch {
    return published;
  }
}

function download(file: string, data: Json) {
  const blob = new Blob([JSON.stringify(data, null, 2) + "\n"], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = file;
  link.click();
  URL.revokeObjectURL(url);
}

// localStorage only exists in the browser. useSyncExternalStore gives the
// server a stable "not mounted" value, so hydration never mismatches.
const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

function Panel() {
  // /admin#blog opens the blog studio directly.
  const [activeKey, setActiveKey] = useState(
    () => DATASETS.find((d) => d.key === window.location.hash.slice(1))?.key ?? DATASETS[0].key,
  );
  const [notice, setNotice] = useState("");
  const [drafts, setDrafts] = useState<Record<string, Json>>(() =>
    Object.fromEntries(DATASETS.map((d) => [d.key, loadDraft(d.key, d.published)])),
  );

  const dataset = DATASETS.find((d) => d.key === activeKey)!;
  const value = drafts[activeKey];
  const isChanged = (key: string) =>
    JSON.stringify(drafts[key]) !== JSON.stringify(DATASETS.find((d) => d.key === key)!.published);

  function update(next: Json) {
    setDrafts((prev) => ({ ...prev, [activeKey]: next }));
    try {
      localStorage.setItem(storageKey(activeKey), JSON.stringify(next));
    } catch {
      setNotice("Browser storage is full or blocked. Export now so nothing is lost.");
    }
  }

  function reset() {
    try {
      localStorage.removeItem(storageKey(activeKey));
    } catch {
      /* nothing to clear */
    }
    setDrafts((prev) => ({ ...prev, [activeKey]: dataset.published }));
    setNotice("");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(value, null, 2) + "\n");
      setNotice(`Copied ${dataset.file} to the clipboard.`);
    } catch {
      setNotice("Copy blocked by the browser. Use Export instead.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <nav aria-label="Content sections" className="min-w-0">
        <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
          {DATASETS.map((d) => (
            <li key={d.key} className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveKey(d.key);
                  setNotice("");
                  window.history.replaceState(null, "", `#${d.key}`);
                }}
                aria-current={d.key === activeKey ? "page" : undefined}
                className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  d.key === activeKey
                    ? "border-primary-600 bg-primary-50 text-primary-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary-300"
                }`}
              >
                {d.label}
                {isChanged(d.key) && (
                  <span
                    className="h-2 w-2 rounded-full bg-amber-500"
                    title="Unexported changes"
                    aria-label="Unexported changes"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{dataset.label}</h2>
            <p className="mt-1 max-w-xl text-sm text-gray-500">{dataset.hint}</p>
            <p className="mt-1 text-xs text-gray-400">
              File: <code className="font-mono">content/{dataset.file}</code>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={TOOL_BTN} onClick={copy}>
              Copy JSON
            </button>
            <button type="button" className={TOOL_BTN} onClick={reset} disabled={!isChanged(activeKey)}>
              Discard changes
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              onClick={() => download(dataset.file, value)}
            >
              Export {dataset.file}
            </button>
          </div>
        </div>

        <p role="status" className="mt-3 min-h-5 text-sm font-medium text-primary-700">
          {notice}
        </p>

        <div className="mt-4">
          {dataset.key === "blog" ? (
            <BlogStudio posts={value as unknown as BlogPost[]} onChange={(p) => update(p as unknown as Json)} />
          ) : (
            <Field
              key={activeKey}
              name=""
              label=""
              value={value}
              template={dataset.published}
              onChange={update}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export function Dashboard() {
  const mounted = useMounted();
  return mounted ? <Panel /> : <p className="text-sm text-gray-500">Loading editor…</p>;
}
