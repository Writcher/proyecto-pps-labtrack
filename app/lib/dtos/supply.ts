export type fetchedSupply = {
    id: number;
    name: string;
    description: string;
    year: number;
    supplystatus_id: number;
    supplytype_id: number;
    supplystatus: string;
    supplytype: string;
}

export type newSupplyQuery = {
    name: string;
    description: string;
    year: number;
    supplystatus_id: number;
    supplytype_id: number;
    laboratory_id: number;
}

export type editSupplyQuery = {
    id: number;
    name: string;
    description: string;
    year: number;
    supplystatus_id: number;
    supplytype_id: number;
}