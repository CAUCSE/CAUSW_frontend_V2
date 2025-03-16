interface UserInfoProps {
title: string;
content?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ title, content }) => {
return (<div className="mb-4 max-w-40">
    <label className="mb-1 block text-sm font-semibold lg:text-lg">
    {title}
    </label>
    <p className="text-gray-700 break-words overflow-hidden">{content || <>&nbsp;</>}</p>
</div>)
}

export default UserInfo;