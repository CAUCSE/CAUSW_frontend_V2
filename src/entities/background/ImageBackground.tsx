import Image from "next/image";

export const ImageBackground = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-full h-screen fixed top-0 left-0 overflow-y-hidden z-[-1]">
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1200}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{ filter: "brightness(0.6)" }}
    />
  </div>
);
