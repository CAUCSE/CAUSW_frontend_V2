import { Header, SubHeader } from '@/fsd_shared';

export const VerificationHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <Header bold>본인 인증 안내</Header>
      <SubHeader>서비스 이용을 위해 본인 인증이 필요합니다.</SubHeader>
      <SubHeader>신청서와 재학 증빙 서류를 제출해 주세요.</SubHeader>
    </div>
  );
};
