import { PROCESS_STEPS, type ProcessStep } from "@/lib/content";
import { Icon } from "@/components/ui/icon";

export function ProcessSteps({
  title = "Our Development Process",
  steps = PROCESS_STEPS,
}: {
  title?: string;
  steps?: ProcessStep[];
}) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="section-heading">{title}</h2>
        </div>

        <div className="mt-16 overflow-x-auto no-scrollbar snap-x snap-mandatory md:snap-none">
          {/*
            min-w-max makes this wrapper as wide as its content, so the
            absolutely positioned connector spans the full scroll width.
            The original widget needed a ResizeObserver to do this in JS.
          */}
          <div className="relative flex min-w-max items-start gap-6 md:min-w-0 md:justify-between md:gap-0">
            <div
              aria-hidden="true"
              className="absolute left-0 top-9 w-full border-t-2 border-dashed border-primary-200"
            />
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group relative z-10 flex w-56 flex-shrink-0 snap-center flex-col items-center text-center md:w-48 md:snap-align-none"
              >
                <div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-primary-600 bg-white text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
                  <Icon d={step.iconPath} className="h-7 w-7" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary-600">
                  Step {index + 1}
                </span>
                <h3 className="mt-1 text-sm font-bold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
