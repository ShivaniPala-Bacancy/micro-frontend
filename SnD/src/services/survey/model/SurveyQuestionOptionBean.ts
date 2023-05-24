import {SndQuestionMaster} from './SndQuestionMaster';

export interface SurveyQuestionOptionBean {
    q_Id: string;
    orderNumber: number;
    optionLabel: string;
    optionValue: string;
    id: number;

    sndQuestionMaster: SndQuestionMaster;

    points: string;
}
