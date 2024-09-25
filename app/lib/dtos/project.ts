import { projectStatus } from "./projectstatus";
import { projectType } from "./projecttype";
import { fetchedProjectPageScholar } from "./scholar";
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

export type fetchTableProjectData = {
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

export type fetchTableProjectQuery = fetchTableProjectData;

export type fetchedTableProject = {
    id: number;
    name: string;
    description: string;
    projecttaskcount: number;
    completedprojecttaskcount: number;
    projecttypename: string;
    projectstatusname: string;
};

export type createModalProps = {
    open: boolean;
    handleClose: () => void;
    projecttypes: projectType[];
    projectstatuses: projectStatus[];
    laboratory_id: number;
};

export type createFormData = {
    name: string;
    description: string;
    projectstatus: number;
    projecttype: number;
    scholars: { scholar_id: number }[];
};

export type newProjectData = {
    name: string;
    description: string;
    projectstatus_id: number;
    projecttype_id: number;
    laboratory_id: number;
    scholars: { scholar_id: number }[];
};

export type newProjectQuery = newProjectData;

export type fetchedPageProject = {
    id: number;
    name: string;
    description: string;
    projecttype_id: number;
    projectstatus_id: number;
    laboratory_id: number;
    scholars: fetchedProjectPageScholar[];
};

export type editProjectParams = {
    id: number;
    name: string;
    description: string;
    projecttype_id: number;
    projectstatus_id: number;
};

export type editFormProps = {
    refetch: () => void;
    project: editProjectParams;
};

export type editFormData = {
    name: string;
    description: string;
    projectstatus_id: number | '';
    projecttype_id: number | '';
};

export type editProjectData = {
    name: string;
    description: string;
    projectstatus_id: number;
    projecttype_id: number;
    id: number;
};

export type editProjectQuery = editProjectData;