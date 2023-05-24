export interface Agreement {
    id: string;
    agreementName: string;
    partyId: string | undefined;
    partyType?: string;
    pricePerKg?: string;
    pricePerKm?: string;
    site?: string;
    startDate?: string;
    endDate?: string;
    zone?: string;
}
