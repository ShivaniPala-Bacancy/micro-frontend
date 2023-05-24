import {CrudEvents} from './ICrudBox';
import {IForm} from './IForm';

interface IFormBox {
    id: string;
    title: string;
    form: IForm;
    waiting?: boolean;
    action: string;
    submitDisabled?: boolean;
    submitHidden?: boolean;
    callBack: (crudEvent: CrudEvents, formData: any) => void;
    currentObject?: any;
    parentDispatch?: any;
    parentState?: any;
    error?: any;
    isErrorPresent?: boolean;
    withoutHeader?: boolean;
    hideReset?: boolean;
    hideButtons?: boolean;
    errorMessage?: string;
}
export default IFormBox;
