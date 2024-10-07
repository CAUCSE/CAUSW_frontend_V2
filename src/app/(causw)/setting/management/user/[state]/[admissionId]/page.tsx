import { ManagementDetail, ManagementState } from "@/widget";
import { SettingRscService } from "@/shared";
const UserManagementDetail = async ({
  params,
}: {
  params: { state: string; admissionId: string };
}) => {
  const { getByState, getAllAdmissions } = SettingRscService();
  const { state, admissionId } = params;
  
  return (
    <ManagementDetail
      state={state as ManagementState}
      admissionId={admissionId}
    />
  );
};

export default UserManagementDetail;
