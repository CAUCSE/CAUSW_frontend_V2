interface UserInfoProps {
  title: string;
  content?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ title, content }) => {
  return (
    <div className="mb-4 max-w-40">
      <label className="mb-1 block text-sm font-semibold lg:text-lg">{title}</label>
      <p className="overflow-hidden break-words text-gray-700">{content || <>&nbsp;</>}</p>
    </div>
  );
};

export default UserInfo;
