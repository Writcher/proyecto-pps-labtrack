import { Dayjs } from "dayjs";

export type fetchedPageTask = {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    start: Date;
    end: Date;
    taskstatusname: string;
};

export type projectTaskTableProps = {
    project_id: number;
};

export type projectTaskFormData = {
    tasks: fetchedPageTask[];
    loadMoreDisabled: boolean;
    modalOpenCreate: boolean;
    page: number;
};

export type createProjectTaskModalProps = {
    open: boolean;
    handleClose: () => void;
    project_id: number;
    start_date_new?: Date;
};

export type createProjectTaskFormData = {
    name: string;
    description: string;
    end: Dayjs | null;
    start: Dayjs | null;
};

export type createProjectTaskData = {
    name: string;
    description: string;
    end: any;
    start: any;
    project_id: number;
};

export type createProjectTaskQuery = {
    name: string;
    description: string;
    end: Date;
    start: Date;
    project_id: number;
};

export type deleteTaskData = {
    id: number
};

export type  deleteTaskQuery = deleteTaskData;

export type calendarTasks = {
    id: number;
    title: string;
    description: string;
    taskstatusname: string;
    created_at: Date;
    start: string;
    end: string;
};

export type projectTaskCalendarFormData = {
    events: any;
    start_date: Date | null;
    end_date: Date | null;
    modalOpenCreate: boolean;
    start_date_new: Date;
};