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
    scholar_ids: number[];
};

export type projectTaskFormData = {
    tasks: fetchedPageTask[];
    loadMoreDisabled: boolean;
    modalOpenCreate: boolean;
    page: number;
};