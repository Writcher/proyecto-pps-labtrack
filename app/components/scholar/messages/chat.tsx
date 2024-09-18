"use client"

import { chatMenuProps, fetchChatUsersData, chatFormData, readMessagesData, fetchMessagesData, newMessageQuery } from "@/app/lib/dtos/message";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import React from "react";
import { useEffect } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from 'dayjs';
import Badge from "@mui/material/Badge";
import { fetchChatMessages, fetchChatUsers, sendMessage, setMessagesAsRead } from "@/app/services/messages/chat.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import '@/app/components/globals.css'

export default function ChatScholar({ laboratory_id, current_id, usertype_id }: chatMenuProps) {
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<chatFormData>({
        defaultValues: {
            users: [],
            tabValue: 0,
            message: '',
            messages: [],
        }
    });
    const current_id_number = Number(current_id);
    //fetch tab users
    const admins = watch("users")
    const params = {
        laboratory_id: laboratory_id,
        usertype_id: usertype_id,
        current_id: current_id_number,
    } as fetchChatUsersData;
    const { data: usersQuery, isLoading } = useQuery({
        queryKey: ['getChatUsers'],
        queryFn: () => fetchChatUsers(params),
        refetchInterval: 5000,
    });
    console.log(usersQuery)
    useEffect(() => {
        if (usersQuery) {
            setValue("users", usersQuery);
        }
    }, [usersQuery, setValue]);
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
        refetchInterval: 5000,
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
        <main className="flex flex-col h-screen w-full">
            <div className="flex h-[8%] bg-gray-700 border-b-4 border-orange-500 md:border-transparent text-white items-center">
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
                        admins.map(admin => (
                            <Tab 
                                key={admin.id} 
                                label={<Badge badgeContent={admin.unreadCount} 
                                color="warning">{admin.name}</Badge>} 
                                value={admin.id}
                            />
                        ))
                    )}
                </Tabs>
            </div>
            {admins.map(admincontent => (
                tabValue === admincontent.id && (
                    <div key={admincontent.id} className="flex flex-col h-[92%] p-6 gap-6 items-center">
                        <div className="flex-grow flex-col w-full md:w-5/6 h-[92%] overflow-y-auto custom-scrollbar rounded border border-gray-400 justify-end">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex flex-row w-full ${msg.sender_id === current_id_number ? 'pr-4 justify-end' : 'pl-4 justify-start'} mt-4 mb-4`}>
                                    <div className={`relative flex flex-col gap-2 p-2 rounded-t-lg max-w-[50%] ${msg.sender_id === current_id_number ? 'bg-gray-600 rounded-bl-lg text-white' : 'bg-orange-500 rounded-br-lg text-white'}`}>
                                        <p>{msg.content}</p>
                                        <span className="text-xs text-gray-300">
                                            {dayjs(msg.timestamp).format('DD/MM/YYYY HH:mm')}
                                        </span>
                                        <div className={`absolute ${msg.sender_id === current_id_number ? 'border-t-8 border-b-10 border-t-transparent border-b-transparent border-l-8 border-l-gray-600 left-full bottom-[0px]': 'border-t-8 border-b-10 border-t-transparent border-b-transparent border-r-8 border-r-orange-500 right-full bottom-[0px]'}`} />
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(onSubmit)();
                                        }
                                    }} 
                                />
                        </form>
                    </div>
                )
            ))}
        </main>
    );
};