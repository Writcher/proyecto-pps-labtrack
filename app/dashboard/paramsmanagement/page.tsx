"use client"

import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import ABMtipoInsumo from "./supplytype/page";
import Image from "next/image";

export default function ABMinicio() {
    const [selectedABM, setSelectedABM] = useState<number | null>(null);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedABM(Number(event.target.value));
    };

    const renderComponent = () => {
        switch (selectedABM) {
            case 1:
                return <ABMtipoInsumo />;
            default:
                return (
                    <main className="flex flex-col w-grow h-3/4">
                        <div className="flex flex-col h-10"/>
                        <div className="flex flex-col items-center justify-center mb:mt-32 md:mb-32">
                            <Image src="/research-desktop.png" width={410} height={450} className="hidden md:block" alt="Versión Escritorio Imagen"/>
                            <Image src="/research-mobile.png" width={189} height={210} className="block md:hidden" alt="Versión Mobile Imagen"/>
                        </div>
                        <div className="flex flex-col h-10"/>
                    </main>
                );
        }
    };

    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col items-center justify-center mb-4">
                <div className="text-xl md:text-3xl text-gray-700 text-center font-bold">
                    <p className="mb-6">
                        Gestión de Parametros
                    </p>
                    <TextField
                        id="ABM"
                        name="ABM"
                        helperText="Selecciona el ABM"
                        type="text"
                        variant="outlined"
                        color="warning"
                        select
                        fullWidth
                        required
                        value={selectedABM || ''}
                        onChange={handleChange}
                    >
                        <MenuItem key={1} value={1}>ABM Tipo de Insumo</MenuItem>
                        {/* Añadir otros aca */}
                    </TextField>
                </div>
            </div>
            {renderComponent()}
        </main>
    );
}