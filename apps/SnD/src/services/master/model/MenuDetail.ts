interface MenuDetail {
    menuId?: string;
    url?: string;
    displayString?: string;
    icon?: string;
    parentMenuId?: string;
    jsController?: string;
    menuModule?: string;
    children?: MenuDetail[];
}

export default MenuDetail;
