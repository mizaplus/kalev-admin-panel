import { resolveMediaUrl } from "@/lib/media";
import type React from "react";
import { Button } from "./button";
import { IoChevronForwardOutline } from "react-icons/io5";

const HeroPreview: React.FC<{
  title: string;
  tagline: string;
  image: string;
  isHome?: boolean;
}> = ({ title, tagline, image, isHome }) => {
  return (
    <div className="mt-4">
      <img
        src="/header.png"
        alt="Header Image"
        className="border border-gray-300"
      />
      <div
        className="h-[500px] bg-cover bg-center flex flex-col items-center justify-center overflow-hidden rounded"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6)), url(${resolveMediaUrl(
            image,
          )})`,
        }}
      >
        {isHome ? (
          <div className="relative z-10 p-8 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-white drop-shadow">
              {title || "Headline goes here"}
            </h1>
            <p className="mt-2 text-sm text-white max-w-sm text-center">
              {tagline || "Subheading goes here"}
            </p>
            <Button size="lg" className="mt-4">
              Learn More
            </Button>
          </div>
        ) : (
          <div className="relative z-10 p-8 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-white drop-shadow">
              {title || "Headline goes here"}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white">Home</span>
              <IoChevronForwardOutline className="text-white" />
              <span className="text-xs font-medium text-white">{tagline}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPreview;
