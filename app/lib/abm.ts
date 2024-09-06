import { ABMcreateQuery, ABMeditQuery } from './dtos/abm';
import { grade, newGrade } from './dtos/grade';
import { newProjectType, projectType } from './dtos/projecttype';
import { newScolarchipType, scholarshipType } from './dtos/scholarshiptype';
import { newSupplyType, supplyType } from './dtos/supplytype';
import { newUserCareer, userCareer } from './dtos/usercareer';
import { newProjectStatus, projectStatus } from './dtos/projectstatus';
import { newSupplyStatus, supplyStatus } from './dtos/supplystatus';
import { createGrade, getGradeByName, getGrades, updateGrade} from './queries/grade';
import { createHistoricProjectStatus } from './queries/historicprojectstatus';
import { createHistoricProjectType } from './queries/historicprojecttype';
import { createHistoricScholarshipType } from './queries/historicscholarshiptype';
import { createHistoricUserCareer } from './queries/historicusercareer';
import { createProjectStatus, getProjectStatusByName, getProjectStatuses, updateProjectStatus } from './queries/projectstatus';
import { createProjectType, getProjectTypeByName, getProjectTypes, updateProjectType } from './queries/projecttype';
import { createScholarshipType, getScholarshipTypeByName, getScholarshipTypes, updateScholarshipType } from './queries/scholarshiptype';
import { createSupplyStatus, getSupplyStatusByName, getSupplyStatuses, updateSupplyStatus } from './queries/supplystatus';
import { createSupplyType, getSupplyTypeByName, getSupplyTypes, updateSupplyType } from './queries/supplytype';
import { createUserCareer, getUserCareerByName, getUserCareers, updateUserCareer } from './queries/usercareer';

export async function createInstance(query: ABMcreateQuery) {
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                const newSupplyType: newSupplyType = {
                    name: query.name,
                };
                await createSupplyType(newSupplyType);
                break;
            case "supplystatus":
                const newSupplyStatus: newSupplyStatus = {
                    name: query.name,
                };
                await createSupplyStatus(newSupplyStatus);
                break;
            case "projecttype":
                const newProjectType: newProjectType = {
                    name: query.name,
                }
                await createProjectType(newProjectType);
                await createHistoricProjectType(newProjectType);
                break;
            case "projectstatus":
                const newProjectStatus: newProjectStatus = {
                    name: query.name,
                }
                await createProjectStatus(newProjectStatus);
                await createHistoricProjectStatus(newProjectStatus);
                break;
            case "scholarshiptype":
                const newScholarshipType: newScolarchipType = {
                    name: query.name,
                }
                await createScholarshipType(newScholarshipType);
                await createHistoricScholarshipType(newScholarshipType);
                break;
            case "grade":
                const newGrade: newGrade = {
                    name: query.name,
                }
                await createGrade(newGrade);
            case "usercareer":
                const newUsercareer: newUserCareer = {
                    name: query.name,
                }
                await createUserCareer(newUsercareer);
                await createHistoricUserCareer(newUsercareer);
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}

export async function editInstance(query: ABMeditQuery) {
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                const editSupplyType: supplyType = {
                    name: query.name,
                    id: query.id
                };
                await updateSupplyType(editSupplyType);
                break;
            case "supplystatus":
                const editSupplyStatus: supplyStatus = {
                    name: query.name,
                    id: query.id
                };
                await updateSupplyStatus(editSupplyStatus);
                break;
            case "projecttype":
                const editProjectType: projectType = {
                    name: query.name,
                    id: query.id
                }
                const newProjectType: newProjectType = {
                    name: query.name,
                }
                await createHistoricProjectType(newProjectType);
                await updateProjectType(editProjectType);
                break;
            case "projectstatus":
                const editProjectStatus: projectStatus = {
                    name: query.name,
                    id: query.id
                }
                const newProjectStatus: newProjectStatus = {
                    name: query.name,
                }
                await createHistoricProjectStatus(newProjectStatus);
                await updateProjectStatus(editProjectStatus);
                break;
            case "scholarshiptype":
                const editScholarshipType: scholarshipType = {
                    name: query.name,
                    id: query.id
                }
                const newScholarshipType: newScolarchipType = {
                    name: query.name,
                }
                await createHistoricScholarshipType(newScholarshipType);
                await updateScholarshipType(editScholarshipType);
                break;
            case "grade":
                const editGrade: grade = {
                    name: query.name,
                    id: query.id    
                }
                await updateGrade(editGrade);
                break;
            case "usercareer":
                const editUsercareer: userCareer = {
                    name: query.name,
                    id: query.id    
                }
                const newUsercareer: newUserCareer = {
                    name: query.name,
                }
                await createHistoricUserCareer(newUsercareer);
                await updateUserCareer(editUsercareer);
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return { success: true };

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo editar instancia (profundo)");
    }
}

export async function getAllInstances(table: string) {
    let data;
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(table)) {
            throw new Error(`Tabla no valida: ${table}`);
        }

        switch (table) {
            case "supplytype":
                data = await getSupplyTypes();
                break;
            case "supplystatus":
                data = await getSupplyStatuses();
                break;
            case "projecttype":
                data = await getProjectTypes();
                break;
            case "projectstatus":
                data = await getProjectStatuses();
                break;
            case "scholarshiptype":
                data = await getScholarshipTypes();
                break;
            case "grade":
                data = await getGrades();
                break;
            case "usercareer":
                data = await getUserCareers();
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${table}`);
        }

        return data;

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}

export async function searchInstance(query: ABMcreateQuery) {
    let data;
    let name;
    try {
        const allowedTables = ["supplytype", "supplystatus", "projecttype", "projectstatus", "scholarshiptype", "grade", "usercareer"];
        if (!allowedTables.includes(query.table)) {
            throw new Error(`Tabla no valida: ${query.table}`);
        }

        switch (query.table) {
            case "supplytype":
                name = query.name as string;
                data = await getSupplyTypeByName(name);
                break;
            case "supplystatus":
                name = query.name as string;
                data = await getSupplyStatusByName(name);
                break;
            case "projecttype":
                name = query.name as string;
                data = await getProjectTypeByName(name);
                break;
            case "projectstatus":
                name = query.name as string;
                data = await getProjectStatusByName(name);
                break;
            case "scholarshiptype":
                name = query.name as string;
                data = await getScholarshipTypeByName(name);
                break;
            case "grade":
                name = query.name as string;
                data = await getGradeByName(name);
                break;
            case "usercareer":
                name = query.name as string;
                data = await getUserCareerByName(name);
                break;
            default:
                throw new Error(`No se puede manejar la tabla: ${query.table}`);
        }

        return data.rows;

    } catch (error) {
        console.error("Error de Base de Datos:", error);
        throw new Error("No se pudo crear instancia (profundo)");
    }
}