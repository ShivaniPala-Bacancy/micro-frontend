interface IButton {
    className: string;
    disabled?: boolean;
    title?: string;
    onClick?: (obj: any) => any | void;
}

export type {IButton};
