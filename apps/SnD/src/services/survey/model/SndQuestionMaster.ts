import {SndQuestionOption} from './SndQuestionOption';

export interface SndQuestionMaster {
    id: string;
    addby?: string;
    adddate?: Date;
    questionDesc: string;
    type: string;
    specialQuestionFlag?: string;
    sndQuestionOptions?: Array<SndQuestionOption>;
}
