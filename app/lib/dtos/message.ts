export type message = {
    id: number;
    content: string;
    sender_id: number;
    receiver_id: number;
    timestamp: Date;
}

export type fetchedMessages = {
    content: string;
    sender_id: number;
    receiver_id: number;
    timestamp: Date;
    is_read: boolean
}

export type newMessageQuery = {
    content: string;
    sender_id: number;
    receiver_id: number;
}

export type fetchedScholarMessages = {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    dropped_at?: Date;
    userstatus: string;
    file: string;
    dni: string;
    address?: string;
    phone?: string;
    careerlevel: number;
    usercareer_id: number;
    usercareer: string;
    scholarshiptype_id: number;
    scholarshiptype: string;
    unreadCount: any;
}

export type fetchedAdminMessages = {
    id: number;
    name: string;
    unreadCount: any;
}