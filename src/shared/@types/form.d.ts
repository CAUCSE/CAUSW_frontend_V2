declare namespace Form {
  export interface ICustomCheckBox {
    colSize: 1 | 2 | 3 | 4 | 5;
    // targetValue: any;
    // callback: ChangeEventHandler<HTMLInputElement>;
    value?: any;
    name: string;
    register: any;
  }

  export interface QuestionReplyRequestDtoList {
    questionReplyRequestDtoList: QuestionReplyRequestDto[];
  }

  export interface QuestionReplyRequestDto {
    questionId: string;
    questionReply: string | null;
    selectedOptionList: number[];
  }

  export interface OptionProps {
    questionIndex: number;
    optionIndex: number;
    removeOption: () => void;
  }

  export interface QuestionProps {
    index: number;
    removeQuestion: () => void;
  }
}
