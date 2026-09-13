"use client";

import { useEffect, useState } from "react";
import {
  SERVICE_TIERS,
  SERVICES,
  type ServiceTierId,
} from "@/lib/content";
import { SolutionCard } from "@/components/ui/solution-card";

const TIER_IDS = SERVICE_TIERS.map((tier) => tier.id);

function isTierId(value: string): value is ServiceTierId {
  return (TIER_IDS as string[]).includes(value);
}

/**
 * Tabbed 3-tier services grid.
 *
 * Deep links keep working: /services#scale opens the Scale tier, which
 * is what the footer's Build/Scale/Accelerate links rely on.
 */
export function ServiceTiers() {
  const [active, setActive] = useState<ServiceTierId>("build");

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isTierId(hash)) setActive(hash);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <>
      <div className="svc-tier-tabs" role="tablist" aria-label="Service tiers">
        {SERVICE_TIERS.map((tier) => {
          const selected = tier.id === active;
          return (
            <button
              key={tier.id}
              type="button"
              role="tab"
              id={`tab-${tier.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tier.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tier.id)}
              className={`svc-tier-tab${selected ? " svc-tier-tab--active" : ""}`}
            >
              <span className="svc-tier-tab__label">{tier.label}</span>
              <span className="svc-tier-tab__hook">{tier.hook}</span>
            </button>
          );
        })}
      </div>

      <div className="svc-tier-panels">
        {SERVICE_TIERS.map((tier) => {
          if (tier.id !== active) return null;
          const services = SERVICES.filter((service) => service.tier === tier.id);

          return (
            <div
              key={tier.id}
              role="tabpanel"
              id={`panel-${tier.id}`}
              aria-labelledby={`tab-${tier.id}`}
              className="svc-tier-panel"
            >
              <div className="svc-cards-grid mobile-scroll">
                {services.map((service) => (
                  <SolutionCard key={service.title} item={service} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
