export const VideoBackground = ({ src }: { src: string }) => (
  <div className="w-full h-screen fixed top-0 left-0 overflow-y-hidden z-[-1]">
    <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <video className="w-full h-full object-cover" autoPlay loop muted>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);
