"use client"

import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import ABMtipoInsumo from "./supplytype/page";
import Image from "next/image";
import ABMestadoInsumo from "./supplystatus/page";
import ABMtipoBeca from "./scholarshiptype/page";
import ABMtipoProyecto from "./projecttype/page";
import ABMestadoProyecto from "./projectstatus/page";
import ABMcalificacion from "./grade/page";

export default function ABMinicio() {
    const [selectedABM, setSelectedABM] = useState<number | null>(null);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedABM(Number(event.target.value));
    };

    const renderComponent = () => {
        switch (selectedABM) {
            case 1:
                return <ABMtipoInsumo />;
            case 2:
                return <ABMestadoInsumo />;
            case 3:
                return <ABMtipoProyecto />;
            case 4:
                return <ABMestadoProyecto />;
            case 5:
                return <ABMtipoBeca />;
            case 6:
                return <ABMcalificacion />;
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
                        <MenuItem key={2} value={2}>ABM Estado de Insumo</MenuItem>
                        <MenuItem key={3} value={3}>ABM Tipo de Proyecto</MenuItem>
                        <MenuItem key={4} value={4}>ABM Estado de Proyecto</MenuItem>
                        <MenuItem key={5} value={5}>ABM Tipo de Beca</MenuItem>
                        <MenuItem key={6} value={6}>ABM Calificación</MenuItem>

                    </TextField>
                </div>
            </div>
            {renderComponent()}
        </main>
    );
}