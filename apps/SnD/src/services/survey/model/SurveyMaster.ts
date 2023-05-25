import {SurveyQuestionActivity} from './SurveyQuestionActivity';
import {Question} from './Question';

export interface SurveyMaster {
    surveyId: number;
    surveyDescription: string;
    addBy: string;
    addDate: Date;
    surveyStartDate: string;
    status: string;
    activities: Array<SurveyQuestionActivity>;
    surveyEndDate: string;
    posType: number;
    posTypeDesc: string;
    questionsListDetails: Array<Question>;
    questionList: Array<string>;
    dependentList: Array<Question>;
}
