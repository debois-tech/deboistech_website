import Image from "next/image";
import { FEATURED_PRODUCT } from "@/lib/content";

export function FeaturedProduct() {
  const product = FEATURED_PRODUCT;

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex justify-center">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={1024}
              height={640}
              className="w-full max-w-lg rounded-xl shadow-lg"
              sizes="(max-width: 1024px) 100vw, 512px"
            />
          </div>
          <div>
            <span className="eyebrow">{product.eyebrow}</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.titleLead}
              <span className="text-primary-600">{product.titleAccent}</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              {product.description}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {product.items.map((item) => (
                <span key={item} className="check-item">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {product.linkLabel} &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
