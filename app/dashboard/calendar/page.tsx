"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Para interactividad

export default function Proyectos() {
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
                    <div className="w-full h-[500px] md:h-[700px]">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            locale="esLocale"
                            headerToolbar={{
                                left: 'title',
                                center: '',
                                right: 'prev,next'
                            }}
                            height="100%"
                            events={[
                                {
                                    title: 'Evento con Descripción',
                                    start: '2024-08-14',
                                    end: '2024-08-16',
                                    extendedProps: {
                                        description: 'Esta es una descripción detallada del evento que dura más de un día.'
                                    }
                                }
                            ]}
                            eventContent={eventInfo => (
                                <>
                                    <b>{eventInfo.event.title}</b>
                                    <br />
                                    <span>{eventInfo.event.extendedProps.description}</span>
                                </>
                            )}
                            eventClick={info => {
                                alert(info.event.extendedProps.description);
                            }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}