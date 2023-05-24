export interface UserRoles {
    role?: string;
    priority?: number;
    userId?: string;
}
export interface UserProfile {
    userId?: string;
    userName?: string;
    externalId?: string;
    userEmailId?: string;
    firstName?: string;
    lastName?: string;
    userContactNo?: string;
    userParentId?: string;
    addBy?: string;
    startDate?: Date;
    endDate?: Date;
    userStatus?: string;
    comments?: string;
    currentRole?: string;
    roles?: string[];
    userAddress1?: string;
    userAddress2?: string;
    userLatitude?: string;
    userLongitude?: string;
    userSecondaryContact?: string;
    userAgency?: string;
    pinNo?: string;
    vatNo?: string;
    ownerName?: string;
    activationCode?: string;
    postalCode?: string;
    nationalId?: string;
    staff?: boolean;
    dept?: string;
    post?: string;
    activatorName?: string;
    userType?: string;
    suspendRemarks?: string;
    userRoles?: Array<UserRoles>;
    categoryType?: number;
    dob?: Date;
}
