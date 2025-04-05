interface SubjectiveQuestionSummaryResultProps {
  question: Form.QuestionSummaryResponseDto;
}

export const SubjectiveQuestionSummaryResult = ({ question }: SubjectiveQuestionSummaryResultProps) => {
  return question.questionAnswerList?.map((answer, idx) => {
    return (
      <div key={`${question.questionId}${idx}`} className="flex h-10 w-full items-center bg-[#E8E8E8] pl-2">
        <p className="text-[#515151]">{answer}</p>
      </div>
    );
  });
};
