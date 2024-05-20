export type TastingNote = {
    whiskeyName: string,
    whiskeyType: string,
    location: string,
    isPrivateBottling: boolean,
    privateBottlingCompany?: string,
    tastingLabels: string[],
    notes: string,
}