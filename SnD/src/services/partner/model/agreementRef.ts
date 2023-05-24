export interface AgreementRef {
    id?: string;
    agreementId?: string;
    name?: string;
    partyId: string | undefined;
    referredType?: string;
    partyType?: string;
}
