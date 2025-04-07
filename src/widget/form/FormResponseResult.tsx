import { useFormResultStore } from '@/shared';

interface FormResponseResultProps {
  totalFormResult?: Form.ReplyPageResponseDto[];
}

export const FormResponseResult = ({ totalFormResult }: FormResponseResultProps) => {
  const currentPage = useFormResultStore(state => state.currentPage);

  return totalFormResult![0].questionResponseDtoList
    .sort((a, b) => a.questionNumber - b.questionNumber)
    .map(questionDto => {
      return (
        <div key={questionDto.questionId} className="w-3/4 min-w-[280px] sm:min-w-[530px]">
          <div className="flex w-full items-center justify-between">
            <div className="w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
              <p className="truncate text-[14px] group-hover:block sm:text-xl">{questionDto.questionText}</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-md border border-black px-4 py-2">
            {questionDto.questionType === 'OBJECTIVE' ? (
              questionDto.optionResponseDtoList
                .sort((a, b) => a.optionNumber - b.optionNumber)
                .map(option => {
                  const userReplyResult = totalFormResult!
                    .map(result => result.replyResponseDtoPage.content)
                    .flat()
                    .map(reply => {
                      return reply.replyQuestionResponseDtoList;
                    })
                    [currentPage - 1].filter(response => response.questionId === questionDto.questionId)[0];
                  return (
                    <div key={option.optionId} className="flex gap-2">
                      <input
                        type={questionDto.isMultiple ? 'checkbox' : 'radio'}
                        checked={userReplyResult.selectedOptionList.includes(option.optionNumber)}
                        disabled
                      />
                      <p>{option.optionText}</p>
                    </div>
                  );
                })
            ) : (
              <input
                value={
                  totalFormResult!
                    .map(result => result.replyResponseDtoPage.content)
                    .flat()
                    .map(reply => {
                      return reply.replyQuestionResponseDtoList;
                    })
                    [currentPage - 1].filter(response => response.questionId === questionDto.questionId)[0]
                    .questionAnswer
                }
                readOnly
                className="flex h-10 w-full items-center bg-[#E8E8E8] pl-2 text-[#515151]"
              />
            )}
          </div>
        </div>
      );
    });
};
