import {SurveyQuestionOptionBean} from './SurveyQuestionOptionBean';

export interface SurveyQuestionBean {
    id: string;
    quesDesc: string;
    type?: string;
    addBy?: string;
    specialQuestionFlag: string;
    addDate?: Date;
    surveyQuestionOptionBean?: Array<SurveyQuestionOptionBean>;
}
