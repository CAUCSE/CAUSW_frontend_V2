import { UserRscService } from "@/shared";

const UsersManagement = async () => {
  const { findByState, findAllAdmissions } = UserRscService();

  const data = await findAllAdmissions(null, 0);

  <>
    {data.map((a) => (
      <div key={a.userName}>{a.userName}</div>
    ))}
  </>;
};

export default UsersManagement;
