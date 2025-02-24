interface UserInfoProps {
title: string;
content?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ title, content }) => {
return (<div className="mb-4">
    <label className="mb-1 block text-sm font-semibold sm:text-2xl lg:text-lg">
    {title}
    </label>
    <p className="text-gray-700">{content || <>&nbsp;</>}</p>
</div>)
}

export default UserInfo;