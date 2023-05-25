import {Question} from './Question';
import {QuestionMovement} from './QuestionMovement';

export interface SurveyQuestionActivity {
    actionType: number;
    movements?: Array<QuestionMovement>;
    question?: Question;
}
