import { ManagementState } from '@/fsd_entities/user/model/types';
import { AdmissionManagementDetail } from '@/fsd_entities/user/ui';

const UserManagementDetail = async ({ params }: { params: { state: string; admissionId: string } }) => {
  const { state, admissionId } = params;

  return <AdmissionManagementDetail state={state as ManagementState} admissionId={admissionId} />;
};

export default UserManagementDetail;
