"use client"

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAdminData, registerFormData } from '@/app/lib/dtos/user';
import { createAdmin, fetchLaboratories } from '@/app/services/register/register.service';
import { laboratory } from '@/app/lib/dtos/laboratory';
import { CircularProgress, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateLaboratoryModal from './createmodal';

interface APIErrors {
    email?: string,
    name?: string,
};

export default function RegisterForm() {
    const { watch, register, handleSubmit, getValues, formState: { errors }, setValue } = useForm<registerFormData>({
        defaultValues: {
            laboratory_id: 0,
            modalOpenCreate: false,
        }
    });
    const router = useRouter();
    const [apiError, setApiError] = useState<APIErrors>({});
    //fetch labs
    const { data: laboratories, isLoading, refetch } = useQuery({
        queryKey: ['fetchLaboratories'],
        queryFn: () => fetchLaboratories(),
        refetchOnWindowFocus: false
    });
    //create user
    const registerUser = useMutation({
        mutationFn: (data: createAdminData) => createAdmin(data),
        onSuccess:  (result) => {
            if (result && result.success) {
                router.push("/login");
            } else if (result) {
                if (result.apiError) {
                    setApiError(result.apiError);
                };
            };
        },
        onError: (error: APIErrors) => {
            setApiError({ email: error.email });
        },
    });
    const onSubmit: SubmitHandler<registerFormData> = (data) => {
        registerUser.mutate({
            laboratory_id: data.laboratory_id,
            name: data.name,
            password: data.password,
            email: data.email,
        });
    };
    //modales
        //create
        const modalOpenCreate = watch("modalOpenCreate");
        const handleOpenCreateModal = () => setValue("modalOpenCreate", true);
        const handleCloseCreateModal = () => {
            setValue("modalOpenCreate", false);
            refetch();
        };
    return (
        <div className="flex flex-col w-64 md:w-2/5 gap-12">
            <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <div className="mb-4 ">
                        <TextField 
                            id="name" 
                            label="Nombre y Apellido *" 
                            type="text" 
                            variant="outlined" 
                            color="warning" 
                            fullWidth
                            {...register("name", { required: "Este campo es requerido" })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : "Ingrese Nombre y Apellido"}
                        />
                    </div>
                    <div className="flex flex-row mb-4 gap-2">
                        <div className='flex w-[90%]'>
                            <TextField 
                                id="laboratory_id" 
                                label="Laboratorio *" 
                                type="text" 
                                variant="outlined" 
                                color="warning" 
                                select 
                                fullWidth 
                                value={watch("laboratory_id")}
                                {...register("laboratory_id", { required: "Este campo es requerido", validate: value => value !== 0 || "Este campo es requerido" })}
                                error={!!errors.laboratory_id}
                                helperText={errors.laboratory_id ? errors.laboratory_id.message : isLoading ? "Cargando Laboratorios" : "Seleccionar Laboratorio"}
                                disabled={isLoading}
                            >
                                {laboratories && laboratories.length > 0 && laboratories.map((Laboratory: laboratory) => (
                                    <MenuItem key={Laboratory.id} value={Laboratory.id}>{Laboratory.name}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className='flex mb-5 w-[10%] items-center justify-center'>
                            <IconButton color="warning" onClick={() => handleOpenCreateModal()}>
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="mb-4">
                        <TextField 
                            id="email" 
                            label="Email *" 
                            type="text" 
                            variant="outlined" 
                            color="warning" 
                            fullWidth 
                            {...register("email", { 
                                required: "Este campo es requerido",
                                pattern: 
                                    {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Ingrese un email válido"
                                },
                                validate: (value) =>
                                    value.endsWith("@docentes.frm.utn.edu.ar") || "Debe usar su corre institucional (@docentes.frm.utn.edu.ar)"
                            })}
                            error={!!errors.email || !!apiError.email}
                            helperText={errors.email ? errors.email.message : apiError.email ? apiError.email : "Ingrese Email"}
                        />
                    </div>
                    <div className="mb-6">
                        <TextField 
                            id="password" 
                            label="Contraseña *" 
                            type="password" 
                            variant="outlined" 
                            color="warning" 
                            fullWidth
                            {...register("password", { 
                                required: "Este campo es requerido", 
                                minLength: {
                                    value: 12,
                                    message: "Debe tener al menos 12 caracteres"
                                },
                                pattern: {
                                    value: /(?=.*\d)/,
                                    message: "Debe incluir al menos 1 número"
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : "Ingrese Contraseña"}
                        />
                    </div>
                    <div className="mb-6">
                        <TextField 
                            id="confirmPassword" 
                            label="Confirmar Contraseña *" 
                            type="password" 
                            variant="outlined" 
                            color="warning" 
                            fullWidth 
                            {...register("confirmPassword", { 
                                required: "Este campo es requerido",
                                validate: (value) => value === getValues("password") || "Las contraseñas no coinciden" 
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword ? errors.confirmPassword.message : "Confirme Contraseña"}
                        />
                    </div>
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="warning" 
                        disableElevation 
                        endIcon={registerUser.isPending ? <CircularProgress color="warning" size={26}/> : <KeyboardArrowRightIcon />} 
                        fullWidth 
                        type="submit"
                        disabled={registerUser.isPending}
                        >
                            REGISTRARSE
                    </Button>
                </div>
            </form>
            <CreateLaboratoryModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
            />
        </div>
    );
};