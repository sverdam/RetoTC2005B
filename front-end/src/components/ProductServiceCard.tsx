import {
  WrenchIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import React from "react";

interface ProductServiceProps {
  name: string;
  description: string;
  type: "p" | "s"; // p = product, s = service
  image?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  color?: string;
}

const ProductServiceCard: React.FC<ProductServiceProps> = ({
  name,
  description,
  type,
  image,
  icon: Icon,
  color
}) => {
  return (
    <div>
      <div className="w-full bg-white rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">

        {type === "p" && image && (
          <img
            className="h-40 w-full object-cover"
            src={image}
            alt={name}
          />
        )}

        {type === "s" && (
          <div style={{
              background: color
                  ? `linear-gradient(
                      to right,
                      ${color},
                      ${color}CC
                  )`
                  : "linear-gradient(to right, var(--clas), var(--clas-claro))"
          }} className="h-20 w-full text-white flex items-center justify-center">
            {Icon ? (
              <Icon className="h-7 w-7" />
            ) : (
              <WrenchIcon className="h-7 w-7" />
            )}
          </div>
        )}

        <div className="p-4 flex flex-col gap-1 text-left">
          <p className="text-base font-medium leading-tight line-clamp-1">
            {name}
          </p>

          <p className="text-sm text-gray-500 leading-snug line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductServiceCard;