import { FORM_CONSTANT } from '@/entities/form';
import { useFormResultStore } from '@/entities/form/model/stores';

interface FormRespondentInfoProps {
  responseUserInfos: Form.ReplyResponseDto[];
}

export const FormRespondentInfo = ({ responseUserInfos }: FormRespondentInfoProps) => {
  const currentPage = useFormResultStore((state) => state.currentPage);
  const {
    detailUserInfoLeftKeyValue,
    detailUserInfoLeftKeys,
    detailUserInfoRightKey,
    detailUserInfoRightKeyValue,
    ACADEMIC_STATUS,
    SEMESTER,
  } = FORM_CONSTANT();

  return (
    <div className="w-3/4 min-w-[280px] sm:min-w-[530px]">
      <div className="flex w-full items-center justify-between">
        <div className="w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
          <p className="truncate text-[14px] group-hover:block sm:text-xl">응답자 정보</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-2 rounded-md border border-black px-4 py-2 sm:grid-cols-2">
        <ul className="list-disc space-y-2 pl-5">
          {detailUserInfoLeftKeys.map((key, idx) => {
            if (key === 'currentCompletedSemester') {
              return (
                <li key={`left-${key}${idx}`}>
                  {detailUserInfoLeftKeyValue[idx]}:{' '}
                  {responseUserInfos[currentPage - 1].replyUserResponseDto[key]
                    ? SEMESTER[`${responseUserInfos[currentPage - 1].replyUserResponseDto[key]}`]
                    : '없음'}
                </li>
              );
            } else if (key === 'academicStatus') {
              return (
                <li key={`left-${key}${idx}`}>
                  {detailUserInfoLeftKeyValue[idx]}:{' '}
                  {responseUserInfos[currentPage - 1].replyUserResponseDto[key]
                    ? ACADEMIC_STATUS[`${responseUserInfos[currentPage - 1].replyUserResponseDto[key]}`]
                    : '없음'}
                </li>
              );
            }
            return (
              <li key={`left-${key}${idx}`}>
                {detailUserInfoLeftKeyValue[idx]} :{' '}
                {responseUserInfos[currentPage - 1].replyUserResponseDto[key] || '없음'}
              </li>
            );
          })}
        </ul>
        <ul className="list-disc space-y-2 pl-5">
          {detailUserInfoRightKey.map((key, idx) => {
            if (key === 'graduationYear') {
              return (
                <li key={`right-${key}${idx}`}>
                  {detailUserInfoRightKeyValue[idx]}:{' '}
                  {responseUserInfos[currentPage - 1].replyUserResponseDto[key]
                    ? `${responseUserInfos[currentPage - 1].replyUserResponseDto[key]}년 ${responseUserInfos[currentPage - 1].replyUserResponseDto['graduationType'] === 'FEBRUARY' ? '2월' : '8월'}`
                    : '없음'}
                </li>
              );
            } else if (key === 'createdAt') {
              return (
                <li key={`right-${key}${idx}`}>
                  {detailUserInfoRightKeyValue[idx]}:{' '}
                  {responseUserInfos[currentPage - 1].replyUserResponseDto.createdAt
                    ? `${new Intl.DateTimeFormat('ko', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      }).format(new Date(responseUserInfos[currentPage - 1].replyUserResponseDto[key]))}`
                    : '없음'}
                </li>
              );
            } else if (key === 'isAppliedThisSemester') {
              return (
                <li key={`right-${key}${idx}`}>
                  {detailUserInfoRightKeyValue[idx]}:{' '}
                  {responseUserInfos[currentPage - 1].replyUserResponseDto[key] ? '⭕' : '❌'}
                </li>
              );
            } else if (key === 'paidAt') {
              return (
                <li key={`right-${key}${idx}`}>
                  {detailUserInfoRightKeyValue[idx]} :{' '}
                  {responseUserInfos[currentPage - 1].replyUserResponseDto.paidAt
                    ? SEMESTER[`${responseUserInfos[currentPage - 1].replyUserResponseDto.paidAt}`]
                    : '없음'}
                </li>
              );
            } else if (key === 'restOfSemester') {
              return (
                <div key={`right-${key}${idx}`}>
                  <li>
                    적용 학생회비 학기:{' '}
                    {responseUserInfos[currentPage - 1].replyUserResponseDto[key]
                      ? `${8 - responseUserInfos[currentPage - 1].replyUserResponseDto[key]}`
                      : '없음'}
                  </li>
                  <li>
                    {detailUserInfoRightKeyValue[idx]}:{' '}
                    {responseUserInfos[currentPage - 1].replyUserResponseDto[key]
                      ? responseUserInfos[currentPage - 1].replyUserResponseDto[key]
                      : '없음'}
                  </li>
                </div>
              );
            } else if (key === 'isRefunded') {
              return (
                <li key={`right-${key}${idx}`}>
                  {detailUserInfoRightKeyValue[idx]}:{' '}
                  {responseUserInfos[currentPage - 1].replyUserResponseDto[key] ? '⭕' : '❌'}
                </li>
              );
            }
            return (
              <li key={`right-${key}${idx}`}>
                {detailUserInfoRightKeyValue[idx]}:{' '}
                {responseUserInfos[currentPage - 1].replyUserResponseDto[key] || '없음'}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
