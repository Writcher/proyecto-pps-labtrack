"use client"

import { fetchProjectById } from "@/app/services/projects/projects.service";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import EditProjectForm from "./projectedit/editproject-form";
import Divider from "@mui/material/Divider";
import ProjectScholarTable from "./projectscholar/scholartable";
import ProjectObservationTable from "./projectobservation/observationtable";
import ProjectTaskTable from "./projecttask/tasktable";
import { useEffect, useState } from "react";

interface pageProps {
    id: number  
    current_id: number
};

export default function ProjectPage({ id, current_id }: pageProps) {
    //more content arrow
    const [isEndReached, setIsEndReached] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollableElement = document.querySelector('.custom-scrollbar');
            if (scrollableElement) {
                const scrollTop = scrollableElement.scrollTop;
                const clientHeight = scrollableElement.clientHeight;
                const scrollHeight = scrollableElement.scrollHeight;
                if (scrollTop + clientHeight >= scrollHeight - 1) {
                    setIsEndReached(true);
                } else {
                    setIsEndReached(false);
                };
            };
        };
        const scrollableElement = document.querySelector('.custom-scrollbar');
        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', handleScroll);
        };
        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener('scroll', handleScroll);
            };
        };
    }, []);
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
        <div className="relative w-full h-full">
            <main className="flex flex-col w-full h-full">
                <div className="flex flex-col h-full pr-2 gap-4 md:gap-2 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col md:flex-row w-full gap-4">
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
                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <div className="flex flex-grow">
                            {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <ProjectObservationTable project_id={id} scholar_ids={scholar_ids!} current_id={current_id}/>}
                        </div>
                    </div>
                    <Divider className="flex w-full"></Divider>
                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <div className="flex flex-grow">
                            {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <ProjectTaskTable project_id={id}/>}
                        </div>
                    </div>
                </div>
            </main>
            {!isEndReached && (
                <div className="absolute bottom-[-2] left-0 right-0 flex justify-center">
                    <span className="animate-pulse text-gray-800">⬇ Desplázate para ver más ⬇</span>
                </div>
            )}
        </div>
    );
};