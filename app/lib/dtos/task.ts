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

export type fetchedTask = {
    name: string;
    description: string;
    start: Date;
    end: Date;
    taskstatus_id: number;
};

export type fetchedDetailTask = {
    id: number;
    name: string;
    description: string;
    start: Date;
    end: Date;
    taskstatus_id: number;
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

export type newProjectTaskModalProps = {
    open: boolean;
    handleClose: () => void;
    project_id: number;
    start_date_new?: Date;
};

export type newProjectTaskFormData = {
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

export type newProjectTaskQuery = {
    name: string;
    description: string;
    end: Date;
    start: Date;
    project_id: number;
};

export type deleteTaskData = {
    id: number
};

export type  dropTaskQuery = deleteTaskData;

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

export type dragTaskData = {
    id: number;
    start: Date;
    end: Date;
};

export type dragTaskQuery = dragTaskData;

export type editFormProps = {
    task: fetchedDetailTask;
    refetch: () => void;
};

export type editFormData = {
    name: string;
    description: string;
    taskstatus_id: number | '';
    start: Dayjs | null;
    end: Dayjs | null;
};

export type editTaskData = {
    id: number;
    name: string;
    description: string;
    taskstatus_id: number;
    start: any;
    end: any;
};

export type editTaskQuery = {
    id: number;
    name: string;
    description: string;
    taskstatus_id: number;
    start: Date;
    end: Date;
};