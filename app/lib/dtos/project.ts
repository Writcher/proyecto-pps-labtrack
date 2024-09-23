import { projectStatus } from "./projectstatus";
import { projectType } from "./projecttype";
import { scholarshipType } from "./scholarshiptype";
import { userCareer } from "./usercareer";

export type projectFormData = {
    //filters
    filterAnchor: any;
    filterMenuOpen: boolean;
    activeFilters: { [key: string ]: any }
    showProjectSearchForm: boolean;
    projectSearch: string;
    normalProjectSearch: string;
    projectTypeFilter: number;
    showProjectTypeFilter: boolean;
    projectStatusFilter: number;
    showProjectStatusFilter: boolean;
    showScholarSearchForm: boolean;
    scholarSearch: string;
    normalScholarSearch: string;
    showScholarshipTypeFilter: boolean;
    scholarshipTypeFilter: number;
    userCareerFilter: number;
    showUserCareerFilter: boolean;    
    //pagination
    page: number;
    rowsPerPage: number;
    //modals
    modalOpenCreate: boolean;
};

export type projectsTableProps = {
    usercareers: userCareer[];
    scholarships: scholarshipType[];
    projecttypes: projectType[];
    projectstatuses: projectStatus[];
    laboratory_id: number;
};

export type fetchProjectData = {
    projectSearch: string;
    projectstatus_id: number;
    projecttype_id: number;
    scholarSearch: string;
    usercareer_id: number;
    scholarshiptype_id: number;
    laboratory_id: number;
    page: number;
    rowsPerPage: number;
};

export type fetchProjectQuery = fetchProjectData;

export type fetchedProject = {
    id: number;
    name: string;
    description: string;
    projecttaskcount: number;
    completedprojecttaskcount: number;
    projecttypename: string;
    projectstatusname: string;
};