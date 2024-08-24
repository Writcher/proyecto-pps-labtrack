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
import { MenuItem } from '@mui/material';
import { Supplystatus, Supplytype } from '@/app/lib/definitions';

interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
    supplytypes: Supplytype[];
    supplystatuses: Supplystatus[];
    laboratory_id: number;
}

export default function CreateSupplyModal({ open, handleClose, supplytypes, supplystatuses, laboratory_id }: CreateModalProps) {
    const [error, setError] = useState("");

    // Resetea el error cuando el modal se cierra
    useEffect(() => {
        if (!open) {
            setError("");
        }
    }, [open]);

    const [supplyStatus, setSupplyStatus] = useState<number | ''>('');
    const handleSupplyStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSupplyStatus(event.target.value as number);
    };

    const [supplyType, setSupplyType] = useState<number | ''>('');
    const handleSupplyTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSupplyType(event.target.value as number);
    };

    const añoInicio = 2008;
    const añoFinal = 2034;
    const años = Array.from({ length: añoFinal - añoInicio + 1 }, (_, index) => añoInicio + index)
    const [year, setYear] = useState<number | ''>('');
    const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setYear(event.target.value as number);
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name") as string;
            const description = formData.get("description") as string;
            const yearstring = formData.get("year")
            const supplytypestring = formData.get("supplytype"); 
            const supplystatusstring = formData.get("supplystatus");

            const supplytype_id = supplytypestring ? parseInt(supplytypestring as string, 10) : undefined;
            const supplystatus_id = supplystatusstring ? parseInt(supplystatusstring as string, 10) : undefined;
            const year = yearstring ? parseInt(yearstring as string, 10) : undefined;

            const response = await fetch("/api/inventory", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    year,
                    supplystatus_id,
                    supplytype_id,
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
                    handleClose(); // Solo cierra si la razón no es un click en el fondo
                }
            }}
            PaperProps={{ 
                component: 'form',
                onSubmit: handleSubmit,
                onClick: handleDialogClick // Que no lo cierren clics adentro del modal
            }} 
        >
            <div className='flex flex-col m-2 md:w-[500px]'>
                <DialogTitle>
                    <div className='text-gray-700 items-center font-medium text-2xl md:text-3xl mb-2'>
                        Crear nuevo Insumo
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                        <div className='md:flex md:gap-4 w-full'>                    
                            <div className='flex w-full mb-4 md:mb-0 md:w-4/6'>
                                <TextField id="name" name="name" label="Nombre" helperText="Ingrese Nombre" type="text" variant="outlined" color="warning" fullWidth required/>
                            </div>                    
                            <div className='flex w-full md:w-2/6'>
                                <TextField id="year" name="year" label="Año" helperText="Seleccione el Año" type="text" variant="outlined" color="warning" select fullWidth required value={year} onChange={handleYearChange}>
                                {años.map((año) => (
                                    <MenuItem key={año} value={año}>
                                        {año}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <TextField id="description" name="description" label="Descripción" helperText="Ingrese Descripción" type="text" variant="outlined" color="warning" multiline rows={6} inputProps={{ maxLength: 255 }} fullWidth required/>
                        </div>
                        <div className='md:flex md:gap-4 w-full'>
                            <div className='flex w-full mb-4 md:mb-0 md:w-3/6'>
                                <TextField id="supplytype" name="supplytype" label="Tipo" helperText="Selecciona el Tipo de Insumo" type="text" variant="outlined" color="warning" select fullWidth required value={supplyType} onChange={handleSupplyTypeChange}>
                                    {supplytypes.map(type => (
                                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='flex w-full mb-4 md:mb-0 md:w-3/6'>
                            <TextField id="supplystatus" name="supplystatus" label="Estado" helperText="Selecciona el Estado del Insumo" type="text" variant="outlined" color="warning" select fullWidth required value={supplyStatus} onChange={handleSupplyStatusChange}> 
                                {supplystatuses.map(status => (
                                    <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                                ))}
                            </TextField>
                            </div>
                        </div>
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