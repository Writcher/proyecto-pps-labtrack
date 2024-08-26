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
import { Divider, MenuItem } from '@mui/material';
import { NewHistoricScholar, Projectstatus, Projecttype, Scholarshiptype, Usercareer } from '@/app/lib/definitions';

interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
    historicusercareers: Usercareer[];
    historicscholarships: Scholarshiptype[];
    historicprojecttypes: Projecttype[];
    historicprojectstatus: Projectstatus[];
    laboratory_id: number;
}

export default function CreateHistoricProjectModal({ open, handleClose, historicusercareers, historicscholarships, historicprojecttypes, historicprojectstatus, laboratory_id  }: CreateModalProps) {
    const [error, setError] = useState("");
    useEffect(() => {
        if (!open) {
            setError("");
        }
    }, [open]);

    const [projectStatus, setProjectStatus] = useState<number | ''>('');
    const handleProjectStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setProjectStatus(event.target.value as number);
    };
    const [projectType, setProjectType] = useState<number | ''>('');
    const handleProjectTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setProjectType(event.target.value as number);
    };
    const añoInicio = 2008;
    const añoFinal = new Date().getFullYear() - 1;
    const años = Array.from({ length: añoFinal - añoInicio + 1 }, (_, index) => añoInicio + index);
    const [year, setYear] = useState<number | ''>('');
    const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setYear(event.target.value as number);
    };
    const [scholars, setScholars] = useState<NewHistoricScholar[]>([]);
    const handleScholarChange = ( index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value, type } = event.target;
        const newScholars = [...scholars];
        type ScholarField = 'name' | 'email' | 'dni' | 'file' | 'phone' | 'careerlevel' | 'historicusercareer_id' | 'historicscholarshiptype_id';
        const fieldName = name as ScholarField;
        if (fieldName === 'careerlevel' || fieldName === 'historicusercareer_id' || fieldName === 'historicscholarshiptype_id') {
        newScholars[index][fieldName] = parseInt(value, 10) as any;
        } else {
        newScholars[index][fieldName] = value;
        }
        setScholars(newScholars);
    };
    const handleAddScholar = () => {
        setScholars([
            ...scholars,
            {
                name: '',
                email: '',
                dni: '',
                file: '',
                phone: '',
                careerlevel: undefined,
                historicusercareer_id: undefined,
                historicscholarshiptype_id: undefined,
            },
        ]);
    };
    const handleRemoveScholar = (index: number) => {
        const newScholars = scholars.filter((_, i) => i !== index);
        setScholars(newScholars);
    };


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("projectname") as string;
            const description = formData.get("description") as string;
            const yearstring = formData.get("year")
            const projecttypestring = formData.get("projecttype"); 
            const projectstatusstring = formData.get("projectstatus");

            const projecttype_id = projecttypestring ? parseInt(projecttypestring as string, 10) : undefined;
            const projectstatus_id = projectstatusstring ? parseInt(projectstatusstring as string, 10) : undefined;
            const year = yearstring ? parseInt(yearstring as string, 10) : undefined;

            const response = await fetch("/api/admin/historic", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    year,
                    projectstatus_id,
                    projecttype_id,
                    laboratory_id,
                    scholars
                })
            });
            if (response.ok) {
                handleCloseModal();
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

    const handleCloseModal = () => {
        setScholars([]);
        handleClose();
    }

    return (
        <Dialog 
            open={open} 
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleCloseModal();
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
                        Añadir Historico de Proyecto
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                        <div className='md:flex md:gap-4 w-full'>                    
                            <div className='flex w-full mb-4 md:mb-0 md:w-4/6'>
                                <TextField id="projectname" name="projectname" label="Nombre" helperText="Ingrese Nombre de Proyecto" type="text" variant="outlined" color="warning" fullWidth required/>
                            </div>                    
                            <div className='flex w-full md:w-2/6'>
                                <TextField id="year" name="year" label="Año" helperText="Seleccione el Año" type="text" variant="outlined" color="warning" select fullWidth required value={year} onChange={handleYearChange} SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                                overflowY: 'auto',
                                            },
                                        },
                                    },
                                }}>
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
                                <TextField id="projecttype" name="projecttype" label="Tipo" helperText="Selecciona el Tipo de Proyecto" type="text" variant="outlined" color="warning" select fullWidth required value={projectType} onChange={handleProjectTypeChange}>
                                    {historicprojecttypes.map(type => (
                                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='flex w-full md:w-3/6'>
                                <TextField id="projectstatus" name="projectstatus" label="Estado" helperText="Selecciona el Estado del Proyecto" type="text" variant="outlined" color="warning" select fullWidth required value={projectStatus} onChange={handleProjectStatusChange}> 
                                    {historicprojectstatus.map(status => (
                                        <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <Divider className="w-full"></Divider>
                        <div className='flex flex-row w-full'>
                            <div className='text-gray-700 items-center font-medium text-xl md:text-2xl mb-2'>
                                Becarios
                            </div>
                            <div className='flex grow'/>
                            <Button variant="contained" color="warning" disableElevation onClick={handleAddScholar}>Añadir Becario</Button>
                        </div>
                        <Divider className="w-full"></Divider>
                        {scholars.map((scholar, index) => (
                            <div key={index} className='flex flex-col w-full md:gap-4'>
                                <div className='flex w-full mb-4 md:mb-0'>
                                    <TextField id="name" name="name" label="Nombre" helperText="Ingrese Nombre de Becario" type="text" variant="outlined" color="warning" value={scholar.name} onChange={(event) => handleScholarChange(index, event)} fullWidth required/>
                                </div>    
                                <div className='flex w-full mb-4 md:mb-0'>
                                    <TextField id="email" name="email" label="Email" helperText="Ingrese Email de Becario" type="email" variant="outlined" color="warning" value={scholar.email} onChange={(event) => handleScholarChange(index, event)} fullWidth/>
                                </div>
                                <div className='md:flex md:gap-4 w-full'>   
                                    <div className='flex w-full mb-4 md:mb-0'>
                                        <TextField id="dni" name="dni" label="DNI" helperText="Ingrese DNI de Becario" type="text" variant="outlined" color="warning" value={scholar.dni} onChange={(event) => handleScholarChange(index, event)} fullWidth/>
                                    </div> 
                                    <div className='flex w-full mb-4 md:mb-0'>
                                        <TextField id="file" name="file" label="Legajo" helperText="Ingrese Legajo de Becario" type="text" variant="outlined" color="warning" value={scholar.file} onChange={(event) => handleScholarChange(index, event)} fullWidth/>
                                    </div> 
                                </div>
                                <div className='flex w-full mb-4 md:mb-0'>
                                    <TextField id="phone" name="phone" label="Teléfono" helperText="Ingrese Teléfono de Becario" type="text" variant="outlined" color="warning" value={scholar.phone} onChange={(event) => handleScholarChange(index, event)} fullWidth/>
                                </div>
                                <div className='md:flex md:gap-4 w-full mb-4 md:mb-0'>
                                    <div className='flex w-full mb-4 md:mb-0 md:w-4/5'>
                                        <TextField id="historicusercareer_id" name="historicusercareer_id" label="Carrera" helperText="Seleccionar Carrera" type="text" variant="outlined" color="warning" select fullWidth required value={scholar.historicusercareer_id} onChange={(event) => handleScholarChange(index, event)}>
                                            {historicusercareers.map(usercareer => (
                                                <MenuItem key={usercareer.id} value={usercareer.id}>{usercareer.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className='flex w-full md:w-2/6'>
                                        <TextField id="careerlevel" name="careerlevel" label="Año" helperText="Año de Cursado" type="text" variant="outlined" color="warning" select fullWidth value={scholar.careerlevel} onChange={(event) => handleScholarChange(index, event)}>
                                            <MenuItem key={1} value={1}>Primero</MenuItem>
                                            <MenuItem key={2} value={2}>Segundo</MenuItem>
                                            <MenuItem key={3} value={3}>Tercero</MenuItem>
                                            <MenuItem key={4} value={4}>Cuarto</MenuItem>
                                            <MenuItem key={5} value={5}>Quinto</MenuItem>
                                            <MenuItem key={6} value={6}>Sexto</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                                <div className='flex w-full'>
                                    <TextField id="historicscholarshiptype_id" name="historicscholarshiptype_id" label="Beca" helperText="Selecciona la Beca Correspondiente" type="text" variant="outlined" color="warning" select fullWidth required value={scholar.historicscholarshiptype_id} onChange={(event) => handleScholarChange(index, event)}>
                                        {historicscholarships.map(scholarship => (
                                            <MenuItem key={scholarship.id} value={scholarship.id}>{scholarship.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className='flex flex-row justify-end items-end md:mt-0 md:mb-0 mt-2 mb-2'>
                                    <div className='flex flex-row gap-4'>
                                        <Button variant="contained" color="error" disableElevation onClick={() => handleRemoveScholar(index)}>Eliminar</Button>
                                    </div>
                                </div>
                                <Divider className="w-full"></Divider>
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className='flex flex-row m-4 hidden md:block'>
                        <div className='flex flex-row gap-4'>
                            <Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleCloseModal}>CANCELAR</Button>
                            <Button variant="contained" size="large" color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                        </div>
                    </div>
                    <div className='flex flex-row m-3 block md:hidden'>
                        <div className='flex flex-row justify-center gap-10'>
                            <Button variant="contained"  color="error" disableElevation endIcon={<CloseIcon />} onClick={handleCloseModal}>CANCELAR</Button>
                            <Button variant="contained"  color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                        </div>
                    </div>
                </DialogActions>
            </div>
        </Dialog>
    );
}