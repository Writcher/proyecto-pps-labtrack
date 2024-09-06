import { NextResponse } from 'next/server';
import { getHistoricProjects } from '@/app/lib/queries/historicproject';

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const labidString = url.searchParams.get('labid');
        const projectname = url.searchParams.get('projectname') || undefined;
        const scholarshipString = url.searchParams.get('scholarship');
        const userCareerString = url.searchParams.get('usercareer');
        const scholarname = url.searchParams.get('scholarname') || undefined;
        const projectStatusString = url.searchParams.get('projectstatus');
        const projectTypeString = url.searchParams.get('projecttype');
        const yearString = url.searchParams.get('year');
        const labid = labidString ? parseInt(labidString, 10) : undefined;
        const scholarship = scholarshipString ? parseInt(scholarshipString, 10) : undefined;
        const userCareer = userCareerString ? parseInt(userCareerString, 10) : undefined;
        const projectStatus = projectStatusString ? parseInt(projectStatusString, 10) : undefined;
        const projectType = projectTypeString ? parseInt(projectTypeString, 10) : undefined;
        const year = yearString ? parseInt(yearString, 10) : undefined;
        if (labid === undefined) {
            return new NextResponse("labid is required", { status: 400 });
        }
        const filters = {
            projectname,
            scholarship,
            userCareer,
            scholarname,
            projectStatus,
            projectType,
            year
        };
        const data = await getHistoricProjects(labid, filters);

        return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error manejando GET:", error);
        return new NextResponse("Error manejando GET", { status: 500 });
    }
}