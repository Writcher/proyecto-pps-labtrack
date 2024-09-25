"use client"

import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import { deleteObservationData, projectObservationFormData, projectObservationTableProps } from "@/app/lib/dtos/observation";
import React, { useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateObservationModal from "./createprojectobservationmodal";
import { deleteObservation, fetchProjectObservations } from "@/app/services/projects/projects.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import Masonry from "@mui/lab/Masonry";
    
export default function ProjectObservationTable({ project_id }: projectObservationTableProps) { 
    const { watch, setValue, getValues, reset } = useForm<projectObservationFormData>({
        defaultValues: {
            observations: [],
            loadMoreDisabled: false,
            //modals
            modalOpenCreate: false,
            //page
            page: 1
        }
    });
    //fetch observations
    const loadMoreDisabled = watch("loadMoreDisabled");
    const observations = watch("observations");
    const page = watch("page");
    const { data, refetch } = useQuery({
        queryKey: ['fetchProjectObservations', project_id, page],
        queryFn: () => fetchProjectObservations(project_id, page),
        refetchOnWindowFocus: false,
    });
    useEffect(() => {
        if (data) {
            if (page === 1) {
                setValue("observations", data.observations); 
                setValue("loadMoreDisabled", observations.length == data.totalObservations);
            } else {
                const existingObservations = getValues("observations");
                setValue("observations", [...existingObservations, ...data.observations]);
                setValue("loadMoreDisabled", observations.length == data.totalObservations);
            };
        };
    }, [data, page, setValue, getValues]);
    const handleLoadMore = () => setValue("page", page + 1);
    //modales
        //create
    const modalOpenCreate = watch("modalOpenCreate");
    const handleOpenCreateModal = () => setValue("modalOpenCreate", true);
    const handleCloseCreateModal = () => {
        setValue("page", 1);
        reset();
        refetch();
    };
    //delete
    const mutation = useMutation({
        mutationFn: (data: deleteObservationData) => deleteObservation(data),
        onSuccess: (result, variables) => {
            if (result && result.success) {
                const existingObservations = getValues("observations");
                const updatedObservations = existingObservations.filter(observation => observation.id !== variables.id);
                setValue("observations", updatedObservations);
            };
        }
    });
    const handleDelete = (id: number) => {
        mutation.mutate({
            id: id
        })
    };
    return (
        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-row gap-4">
                <div className='flex text-gray-700 items-center justify-center font-bold text-xl md:text-2xl mb-2'>
                    Observaciones
                </div>
                <div className="flex grow" />
                <div className="flex mr-2">
                    <Button variant="contained" color="success" disableElevation endIcon={<AddIcon/>} onClick={handleOpenCreateModal}>AÑADIR</Button>
                </div>
            </div>
            <div className="flex flex-grow overflow-y-auto custom-scrollbar">
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
                                                <IconButton color="error" onClick={() => handleDelete(row.id)}>
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
            <div className="flex justify-end items-end overflow-x-hide">
                <div className="flex grow" />
                <div className="flex text-gray-800 mr-2">
                    <Button variant="outlined" color="inherit" disableElevation endIcon={<AddIcon/>} onClick={handleLoadMore} disabled={loadMoreDisabled}>CARGAR MÁS OBSERVACIONES</Button>
                </div>
            </div>
            <CreateObservationModal 
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                project_id={project_id}
            />
        </div>
    );
};