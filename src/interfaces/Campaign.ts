
export interface ICampaign {
    title: string;
    description: string;
    minimum: number;
    address: string;
    members?: IMember[];
    transactions?: ITransaction[];
}

export interface IMember {
    exists: boolean;
    name : string;
    address: string;
    donations: IDonation[];
}

export interface IDonation {
    amount: number;
    comment: string
}

export interface ITransaction {
    description: string;
    value: number;
    recipient: string;
}