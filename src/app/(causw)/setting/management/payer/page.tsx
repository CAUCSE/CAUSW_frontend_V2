import Link from 'next/link';

import { Management } from '@/fsd_entities/user/ui';

import { SettingRscService } from '@/shared';

const PayerManagement = async () => {
  const { getPayers } = SettingRscService();

  const data = await getPayers();

  return (
    <>
      <Link
        href="/setting/management/payer/add"
        className="bg-focus absolute top-6 right-4 z-10 flex h-10 w-36 items-center justify-center rounded-2xl border-2 border-black text-lg text-white md:top-16 md:right-52"
      >
        납부자 추가
      </Link>
      <Management
        state={undefined}
        title="학생회비 관리"
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
