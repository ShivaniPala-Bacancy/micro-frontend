interface IMenu {
    displayString: string;
    icon?: string;
    to?: string;
    menuId: string | number;
    children?: IMenu[];
    menuModule?: string;
    jsController?: string;
}

export type {IMenu};
