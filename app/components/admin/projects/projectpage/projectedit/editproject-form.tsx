"use client"

import { editFormData, editFormProps, editProjectData } from "@/app/lib/dtos/project";
import { editProject, fetchProjectSelectData } from "@/app/services/projects/projects.service";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditProjectForm({ project, refetch }: editFormProps) {
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<editFormData>({
        defaultValues: {
            name: "",
            description: "",
            projectstatus_id: '',
            projecttype_id: ''
        },
    });
    const { data: selectdata, isLoading } = useQuery({
        queryKey: ['fetchSelectData'],
        queryFn: () => fetchProjectSelectData(),
        refetchOnWindowFocus: false
    });
    const mutation = useMutation({
        mutationFn: (data: editProjectData) => editProject(data),
        onSuccess: (result) => {
            if (result && result.success) {
                refetch();
            };
        }
    });
    const onSubmit: SubmitHandler<editFormData> = (data) => {
        mutation.mutate({ 
            name: data.name,
            description: data.description,
            projecttype_id: data.projecttype_id as number,
            projectstatus_id: data.projectstatus_id as number,
            id: project.id,
        });
    };
    useEffect(() => {
        if (project && selectdata) {
            reset({
                name: project.name,
                description: project.description,
                projectstatus_id: project.projectstatus_id,
                projecttype_id: project.projecttype_id,
            });
        };
    }, [project, selectdata, reset]);
    return (
        <form className="flex flex-col w-full h-full gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-4">
                <div className='flex text-gray-700 items-center justify-center font-bold text-xl md:text-2xl mb-2'>
                    Información
                </div>
                <div className="flex grow" />
                <div className="flex mr-2">
                    <Button variant="contained" color="success" disableElevation endIcon={mutation.isPending ? <CircularProgress color="warning" size={26}/> : <SaveIcon />} type="submit" disabled={mutation.isPending}>GUARDAR</Button>
                </div>
            </div>
            <div className='flex flex-col flex-grow w-full h-full gap-4 py-2 pr-2 overflow-y-auto custom-scrollbar'>
                <div className='flex w-full'>
                    <TextField 
                        id="name" 
                        label={errors.name ? errors.name.message : "Nombre de Proyecto"}
                        type="text" 
                        variant="outlined" 
                        color="warning" 
                        fullWidth 
                        value={watch("name")}
                        {...register("name", { required: "Este campo es requerido" })}
                        error={!!errors.name}
                    />
                </div>
                <div className='flex w-full'>
                    <TextField 
                        id="description" 
                        label={errors.description ? errors.description.message : "Descripción de Proyecto"}
                        type="text" 
                        variant="outlined" 
                        color="warning" 
                        multiline 
                        rows={4} 
                        fullWidth
                        value={watch("description")}
                        {...register("description", { 
                            required: "Este campo es requerido",
                            maxLength: {
                                value: 255, 
                                message: "Máximo 255 caracteres"
                            },
                        })}
                        error={!!errors.description}
                    />
                </div>
                <div className='md:flex md:gap-4 w-full'>
                    <div className='flex w-full mb-4 md:mb-0 md:w-3/6'>
                        <TextField 
                            id="projecttype_id" 
                            label={errors.projecttype_id ? errors.projecttype_id.message : isLoading ? "Cargando Tipos" : "Tipo de Proyecto"} 
                            type="text" 
                            variant="outlined" 
                            color="warning" 
                            select 
                            fullWidth 
                            value={watch("projecttype_id")}
                            {...register("projecttype_id", { required: "Este campo es requerido" })}
                            error={!!errors.projecttype_id}
                            disabled={isLoading}
                        >
                            {isLoading && <MenuItem value=''></MenuItem>}
                            {selectdata && selectdata.projecttypes && selectdata.projecttypes.length > 0 && selectdata.projecttypes.map((type: any) => (
                                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='flex w-full md:w-3/6'>
                        <TextField 
                            id="projectstatus_id" 
                            label={errors.projectstatus_id ? errors.projectstatus_id.message : isLoading ? "Cargando Estados" : "Estado de Proyecto"}
                            type="text" 
                            variant="outlined" 
                            color="warning" 
                            select 
                            fullWidth 
                            value={watch("projectstatus_id")}
                            {...register("projectstatus_id", { required: "Este campo es requerido" })}
                            error={!!errors.projectstatus_id}
                            disabled={isLoading}
                        > 
                            {isLoading && <MenuItem value=''></MenuItem>}
                            {selectdata && selectdata.projectstatuses && selectdata.projectstatuses.length > 0 && selectdata.projectstatuses.map((status: any) => (
                                <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
            </div>
        </form>
    );
};