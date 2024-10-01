"use server"

import { createProjectObservationData, createTaskObservationData, deleteObservationData } from "@/app/lib/dtos/observation";
import { deleteProjectData, editProjectData, fetchedTableProject, fetchTableProjectsData, getTableProjectsQuery, newProjectData } from "@/app/lib/dtos/project";
import { addScholarData, removeScholarData } from "@/app/lib/dtos/scholar";
import { createProjectTaskData, deleteTaskData, dragTaskData, editTaskData } from "@/app/lib/dtos/task";
import { newProjectObservation, newTaskObservation, dropObservation, getProjectObservations, getTaskObservations } from "@/app/lib/queries/observations";
import { addScholar, newProject, updateProject, getProjectById, getTableProjects, removeScholar, dropProject } from "@/app/lib/queries/project";
import { getProjectStatuses } from "@/app/lib/queries/projectstatus";
import { getProjectTypes } from "@/app/lib/queries/projecttype";
import { getAddScholars, getLabScholars } from "@/app/lib/queries/scholar";
import { newProjectTask, dropTask, dragTask, editTask, getCalendarTasks, getProjectTasks, getTaskById } from "@/app/lib/queries/task";
import { getTaskStatuses } from "@/app/lib/queries/taskstatus";

export async function fetchTableData(data: fetchTableProjectsData) {
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
        } as getTableProjectsQuery;
        let response: { projects: fetchedTableProject[]; totalProjects: any; }; 
        response = await getTableProjects(params);
        return response;
    } catch (error) {
        console.error("Error en fetchTableData(Projects):", error);
    };
};

export async function fetchLabScholars(laboratory_id: number) {
    try {
        const response = await getLabScholars(laboratory_id);
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

export async function fetchProjectSelectData() {
    try {
        const projecttypes = await getProjectTypes();
        const projectstatuses = await getProjectStatuses();
        return { projecttypes: projecttypes, projectstatuses: projectstatuses };
    } catch (error) {
        console.error("Error en fetchProjectSelectData:", error);
    };
};

export async function createProject(data: newProjectData) {
    try {
        try {
            await newProject(data);
            return { success: true };
        } catch (error) {
            console.error("Error al crear proyecto:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en createProject(Project):", error);
        return { success: false };
    };
};

export async function editProject(data: editProjectData) {
    try {
        try {
            await updateProject(data);
            return { success: true };
        } catch (error) {
            console.error("Error al editar proyecto:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en editProject(Project):", error);
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

export async function fetchProjectObservations(id: number, page: number)  {
    try {
        const response = await getProjectObservations(id, page);
        return response;
    } catch (error) {
        console.error("Error en fetchLabScholars:", error);
    };
};

export async function createProjectObservation(data: createProjectObservationData) {
    try {
        try {
            await newProjectObservation(data);
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

export async function fetchProjectTasks(id: number, page: number) {
    try {
        const response = await getProjectTasks(id, page);
        return response;
    } catch (error) {
        console.error("Error en fetchProjectTasks:", error);
    };
};

export async function createProjectTask(data: createProjectTaskData) {
    try {
        try {
            await newProjectTask(data);
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

export async function deleteProject(data: deleteProjectData) {
    try {
        try {
            await dropProject(data);
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

export async function editCalendarTask(data: dragTaskData) {
    try {
        try {
            await dragTask(data);
            return { success: true };
        } catch (error) {
            console.error("Error al arrastrar tarea:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en editCalendarTask:", error);
        return { success: false };
    };
};

export async function fetchTaskSelectData() {
    try {
        const taskstatuses = await getTaskStatuses();
        return { taskstatuses: taskstatuses };
    } catch (error) {
        console.error("Error en fetchTaskSelectData:", error);
    };
};

export async function editProjectTask(data: editTaskData) {
    try {
        try {
            await editTask(data);
            return { success: true };
        } catch (error) {
            console.error("Error al editar proyecto:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en editProjectTask(Project):", error);
        return { success: false };
    } ;
};

export async function fetchTaskById(id: number, project_id: number) {
    try {
        const response = await getTaskById(id, project_id);
        return response;
    } catch (error) {
        console.error("Error en fetchTaskById:", error);
    };
};

export async function fetchTaskObservations(project_id: number, task_id: number, page: number)  {
    try {
        const response = await getTaskObservations(project_id, task_id, page);
        return response;
    } catch (error) {
        console.error("Error en fetchTaskObservations:", error);
    };
};

export async function createTaskObservation(data: createTaskObservationData) {
    try {
        try {
            await newTaskObservation(data);
            return { success: true };
        } catch (error) {
            console.error("Error al crear observacion:", error);
            return { success: false };
        };
    } catch (error) {
        console.error("Error en createTaskObservation:", error);
        return { success: false };
    };
};