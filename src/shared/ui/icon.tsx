import Image from "next/image";

export const Icon = ({ iconName }: { iconName: keyof typeof iconPath }) => {
  return (
    <div className="relative h-4 w-4">
      <Image
        src={getIconPath(iconName)}
        alt={iconName}
        fill={true}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

const iconPath = {
  like: "/like_icon.png",
  scrab: "/scrab_icon.png",
  comment: "/comment_icon.png",
  vote_active: "/vote_active_icon.png",
  vote_inactive: "/vote_inactive_icon.png",
  apply_active: "/apply_active_icon.png",
  apply_inactive: "/apply_inactive_icon.png",
};

const getIconPath = (iconName: keyof typeof iconPath) => {
  return `/icons${iconPath[iconName]}`;
};
