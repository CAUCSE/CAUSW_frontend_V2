import { ManagementDetail, ManagementState } from "@/widget";

const UserManagementDetail = async ({
  params,
}: {
  params: { state: string; userId: string };
}) => {
  // const { getByState, getAllAdmissions } = SettingRscService();
  const { state, userId } = params;

  return <ManagementDetail state={state as ManagementState} userId={userId} />;
};

export default UserManagementDetail;
