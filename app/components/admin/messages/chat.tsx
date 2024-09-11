"use client"

import { chatFormData, chatMenuProps, fetchChatUsersData, fetchMessagesData, newMessageQuery, readMessagesData } from "@/app/lib/dtos/message";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from 'dayjs';
import Badge from "@mui/material/Badge";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchChatMessages, fetchChatUsers, sendMessage, setMessagesAsRead } from "@/app/services/messages/adminchat.service";
import Skeleton from "@mui/material/Skeleton";

export default function ChatAdmin({ laboratory_id, current_id, usertype_id }: chatMenuProps) {
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<chatFormData>({
        defaultValues: {
            users: [],
            tabValue: 0,
            message: '',
            messages: [],
        }
    });
    const current_id_number = Number(current_id);
    //fetch tab scholars
    const scholars = watch("users")
    const params = {
        laboratory_id: laboratory_id,
        usertype_id: usertype_id,
        current_id: current_id_number,
    } as fetchChatUsersData;
    const { data: scholarsQuery, isLoading } = useQuery({
        queryKey: ['getChatScholars'],
        queryFn: () => fetchChatUsers(params),
    });
    useEffect(() => {
        if (scholarsQuery) {
            setValue("users", scholarsQuery);
        }
    }, [scholarsQuery, setValue]);
    //tab change
    const tabValue = watch("tabValue");
    const readmessages = useMutation({
        mutationFn: (data: readMessagesData) => setMessagesAsRead(data),
    })
    const handleTabChange = async (event: React.SyntheticEvent, newTabValue: number) => {
        setValue("tabValue", newTabValue);
        readmessages.mutate({
            sender_id: newTabValue,
            receiver_id: current_id_number
        })
    };
    //fetch messages
    const messages = watch("messages");
    const params2 = {
        sender_id: current_id_number,
        receiver_id: tabValue
    } as fetchMessagesData;
    const { data: messagesQuery, refetch } = useQuery({
        queryKey: ['getChatMessages', tabValue],
        queryFn: () => fetchChatMessages(params2),
        refetchInterval: 50000,
    });
    useEffect(() => {
        if (messagesQuery) {
            setValue("messages", messagesQuery);
        }
    }, [messagesQuery, setValue]);
    //post message
    const sendmessage = useMutation({
        mutationFn: (data: newMessageQuery) => sendMessage(data),
        onSuccess: () => {
            setValue("message", '');
            refetch();
        }
    });
    const onSubmit: SubmitHandler<chatFormData> = (data) => {
        sendmessage.mutate({ 
            content: data.message,
            sender_id: current_id_number,
            receiver_id: tabValue,
        });
    };
    return (
        <main className="flex flex-col h-screen w-full overflow-hidden">
            <div className="flex h-20 bg-gray-700 border-b-4 border-orange-500 md:border-transparent text-white items-center">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange} 
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                    className="h-16 md:h-20 items-center"
                >
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <Tab
                                key={index}
                                label={<Skeleton variant="rectangular" width={200} height={30} />}
                                value={index}
                            />
                        ))
                        ) : (
                        scholars.map(scholar => (
                            <Tab
                                key={scholar.id}
                                label={<Badge badgeContent={scholar.unreadcount} color="warning">{scholar.name}</Badge>}
                                value={scholar.id}
                            />
                        ))
                    )}
                </Tabs>
            </div>
            {scholars.map(scholarcontent => (
                tabValue === scholarcontent.id && (
                    <>
                        <div key={scholarcontent.id} className="flex flex-col h-full m-6 md:m-10 gap-6 items-center overflow-y-auto">
                            <div className="flex flex-col w-full min-h-[80%] md:w-5/6 overflow-y-auto rounded border border-gray-400 justify-end">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex w-full ${msg.sender_id === current_id_number ? 'pr-4 justify-end' : 'pl-4 justify-start'} mb-4`}>
                                        <div className={`relative flex-col p-2 rounded-lg max-w-[50%] ${msg.sender_id === current_id_number ? 'bg-gray-600 text-white' : 'bg-orange-500 text-white'}`}>
                                            <p>{msg.content}</p>
                                            <span className="text-xs text-gray-300">
                                                {dayjs(msg.timestamp).format('DD/MM/YYYY HH:mm')}
                                            </span>
                                            <div className={`absolute ${msg.sender_id === current_id_number ? 'border-t-8 border-b-8 border-t-transparent border-b-transparent border-l-8 border-l-gray-600 left-full top-10': 'border-t-8 border-b-8 border-t-transparent border-b-transparent border-r-8 border-r-orange-500 right-full top-10'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form className="flex w-full md:w-5/6" onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    label="Mensaje"
                                    id="message"
                                    type="text"
                                    variant="outlined"
                                    color="warning"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    {...register("message", { 
                                        required: "Escribe un Mensaje",
                                        maxLength: {
                                            value: 255, 
                                            message: "Máximo 255 caracteres"
                                        },
                                    })}
                                    error={!!errors.message}
                                    helperText={errors.message ? errors.message.message : ""}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end"><IconButton color="success" type="submit"><KeyboardArrowRightIcon /></IconButton></InputAdornment>
                                        ),
                                    }} 
                                />
                            </form>
                        </div>
                    </>
                )
            ))}
        </main>
    );
};