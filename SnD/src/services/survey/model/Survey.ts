import {SurveyQuestion} from './SurveyQuestion';

export interface Survey {
    retailerId: string;
    surveyType: number;
    surveyTypeDesc: string;
    langitude: number;
    longitude: number;
    retailerName: string;
    isGuest: boolean;
    surveyId: string;
    surveyDescription: string;
    surveyDate: Date;
    dangerZone: string;
    retailerState: number;
    surveyQuestionsPojos: Array<SurveyQuestion>;
    isOnline: boolean;
    target: string;
    underRadius: string;

    // Added for visit
    visitBatchId: string;
    visitInstanceId: number;
    completionStatus: string;
}
