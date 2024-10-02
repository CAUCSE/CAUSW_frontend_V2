import { ManagementDetail, ManagementState } from "@/widget";

const UserManagementDetail = async ({
  params: { state },
}: {
  params: { state: string; userId: string };
}) => {
  // const { getByState, getAllAdmissions } = SettingRscService();

  return <ManagementDetail state={state as ManagementState} />;
};

export default UserManagementDetail;
