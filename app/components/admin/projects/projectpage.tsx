"use client"

import { fetchProjectById, fetchProjectObservations } from "@/app/services/projects/projects.service";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import EditProjectForm from "./editproject-form";
import Divider from "@mui/material/Divider";
import ProjectScholarTable from "./scholartable";
import ProjectObservationTable from "./observationtable";

interface pageProps {
    id: number  
};

export default function ProjectPage({ id }: pageProps) {
    //fetch project data
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchProjectById', id],
        queryFn: () => fetchProjectById(id),
        refetchOnWindowFocus: false,
    });
    let editParams;
    if (data) {
        editParams = {
            id: id,
            name: data.name,
            description: data.description,
            projecttype_id: data.projecttype_id,
            projectstatus_id: data.projectstatus_id
        };
    };
    return (
        <main className="flex flex-col w-full h-full gap-2">
            <div className="flex flex-col items-center justify-center text-xl md:text-3xl text-gray-700 text-center font-bold h-[15%] md:h-[10%]">
                <p className="mt-6 md:mt-0">
                    {isLoading ? <Skeleton variant='rectangular' height={40} width={400}/> : data?.name ?? ""}
                </p>
            </div>
            <div className="flex flex-col h-[85%] md:h-[90%] pr-2 md:gap-2 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row w-full md:h-[48%] md:gap-4">
                    <div className="flex flex-grow md:w-[50%]">
                        <EditProjectForm refetch={refetch} project={editParams!} />
                    </div>
                    <div className="block md:hidden">
                        <Divider className="w-full mb-4"></Divider>
                    </div>
                    <div className="flex flex-grow md:w-[50%]">
                        <ProjectScholarTable refetch={refetch} project_id={id} scholars={data?.scholars!} laboratory_id={data?.laboratory_id!}/>
                    </div>
                </div>
                <Divider className="w-full"></Divider>
                <div className="flex flex-col md:flex-row w-full md:h-[48%] md:gap-4">
                    <div className="flex flex-grow md:w-[50%]">
                    </div>
                    <div className="block md:hidden">
                        <Divider className="w-full mb-4"></Divider>
                    </div>
                    <div className="flex flex-grow md:w-[50%]">
                        <ProjectObservationTable project_id={id}/>
                    </div>
                </div>
            </div>
        </main>
    );
};