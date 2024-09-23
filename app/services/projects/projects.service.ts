"use server"

import { fetchedProject, fetchProjectData, fetchProjectQuery } from "@/app/lib/dtos/project";
import { getProjectsTable } from "@/app/lib/queries/project";

export async function fetchTableData(data: fetchProjectData) {
    try {
        const params = {
            projectSearch: data.projectSearch,
            projectstatus_id: data.projectstatus_id,
            projecttype_id: data.projecttype_id,
            scholarSearch: data.scholarSearch,
            usercareer_id: data.usercareer_id,
            scholarshiptype_id: data.scholarshiptype_id,
            laboratory_id: data.laboratory_id,
            page: data.page,
            rowsPerPage: data.rowsPerPage,
        } as fetchProjectQuery;
        let response: { projects: fetchedProject[]; totalProjects: any; }; 
        response = await getProjectsTable(params);
        return response;
    } catch (error) {
        console.error("Error en fetchTableData(Projects):", error);
    };
};
