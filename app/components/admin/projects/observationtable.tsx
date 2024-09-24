"use client"

import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import { projectObservationFormData, projectObservationTableProps } from "@/app/lib/dtos/observation";
import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateObservationModal from "./createprojectobservationmodal";
import { fetchProjectObservations } from "@/app/services/projects/projects.service";
import { useQuery } from "@tanstack/react-query";
import Masonry from "@mui/lab/Masonry";
    
export default function ProjectObservationTable({ project_id }: projectObservationTableProps) { 
    const { watch, setValue } = useForm<projectObservationFormData>({
        defaultValues: {
            //modals
            modalOpenCreate: false,
            modalOpenDelete: false,
            //selected row
            selectedRowId: 0,
            //expanded row
            expandedRowId: null,
        }
    });
    //fetch observations
    const { data: observations, refetch } = useQuery({
        queryKey: ['fetchProjectObservations', project_id],
        queryFn: () => fetchProjectObservations(project_id),
        refetchOnWindowFocus: false,
    });
    //modales
        //create
    const modalOpenCreate = watch("modalOpenCreate");
    const handleOpenCreateModal = () => setValue("modalOpenCreate", true);
    const handleCloseCreateModal = () => {
        setValue("modalOpenCreate", false);
        refetch();
    };
        //selected row
    const selectedRowId = watch("selectedRowId");
        //delete
    const modalOpenDelete = watch("modalOpenDelete");
    const handleOpenDeleteModal = (id: number) => {
        setValue("selectedRowId", id);
        setValue("modalOpenDelete", true);
    };
    const handleCloseDeleteModal = () => {
        setValue("modalOpenDelete", false);
        refetch();
    };  
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-row gap-4">
                <div className='flex text-gray-700 items-center justify-center font-bold text-l md:text-2xl mb-2'>
                    Observaciones
                </div>
                <div className="flex grow" />
                <div className="flex">
                    <Button variant="contained" color="success" disableElevation endIcon={<AddIcon/>} onClick={handleOpenCreateModal}>AÑADIR</Button>
                </div>
            </div>
            <div className="flex flex-grow h-full w-full overflow-y-auto custom-scrollbar">
                <Masonry columns={1} spacing={1}>
                    {observations && observations.length > 0 ? (
                        observations.map((row: any) => (
                            <React.Fragment key={row.id}>
                                <Card className="bg-gray-100 shadow-none border border-gray-400">
                                    <CardContent>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row items-center justify-center">
                                                <div className="flex text-gray-700 font-medium md:font-bold text-[15px]">
                                                    {new Date(row.created_at).toLocaleDateString('es-AR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="flex flex-grow" />
                                                <IconButton color="error" onClick={() => handleOpenDeleteModal(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                            <div className="flex-grow text-gray-700 font-medium text-[15px] break-words">
                                            {row.content}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </React.Fragment>
                        ))
                    ) : (
                        <div></div>
                    )}
                </Masonry>
            </div>
            <CreateObservationModal 
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                project_id={project_id}
            />
        </div>
    );
};