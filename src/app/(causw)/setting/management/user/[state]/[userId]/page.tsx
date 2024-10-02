import { ManagementDetail, ManagementState } from "@/widget";

const UserManagementDetail = async ({
  params: { state, userId },
}: {
  params: { state: string; userId: string };
}) => {
  // const { getByState, getAllAdmissions } = SettingRscService();

  return <ManagementDetail state={state as ManagementState} userId={userId} />;
};

export default UserManagementDetail;
