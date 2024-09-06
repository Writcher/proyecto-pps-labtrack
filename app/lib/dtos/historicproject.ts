import { fetchedHistoricScholar, newHistoricScholarQuery } from "./historicscholar";

export type fetchedHistoricProject = {
    id: number;
    name: string;
    description: string;
    year: number;
    historicprojecttype_id: number;
    historicprojecttypename: string;
    historicprojectstatus_id: number;
    historicprojectstatusname: string;
    historicscholars: fetchedHistoricScholar[];
}



export type newHistoricProjectQuery = {
    name: string;
    description: string;
    year: number;
    projectstatus_id: number;
    projecttype_id: number;
    laboratory_id: number;
    scholars: newHistoricScholarQuery[];
}