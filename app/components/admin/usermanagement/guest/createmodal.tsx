"use client"

import React, { FormEvent, useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Alert from '@mui/material/Alert';

dayjs.locale('es');
dayjs.extend(localizedFormat);

interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
    laboratory_id: number;
}

export default function CreateGuestModal({ open, handleClose, laboratory_id }: CreateModalProps) {
    const [error, setError] = useState("");
    const [expiresAt, setExpiresAt] = useState<Dayjs | null>(null);

    // Resetea el error cuando el modal se cierra
    useEffect(() => {
        if (!open) {
            setError("");
        }
    }, [open]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            
            const expires_at = expiresAt ? expiresAt.toDate().toISOString() : null;

            if (!expires_at) {
                setError("Debe seleccionar una fecha de vencimiento");
                return;
            }

            const response = await fetch("/api/admin/usermanagement/guest", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    expires_at,
                    password,
                    laboratory_id
                })
            });

            if (response.ok) {
                handleClose();
            } else {
                const result = await response.json();
                setError(result.error || "Error desconocido");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error desconocido");
            }
        }
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
                onSubmit: handleSubmit,
                onClick: handleDialogClick,
                style: { width: '600px', maxWidth: 'none' }
            }} 
        >
            <div className='flex flex-col m-2'>
                <DialogTitle>
                    <div className='text-gray-700 items-center font-medium text-2xl md:text-3xl mb-2'>
                        Crear nuevo Invitado
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                        <div className='flex w-full'>
                            <TextField id="name" name="name" label="Nombre y Apellido" helperText="Ingrese Nombre y Apellido" type="text" variant="outlined" color="warning" fullWidth required/>
                        </div>
                        <div className='flex w-full'>
                            <TextField id="email" name="email" label="Email" helperText="Ingrese Email" type="email" variant="outlined" color="warning" fullWidth required/>
                        </div>
                        <div className='flex w-full'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DatePicker
                                    label="Fecha de Vencimiento"
                                    value={expiresAt}
                                    onChange={(newValue) => setExpiresAt(newValue)}
                                    slotProps={{
                                        textField: {
                                            id: "expires_at",
                                            name: "expires_at",
                                            helperText: "Ingrese Fecha de Vencimiento",
                                            fullWidth: true,
                                            variant: "outlined",
                                            color: "warning"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='flex w-full'>
                            <TextField id="password" name="password" label="Contraseña" helperText="Ingrese Contraseña" type="password" variant="outlined" color="warning" fullWidth required/>
                        </div>
                        {error && <Alert severity="error">{error}</Alert>}
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
                            <Button variant="contained"  color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                            <Button variant="contained"  color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                        </div>
                    </div>
                </DialogActions>
            </div>
        </Dialog>
    );
}