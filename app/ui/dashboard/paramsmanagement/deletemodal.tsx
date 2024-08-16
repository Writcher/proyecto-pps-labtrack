import React, { FormEvent } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface DeleteModalProps {
    open: boolean;
    handleClose: () => void;
    table: string;
    id: number;
    name: string;
}

export default function DeleteModal({ open, handleClose, table, id, name }: DeleteModalProps) {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await fetch(`/api/dashboard/paramsmanagement?id=${encodeURIComponent(id)}&table=${encodeURIComponent(table)}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
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
                            ¿Eliminar {name} de la tabla
                            {(() => {
                                switch (table) {
                                    case "supplytype":
                                        return " Tipo de Insumo";
                                    case "projecttype":
                                        return " Tipo de Proyecto";
                                    case "supplystatus":
                                        return " Estado de Insumo";
                                    case "projectstatus":
                                        return " Estado de Proyecto";
                                    case "scholarshiptype":
                                        return " Tipo de Beca";
                                    case "grade":
                                        return " Calificación";
                                    default:
                                        return "";
                                }
                            })()}
                            ?
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                            <div className='text-gray-700 font-medium text-xl mb-2'>
                                Esto eliminara la entrada para siempre, ¿Esta seguro?
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='flex gap-1 md:m-4 md:gap-4'>
                            <Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                            <Button variant="contained" size="large" color="success" disableElevation endIcon={<DeleteForeverIcon />} type="submit">BORRAR</Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
    );
}