'use client';

export const ProfileImage = ({ src }: { src?: string | null }) => {
  return (
    <div className="h-[45px] w-[45px] overflow-hidden rounded-full shadow-2xl xl:h-24 xl:w-24">
      <div
        className="h-[45px] w-[45px] bg-contain bg-center bg-no-repeat xl:h-24 xl:w-24"
        style={{
          backgroundImage: `url(${src ? src : '/images/default_profile.png'})`,
        }}
      />
    </div>
  );
};
