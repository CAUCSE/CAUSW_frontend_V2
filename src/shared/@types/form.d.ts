declare namespace Form {
  export interface ICustomCheckBox {
    colSize: 1 | 2 | 3 | 4 | 5;
    // targetValue: any;
    // callback: ChangeEventHandler<HTMLInputElement>;
    value?: any;
    name: string;
    register: any;
  }

  export interface FormDataDto {
    title: string;
    allowedAcademicStatus: string[];
    allowedGrades: string[];
    questions: Question[];
  }

  interface Question {
    questionNumber: number;
    questionType: string;
    questionText: string;
    isMultiple: boolean;
    options: Option[];
  }

  interface Option {
    optionNumber: number;
    optionText: string;
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
