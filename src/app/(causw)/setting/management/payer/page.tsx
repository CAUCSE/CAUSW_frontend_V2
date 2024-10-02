import { SettingRscService } from "@/shared";

import { Management } from "@/widget";

const PayerManagement = async () => {
  const { getPayers } = SettingRscService();

  const data = await getPayers();

  return (
    <>
      <div className="absolute right-4 top-6 flex h-10 w-36 items-center justify-center rounded-2xl border-2 border-black bg-focus text-lg text-white md:right-52 md:top-16">
        납부자 추가
      </div>
      <Management
        state={undefined}
        title="학생회비 관리"
        firstNavigation={{
          name: "학생회비 납부자 목록",
          state: "",
          exportType: "PAYERS",
          router: "/setting/management/payer/TODO",
        }}
        data={data.map((element) => ({
          userName: element.userName,
          studentId: element.studentId,
          id: element.userId,
        }))}
      />
    </>
  );
};

export default PayerManagement;
