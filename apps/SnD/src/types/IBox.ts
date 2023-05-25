interface IEventFunction {
    (event: any): void;
}
interface IBox {
    id: string;
    title?: string;
    loaded: boolean;
    header?: any;
    children?: any;
    border?: boolean;
    solid?: boolean;
    options?: any;
    icon?: string;
    collapsable?: boolean;
    closable?: boolean;
    titleRight?: boolean;
    noPadding?: boolean;
    type?: string;
    badge?: string;
    toolIcon?: string;
    toolIcon1?: string;
    toolIcon2?: string;
    toolIcon3?: string;
    toolIcon4?: string;
    toolIcon5?: string;
    customOptions?: any;
    className?: string;
    footerClass?: string;
    textCenter?: boolean;
    padding?: true;
    bodyClassName?: string;
    style?: any;
    footer?: any;
    onClose?: IEventFunction;
    withoutHeader?: boolean;
    itemCount?: number;
    onToolIconClick?: any;
    onToolIcon1Click?: any;
    onToolIcon2Click?: any;
    onToolIcon3Click?: any;
    onToolIcon4Click?: any;
    onToolIcon5Click?: any;
    size?: 'full' | 'half' | 'quarter' | 'three-fourth';
    loading?: boolean;
    dark?: boolean;
    subTitle?: any;
}

export default IBox;
