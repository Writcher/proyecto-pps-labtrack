"use client"

import { Calendar } from "antd";
import React from 'react';;
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

export default function ProyectosAnt() {

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
    return (
        <main className="flex flex-col w-full">
            <div className="flex flex-col items-center justify-center mt-12 mb-4 md:gap-6">
                <div className="flex flex-col text-xl md:text-3xl text-gray-700 text-center font-bold">
                    <p className="mt-16">
                        Proyectos
                    </p>
                </div>
                <div className="flex flex-col m-6 md:m-0" />
                <div className="flex flex-col gap-5 md:w-5/6">
                    <div className="w-full h-[500px] md:h-[500px]">
                        <Calendar onPanelChange={onPanelChange} className="bg-gray-100"/>
                    </div>
                </div>
            </div>
        </main>
    );
}