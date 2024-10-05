import { ManagementDetail, ManagementState } from "@/widget";

const UserManagementDetail = async ({
  params,
}: {
  params: { state: string; admissionId: string };
}) => {
  // const { getByState, getAllAdmissions } = SettingRscService();
  const { state, admissionId } = params;

  return (
    <ManagementDetail
      state={state as ManagementState}
      admissionId={admissionId}
    />
  );
};

export default UserManagementDetail;