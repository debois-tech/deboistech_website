"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/content";

/**
 * Single-open accordion.
 *
 * The vanilla widget animated a max-height it measured with
 * scrollHeight on every toggle. Using a CSS grid-rows transition
 * animates to the content's natural height with no measurement,
 * and keeps the closed panel out of the accessibility tree.
 */
export function FaqAccordion({
  items,
  variant = "light",
}: {
  items: FaqItem[];
  variant?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const styles =
    variant === "dark"
      ? {
          row: "border-white/10",
          question: "text-primary-50",
          chevron: "text-white/50",
          answer: "text-primary-200",
        }
      : {
          row: "border-gray-100",
          question: "text-gray-900",
          chevron: "text-gray-300",
          answer: "text-gray-500",
        };

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={item.q}
            className={`border-b ${styles.row} ${index === 0 ? "border-t" : ""}`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-sm font-semibold ${styles.question}`}
              >
                <span>{item.q}</span>
                <svg
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${styles.chevron} ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </button>
            </h3>

            {/*
              `inert` (not `hidden`) keeps the collapsed panel out of the
              tab order and accessibility tree while leaving it in the
              render tree so the grid-rows transition can animate.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className={`pb-5 text-sm leading-6 ${styles.answer}`}>
                  <p>{item.a}</p>
                  {item.bullets && (
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
