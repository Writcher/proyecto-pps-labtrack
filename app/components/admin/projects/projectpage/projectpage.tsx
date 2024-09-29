"use client"

import { fetchProjectById } from "@/app/services/projects/projects.service";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import EditProjectForm from "./projectedit/editproject-form";
import Divider from "@mui/material/Divider";
import ProjectScholarTable from "./projectscholar/scholartable";
import ProjectObservationTable from "./projectobservation/observationtable";
import ProjectTaskTable from "./projecttask/tasktable";

interface pageProps {
    id: number  
};

export default function ProjectPage({ id }: pageProps) {
    //fetch project data
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchProjectById'],
        queryFn: () => fetchProjectById(id),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
    let editParams;
    let scholar_ids: number[];
    if (data) {
        editParams = {
            id: id,
            name: data.name,
            description: data.description,
            projecttype_id: data.projecttype_id,
            projectstatus_id: data.projectstatus_id
        };
        if (data.scholars) {
            scholar_ids = data.scholars.map(scholar => scholar.id);
        } else {
            scholar_ids = [];
        };
    };    
    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex flex-col h-full pr-2 gap-4 md:gap-2 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row w-full md:h-[48%] gap-4">
                    <div className="flex flex-grow md:w-[50%]">
                        {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <EditProjectForm refetch={refetch} project={editParams!} />}
                    </div>
                    <div className="block md:hidden">
                        <Divider className="w-full mb-4"></Divider>
                    </div>
                    <div className="flex flex-grow md:w-[50%]">
                        {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <ProjectScholarTable refetch={refetch} project_id={id} scholars={data?.scholars!} laboratory_id={data?.laboratory_id!}/>}
                    </div>
                </div>
                <Divider className="flex w-full"></Divider>
                <div className="flex flex-col md:flex-row w-full md:h-[48%] gap-4">
                    <div className="flex flex-grow md:w-[50%]">
                        {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <ProjectTaskTable project_id={id}/>}
                    </div>
                    <div className="block md:hidden">
                        <Divider className="w-full mb-4"></Divider>
                    </div>
                    <div className="flex flex-grow md:w-[50%]">
                        {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <ProjectObservationTable project_id={id} scholar_ids={scholar_ids!}/>}
                    </div>
                </div>
            </div>
        </main>
    );
};