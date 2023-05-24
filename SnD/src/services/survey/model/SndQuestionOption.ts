import {SndQuestionMaster} from './SndQuestionMaster';

export interface SndQuestionOption {
    id: string;
    optionLabel?: string;
    optionValue?: string;
    sndQuestionMaster?: SndQuestionMaster;
    points?: number;
}
