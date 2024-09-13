import Image from "next/image";

export const Icon = ({ iconName }: { iconName: keyof typeof iconPath }) => {
  return (
    <div className="relative h-4 w-4">
      <Image
        src={getIconPath(iconName)}
        alt={iconName}
        fill={true}
        style={{ objectFit: "contain" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

const iconPath = {
  like: "/like_icon.png",
  scrap: "/scrap_icon.png",
  comment: "/comment_icon.png",
  vote_active: "/vote_active_icon.png",
  vote_inactive: "/vote_inactive_icon.png",
  apply_active: "/apply_active_icon.png",
  apply_inactive: "/apply_inactive_icon.png",
  add: "/add_icon.png",
  alarm_active: "/alarm_active_icon.png",
  alarm_inactive: "/alarm_inactive_icon.png",
  search: "/search_icon.png",
};

const getIconPath = (iconName: keyof typeof iconPath) => {
  return `/icons${iconPath[iconName]}`;
};
