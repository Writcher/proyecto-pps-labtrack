"use server"

import { createProjectObservationData, deleteObservationData } from "@/app/lib/dtos/observation";
import { editProjectData, fetchedTableProject, fetchTableProjectData, fetchTableProjectQuery, newProjectData } from "@/app/lib/dtos/project";
import { addScholarData, removeScholarData } from "@/app/lib/dtos/scholar";
import { createProjectTaskData, deleteTaskData } from "@/app/lib/dtos/task";
import { createObservationProject, dropObservation, getProjectObservations } from "@/app/lib/queries/observations";
import { addScholar, createProject, editProject, getProjectById, getProjectsTable, removeScholar } from "@/app/lib/queries/project";
import { getProjectStatuses } from "@/app/lib/queries/projectstatus";
import { getProjectTypes } from "@/app/lib/queries/projecttype";
import { getAddScholars, getChatScholars } from "@/app/lib/queries/scholar";
import { createTaskProject, dropTask, getCalendarTasks, getProjectTasks } from "@/app/lib/queries/task";

export async function fetchTableData(data: fetchTableProjectData) {
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
        } as fetchTableProjectQuery;
        let response: { projects: fetchedTableProject[]; totalProjects: any; }; 
        response = await getProjectsTable(params);
        return response;
    } catch (error) {
        console.error("Error en fetchTableData(Projects):", error);
    };
};

export async function fetchLabScholars(laboratory_id: number) {
    try {
        const response = await getChatScholars(laboratory_id);
        return response;
    } catch (error) {
        console.error("Error en fetchLabScholars:", error);
    };
};

export async function fetchAddScholars(laboratory_id: number, scholar_ids: number[]) {
    try {
        const response = await getAddScholars(laboratory_id, scholar_ids);
        return response;
    } catch (error) {
        console.error("Error en fetchLabScholars:", error);
    };
};

export async function fetchProjectById(id: number) {
    try {
        const response = await getProjectById(id);
        return response;
    } catch (error) {
        console.error("Error en fetchProjectById:", error);
    };
};

export async function fetchSelectData() {
    try {
        const projecttypes = await getProjectTypes();
        const projectstatuses = await getProjectStatuses();
        return { projecttypes: projecttypes, projectstatuses: projectstatuses };
    } catch (error) {
        console.error("Error en fetchSelectData:", error);
    };
};

export async function createTableData(data: newProjectData) {
    try {
        try {
            await createProject(data);
            return { success: true };
        } catch (error) {
            console.error("Error al crear proyecto:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en createTableData(Project):", error);
        return { success: false };
    };
};

export async function editTableData(data: editProjectData) {
    try {
        try {
            await editProject(data);
            return { success: true };
        } catch (error) {
            console.error("Error al editar proyecto:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en editTableData(Project):", error);
        return { success: false };
    } ;
};

export async function addProjectScholar(data: addScholarData) {
    try {
        try {
            await addScholar(data);
            return { success: true };
        } catch (error) {
            console.error("Error al editar proyecto:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en addProjectScholar:", error);
        return { success: false };
    } ;
};

export async function removeProjectScholar(data: removeScholarData) {
    try {
        try {
            await removeScholar(data);
            return { success: true };
        } catch (error) {
            console.error("Error al editar proyecto:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en addProjectScholar:", error);
        return { success: false };
    } ;
};

export async function fetchProjectObservations(project_id: number, page: number)  {
    try {
        const response = await getProjectObservations(project_id, page);
        return response;
    } catch (error) {
        console.error("Error en fetchLabScholars:", error);
    };
};

export async function createProjectObservation(data: createProjectObservationData) {
    try {
        try {
            await createObservationProject(data);
            return { success: true };
        } catch (error) {
            console.error("Error al crear observacion:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en createProjectObservation:", error);
        return { success: false };
    };
};

export async function deleteObservation(data: deleteObservationData) {
    try {
        try {
            await dropObservation(data);
            return { success: true };
        } catch (error) {
            console.error("Error al eliminar observación:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en deleteObservation:", error);
        return { success: false };
    };
};

export async function fetchProjectTasks(project_id: number, page: number) {
    try {
        const response = await getProjectTasks(project_id, page);
        return response;
    } catch (error) {
        console.error("Error en fetchProjectTasks:", error);
    };
};

export async function createProjectTask(data: createProjectTaskData) {
    try {
        try {
            await createTaskProject(data);
            return { success: true };
        } catch (error) {
            console.error("Error al crear tarea:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en createProjectTask:", error);
        return { success: false };
    };
};

export async function deleteTask(data: deleteTaskData) {
    try {
        try {
            await dropTask(data);
            return { success: true };
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en deleteTask:", error);
        return { success: false };
    };
};

export async function fetchCalendarTasks(id: number, start_date: Date, end_date: Date) {
    try {
        const response = await getCalendarTasks(id, start_date, end_date);
        return response;
    } catch (error) {
        console.error("Error en fetchProjectTasks:", error);
    };
};