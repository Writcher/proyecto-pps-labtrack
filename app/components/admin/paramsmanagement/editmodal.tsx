"use client"

import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { SubmitHandler, useForm } from 'react-hook-form';
import { editTableData } from '@/app/services/admin/paramsmanagement/abm.service';
import { useMutation } from '@tanstack/react-query';

interface EditModalProps {
    open: boolean;
    handleClose: () => void;
    table: string;
    id: number;
    name: string;
}

interface FormData {
    name: string;
}

interface MutationData {
    name: string;
    id: number;
    table: string;
}

interface APIError {
    name?: string
}

export default function EditModal({ open, handleClose, table, id, name }: EditModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: name
        },
      });
    const [apiError, setApiError] = useState<APIError>({});
    const mutation = useMutation({
        mutationFn: (data: MutationData) => editTableData(data),
        onSuccess: (result) => {
            if (result && result.success) {
                handleClose();
                reset();
            } else if (result) {
                setApiError(result.error);
            }
        },
        onError: (error: APIError) => {
            setApiError({ name: error.name });
        },
    });
    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutation.mutate({ 
            name: data.name, 
            id, table 
        });
    };
    const handleExit = () => {
        handleClose();
        setApiError({});
        reset();
    };
    const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    useEffect(() => {
        reset({
            name: name
        });
    }, [name, reset]);
    return (
            <Dialog 
                open={open} 
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                maxWidth={false}
                fullWidth
                PaperProps={{ 
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                    onClick: handleDialogClick,
                    style: { width: '600px', maxWidth: 'none' }
                }} 
            >
                <div className='flex flex-col m-2'>
                    <DialogTitle>
                        <div className='text-gray-700 items-center font-medium text-2xl md:text-3xl mb-2'>
                            Editar  
                            {(() => {
                                switch (table) {
                                    case "supplytype":
                                        return " Tipo de Insumo ";
                                    case "projecttype":
                                        return " Tipo de Proyecto ";
                                    case "supplystatus":
                                        return " Estado de Insumo ";
                                    case "projectstatus":
                                        return " Estado de Proyecto ";
                                    case "scholarshiptype":
                                        return " Tipo de Beca ";
                                    case "grade":
                                        return " Calificación ";
                                    case "usercareer":
                                        return " Carrera ";
                                    default:
                                        return "";
                                }
                            })()}
                            con ID {id}: {name}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                            <TextField 
                                id="name" 
                                label="Nombre"
                                type="text" 
                                variant="outlined" 
                                color="warning" 
                                fullWidth
                                {...register("name", { required: "Este campo es requerido" })}
                                error={!!errors.name || !!apiError.name}
                                helperText={errors.name ? errors.name.message : apiError.name ? apiError.name : "Nombre de Nuevo Elemento"}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='flex flex-row m-4 hidden md:block'>
                            <div className='flex flex-row gap-4'>
                                <Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleExit}>CANCELAR</Button>
                                <Button variant="contained" size="large" color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                            </div>
                        </div>
                        <div className='flex flex-row m-3 block md:hidden'>
                            <div className='flex flex-row justify-center gap-1'>
                                <Button variant="contained"  color="error" disableElevation endIcon={<CloseIcon />} onClick={handleExit}>CANCELAR</Button>
                                <Button variant="contained"  color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                            </div>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
    );
};