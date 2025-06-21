import Image from "next/image";

import { ProductGrid } from "@/entities/product";

export const HomePage = () => {
  return (
    <div className="relative overflow-x-hidden bg-neutral-50">
      {/* T-shirt SVG Background */}
      <div className="relative -ml-[40vw] w-[180vw]">
        <Image
          src="/images/bg-tshirt-long.png"
          alt="T-shirt"
          width={2000}
          height={2000}
          className="h-auto w-full"
          priority
        />
      </div>

      {/* Content positioned on top of the background */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Message positioned on t-shirt */}
        <div className="mt-[60%] text-center">
          <h1 className="text-3xl font-bold text-neutral-700 md:text-6xl lg:text-7xl">
            This T-shirt is
            <br />
            Only Available at
            <br />
            Your Current Location
          </h1>
        </div>

        {/* Product grid */}
        <ProductGrid />
      </div>
    </div>
  );
};
