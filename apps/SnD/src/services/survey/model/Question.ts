export interface Question {
    id: number;
    surveyQuestionId: number;
    surveyId: number;
    questionId: number;
    questionDesc: string;
    questionTypeId: number;
    questionType: string;
    visibilityFlag: string;
    mandatoryFlag: string;
    parent: number;
    parentOptionId: number;
    optionId: number;
    order: number;
    children?: Array<Question>;
    action: string;
}
