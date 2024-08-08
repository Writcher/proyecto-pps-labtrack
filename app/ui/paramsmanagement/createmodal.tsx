import React, { FormEvent, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';

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

            const response = await fetch("/api/paramsmanagement", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    table
                })
            })

            response.status === 201 && handleClose();

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
                handleClose();
            } else {
                throw new Error("Error desconocido, la cagaste");
                handleClose();
            }
        }
    };

    return (
            <Dialog open={open} onClose={handleClose} maxWidth="md" PaperProps={{ 
                component: 'form',
                onSubmit: handleSubmit,
            }} 
            >
                <DialogTitle>
                    <div className='flex text-gray-700 font-medium text-3xl mb-6'>
                        Crear nuevo  
                        {(() => {
                            switch (table) {
                                case "supplytype":
                                    return " Tipo de Insumo";
                                case "projecttype":
                                    return " Tipo de Proyecto";
                                case "anotherType":
                                    return " Another Description";
                                default:
                                    return "";
                            }
                        })()}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <TextField id="name" name="name" label="Nombre" helperText="Nombre de Nuevo Tipo" type="text" variant="outlined" color="warning" fullWidth required/>
                </DialogContent>
                <DialogActions>
                <   Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCEL</Button>
                    <Button variant="contained" size="large" color="success" disableElevation endIcon={<CloseIcon />} type="submit">GUARDAR</Button>
                </DialogActions>
            </Dialog>
    );
}