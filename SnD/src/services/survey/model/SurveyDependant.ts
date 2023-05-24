import {SurveyQuestion} from './SurveyQuestion';

export interface SurveyDependant {
    answerLabel: string;
    answerValue: string;
    surveyQuestionPojos: Array<SurveyQuestion>;
    optionId: string;
    parentId: string;
}
