import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createTableData } from '@/app/services/abm/abm.service';


interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
    table: string;
}

interface FormData {
    name: string;
}

interface MutationData {
    name: string;
    table: string;
}

export default function CreateModal({ open, handleClose, table }: CreateModalProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const mutation = useMutation({
        mutationFn: (data: MutationData) => createTableData(data),
        onSuccess: () => {
            handleClose(); // Cerrar el modal en caso de éxito
            reset(); // Limpiar el formulario
        },
        onError: (error: Error) => {
            console.error("Error al crear el ítem:", error);
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutation.mutate({ name: data.name, table });
    };

    // Evita que se cierre si se clickea el background
    const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

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
                        Crear nuev  
                        {(() => {
                            switch (table) {
                                case "supplytype":
                                    return "o Tipo de Insumo";
                                case "projecttype":
                                    return "o Tipo de Proyecto";
                                case "supplystatus":
                                    return "o Estado de Insumo";
                                case "projectstatus":
                                    return "o Estado de Proyecto";
                                case "scholarshiptype":
                                    return "o Tipo de Beca";
                                case "grade":
                                    return "a Calificación";
                                case "usercareer":
                                    return "a Carrera";
                                default:
                                    return "";
                            }
                        })()}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                        <TextField
                            id="name"
                            label="Nombre"
                            helperText="Nombre de Nuevo Tipo"
                            type="text"
                            variant="outlined"
                            color="warning"
                            fullWidth
                            required
                            {...register("name", { required: true })}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className='flex flex-row m-4 hidden md:block'>
                        <div className='flex flex-row gap-4'>
                            <Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                            <Button variant="contained" size="large" color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                        </div>
                    </div>
                    <div className='flex flex-row m-3 block md:hidden'>
                        <div className='flex flex-row justify-center gap-1'>
                            <Button variant="contained" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                            <Button variant="contained" color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                        </div>
                    </div>
                </DialogActions>
            </div>
        </Dialog>
    );
}