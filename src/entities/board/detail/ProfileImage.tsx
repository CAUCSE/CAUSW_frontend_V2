import { useUserStore } from "@/shared";

interface ProfileProps{
  // post? or comment? -> 여기에 익명 처리도 나중에 해야할듯
  profileType: string,
  profileImg? : string,
}

export const ProfileImage = ({
  profileInfo,
}:{
  profileInfo:ProfileProps;
}) => {
  profileInfo.profileImg = useUserStore((state) => state.profileImage);

  return (
    <div className="shadow-2xl rounded-full overflow-hidden">
      <div
        className= {`w-24 h-24 bg-center bg-no-repeat bg-contain`}
        style={{ backgroundImage: `url(${profileInfo.profileImg})` }}
      />
    </div>
  );
};
