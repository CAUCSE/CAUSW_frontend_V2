'use client';

import { useEffect, useRef } from 'react';

export const VideoBackground = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[-1] h-screen w-full overflow-y-hidden">
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform">
        <video ref={videoRef} className="h-full w-full object-cover" loop muted playsInline>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
