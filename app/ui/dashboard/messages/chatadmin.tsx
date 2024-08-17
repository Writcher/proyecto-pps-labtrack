"use client"

import { GetMessages, GetScholarMessages } from "@/app/lib/definitions";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import React, { FormEvent } from "react";
import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from 'dayjs';
import Badge from "@mui/material/Badge";


interface ChatMenuProps {
    laboratory_id: number;
    current_id: string;
    usertype_id: number;
}

export default function ChatAdmin({ laboratory_id, current_id, usertype_id }: ChatMenuProps) {
    const current_id_number = Number(current_id);
    const [scholars, setScholars] = useState<GetScholarMessages[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/dashboard/messages?labid=${encodeURIComponent(laboratory_id)}&typeid=${encodeURIComponent(usertype_id)}&currentid=${encodeURIComponent(current_id_number)}`, {
                    method: 'GET',
                });
                const fetchedData: GetScholarMessages[] = await response.json();
                setScholars(fetchedData);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error("Error desconocido, la cagaste");
                }
            } 
        }
        fetchData();
    }, [laboratory_id, usertype_id, current_id_number]);

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = async (event: React.SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
        //nuevo
        try {
            const response = await fetch(`/api/dashboard/messages/read`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender_id: newTabValue,    // El id del remitente es el id de la pestaña seleccionada
                    receiver_id: current_id_number  // El id del receptor es el id del usuario actual
                })
            });
    
            if (!response.ok) {
                throw new Error("Error al actualizar los mensajes como leídos");
            }
        } catch (error) {
            console.error(error instanceof Error ? error.message : "Error desconocido");
        }
        //
    };

    const [message, setMessage] = useState<string | ''>('');
    const handleMessageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMessage(event.target.value as string | '');
    };

    const [messages, setMessages] = useState<GetMessages[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/dashboard/messages/chat?senderid=${encodeURIComponent(current_id_number)}&receiverid=${encodeURIComponent(tabValue)}`, {
                    method: 'GET',
                });
                const fetchedMessages = await response.json();
                setMessages(fetchedMessages);
            } catch (error) {
                console.error(error instanceof Error ? error.message : "Error desconocido, la cagaste");
            }
        };

        fetchMessages();

        const intervalId = setInterval(fetchMessages, 5000);

        return () => clearInterval(intervalId); 
    }, [current_id_number, tabValue]);

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const content = formData.get("content")?.toString().trim(); // Asegúrate de convertirlo a string y limpiar espacios
    
            if (!content) {
                console.warn("Mensaje vacío no enviado");
                return;
            }
    
            const response = await fetch("/api/dashboard/messages/chat", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                    sender_id: current_id_number,
                    receiver_id: tabValue
                })
            });
    
            if (!response.ok) {
                throw new Error("Error al enviar el mensaje");
            }

            setMessage('');

            const updatedMessages = await fetch(`/api/dashboard/messages/chat?senderid=${encodeURIComponent(current_id_number)}&receiverid=${encodeURIComponent(tabValue)}`, {
                method: 'GET',
            }).then(response => response.json());

            setMessages(updatedMessages);
    
        } catch (error) {
            console.error(error instanceof Error ? error.message : "Error desconocido");
        }
    }

    return (
        <main className="flex flex-col h-screen">
            <div className="flex flex-row h-16 pl-2 md:h-20 bg-gray-700 border-b-4 border-orange-500 md:border-transparent text-white items-center">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange} 
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {scholars.map(scholar => (
                        <Tab key={scholar.id} label={<Badge badgeContent={scholar.unreadCount} color="warning">{scholar.name}</Badge>} value={scholar.id}></Tab>
                    ))}
                </Tabs>
            </div>
            <div className="flex grow h-full">
                    {scholars.map(scholarcontent => (
                        tabValue === scholarcontent.id && (
                            <div key={scholarcontent.id} className="flex flex-col w-full m-4 items-center justify-center">
                                <div className="flex flex-col mb-4 text-xl md:text-3xl text-gray-700 text-center font-bold">
                                    <p>
                                        {scholarcontent.name}
                                    </p>
                                </div>
                                <div className="flex h-4/6 w-full bg-gray-100 pb-4 justify-center overflow-hidden">
                                    <div className="flex flex-col w-full h-full md:w-3/6 rounded border border-gray-400 justify-end overflow-y-scroll">
                                        {messages.map((msg, index) => (
                                            <div key={index} className={`flex w-full ${msg.sender_id === current_id_number ? 'pr-4 justify-end' : 'pl-4 justify-start'} mb-4`}>
                                                <div className={`flex-col p-2 rounded-lg max-w-[50%] ${msg.sender_id === current_id_number ? 'bg-gray-300 text-gray-800' : 'bg-orange-500 text-white'}`}>
                                                    <p>{msg.content}</p>
                                                    <span className="text-xs text-gray-600">
                                                        {dayjs(msg.timestamp).format('DD/MM/YYYY HH:mm')}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col w-full bg-gray-100 items-center">  
                                    <form className="flex flex-row w-full md:w-3/6" onSubmit={handleFormSubmit}>
                                        <TextField 
                                            label="Mensaje"
                                            id="content"
                                            name="content"
                                            type="text"
                                            variant="outlined"
                                            color="warning"
                                            multiline
                                            rows={2}
                                            inputProps={{ maxLength: 255 }}
                                            fullWidth
                                            value={message}
                                            onChange={handleMessageChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end"><IconButton color="success" type="submit"><KeyboardArrowRightIcon /></IconButton></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </form>
                                </div>
                            </div>
                        )
                    ))}
                </div>
        </main>
    )
}