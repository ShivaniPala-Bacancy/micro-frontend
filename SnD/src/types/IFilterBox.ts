import {IForm} from './IForm';

interface IFilterBox {
    id: string;
    form: IForm;
    waiting: boolean;
    callback: any;
}
export default IFilterBox;
