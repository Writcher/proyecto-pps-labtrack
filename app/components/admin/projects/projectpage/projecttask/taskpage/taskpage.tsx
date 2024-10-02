"use client"

import { fetchTaskById } from "@/app/services/projects/projects.service";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import EditTaskForm from "./taskedit/taskedit-form";
import TaskObservationTable from "./taskobservation/observationtable";

export default function TaskPage({ task_id, project_id, current_id }: { task_id: number, project_id: number, current_id: number }) {
    //fetch task data
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchProjectById'],
        queryFn: () => fetchTaskById(task_id, project_id),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
    let editParams;
    if (data) {
        editParams = {
            id: task_id,
            name: data.name,
            description: data.description,
            start: data.end,
            end: data.start,
            taskstatus_id: data.taskstatus_id,
        };
    };  
    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex h-full pr-2 gap-4 md:gap-2 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row w-full h-full gap-4">
                    <div className="flex flex-grow md:w-[48%]">
                        {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <EditTaskForm refetch={refetch} task={editParams!} /> }
                    </div>
                    <div className="flex flex-grow md:w-[48%]">
                        {isLoading ? <Skeleton variant="rectangular" width="100%" height="100%" className="rounded"/> : <TaskObservationTable project_id={project_id} task_id={task_id} current_id={current_id}/> }
                    </div>
                </div>
            </div>
        </main>
    );
};