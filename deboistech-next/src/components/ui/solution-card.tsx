import Link from "next/link";
import type { Service } from "@/lib/content";
import { Icon } from "@/components/ui/icon";

export function SolutionCard({
  item,
  ctaHref = "/contact",
}: {
  item: Service;
  ctaHref?: string;
}) {
  return (
    <div className="svc-card">
      <div className="svc-card__header">
        <div className="svc-card__icon-wrap">
          <Icon d={item.iconPath} className="svc-card__icon" />
        </div>
        <h3 className="svc-card__title">{item.title}</h3>
      </div>
      <div className="svc-card__divider" />
      <p className="svc-card__problem">{item.problem}</p>
      <p className="svc-card__solution">
        <span className="svc-card__arrow" aria-hidden="true">
          &rarr;
        </span>{" "}
        {item.solution}
      </p>
      <Link href={ctaHref} className="svc-card__cta">
        {item.ctaLabel} &rarr;
      </Link>
    </div>
  );
}
