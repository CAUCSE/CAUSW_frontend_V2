import Link from 'next/link';

import { getPayers } from '@/fsd_entities/user/api';
import { ManagementPanel } from '@/fsd_entities/user/ui';

import { MESSAGES } from '@/fsd_shared';

const PayerManagement = async () => {
  const data = await getPayers();

  return (
    <>
      <ManagementPanel
        state={undefined}
        title={MESSAGES.MANAGEMENT.PAYERS}
        firstNavigation={{
          name: '학생회비 납부자 목록',
          state: '',
          exportType: 'PAYERS',
          router: '/setting/management/payer/',
        }}
        data={data.map((element) => ({
          userName: element.userName,
          studentId: element.studentId,
          id: element.userCouncilFeeId,
        }))}
      />
    </>
  );
};

export default PayerManagement;
