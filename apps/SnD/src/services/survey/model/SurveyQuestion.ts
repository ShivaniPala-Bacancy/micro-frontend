import {SurveyDependant} from './SurveyDependant';

export interface SurveyQuestion {
    surveyId: string;
    questionText: string;
    questionType: string;
    mandatory: boolean;
    answerOptions: Array<SurveyDependant>;
    submitAnswer: string;
    questionId: string;
    visibility: boolean;
    optionId: string;
    parentId: string;
    viewId: string;
}
