import React, { FormEvent } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
    table: string;
}

export default function CreateModal({ open, handleClose, table }: CreateModalProps) {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name") as string;

            const response = await fetch("/api/dashboard/paramsmanagement", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    table
                })
            })

            if (response.status === 201) {
                handleClose();
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Error desconocido, la cagaste");
            }
        }
    };

    //evita que se cierre si sse clickea el background
    const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
            <Dialog 
                open={open} 
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose(); //solo cierra si la rason no es un click en el fondo
                    }
                }}
                PaperProps={{ 
                    component: 'form',
                    onSubmit: handleSubmit,
                    onClick: handleDialogClick //que no lo cieren clicks adentro del modal
                }}
            >
                <div className='flex flex-col m-2'>
                    <DialogTitle>
                        <div className='text-gray-700 text-center font-medium text-2xl md:text-3xl mb-2'>
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
                            <TextField id="name" name="name" label="Nombre" helperText="Nombre de Nuevo Tipo" type="text" variant="outlined" color="warning" fullWidth required/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='flex gap-1 md:m-4 md:gap-4'>
                            <Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                            <Button variant="contained" size="large" color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
    );
}