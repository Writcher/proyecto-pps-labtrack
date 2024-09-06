"use client"

import React, { useCallback } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CreateModal from "./createmodal";
import TablePagination from '@mui/material/TablePagination';
import EditModal from "./editmodal";
import { useQuery } from "@tanstack/react-query";
import { fetchTableData } from "@/app/services/paramsmanagement/abm.service";
import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";


interface ABMTableProps {
    table: string;
}

export default function ABMTable({ table }: ABMTableProps) {
    const { register, watch, setValue } = useForm({
        defaultValues: {
            page: 0,
            rowsPerPage: 10,
            search: "",
            modalOpenCreate: false,
            modalOpenEdit: false,
            selectedRowId: 0,
            selectedRowName: ""
        }
    });

    const search = watch("search");
    const page = watch("page");
    const rowsPerPage = watch("rowsPerPage");
    const modalOpenCreate = watch("modalOpenCreate");
    const modalOpenEdit = watch("modalOpenEdit");
    const selectedRowId = watch("selectedRowId");
    const selectedRowName = watch("selectedRowName");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce((searchTerm: string) => {
        setValue("search", searchTerm);
    }, 500), []);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(event.target.value);
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tableData', search],
        queryFn: () => fetchTableData(search, table),
        refetchOnWindowFocus: false
    });
    
    //paginacion
    const paginatedItems = Array.isArray(data) ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setValue("page", newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue("rowsPerPage", parseInt(event.target.value, 10));
        setValue("page", 0);
    };
    //modales
        //create
    const handleOpenCreateModal = () => setValue("modalOpenCreate", true);
    const handleCloseCreateModal = () => {
        setValue("modalOpenCreate", false);
        refetch();
    };
        //edit
    const handleOpenEditModal = (id: number, name: string) => {
        setValue("selectedRowId", id);
        setValue("selectedRowName", name);
        setValue("modalOpenEdit", true);
    }
    const handleCloseEditModal = () => {
        setValue("modalOpenEdit", false);
        refetch();
    }

    return (
        <main className="flex flex-col gap-2 px-6 pb-10 w-full h-full">
            <div className="flex flex-row w-full mb-4">
                <form className="flew items-center justify-start w-2/6">
                    <TextField 
                        id="search"
                        label="Buscar por Nombre"
                        type="search"
                        variant="outlined"
                        color="warning"
                        fullWidth
                        onChange={handleSearchChange}
                    />
                </form>
                <div className="flex grow" />
                <Button
                    variant="contained"
                    size="large"
                    color="success"
                    disableElevation
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateModal}
                >
                    AÑADIR
                </Button>
            </div>
            <div className="flex flex-col overflow-y-auto h-full">
                <TableContainer>
                    <Table stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" width="40%">
                                    <div className="text-gray-700 font-medium md:font-bold text-lg">
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell align="left" width="40%">
                                </TableCell>
                                <TableCell align="center" width="20%">
                                    <div className="mr-5 text-gray-700 font-medium md:font-bold text-lg">
                                        Acciones
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            {paginatedItems.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center" size="small">
                                        <div className="text-gray-700 font-medium text-lg">
                                            {row.name}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        <div className="flex flex-row justify-center mr-5 items-center text-gray-700">
                                            <IconButton color="inherit" onClick={() => handleOpenEditModal(row.id, row.name)}>
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {Array.from({ length: rowsPerPage - paginatedItems.length }).map((_, index) => (
                                <TableRow key={`empty-row-${index}`}>
                                    <TableCell colSpan={3} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex justify-end items-end grow overflow-x-hide">
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        component="div"
                        count={Array.isArray(data) ? data.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            <EditModal
                open={modalOpenEdit}
                handleClose={handleCloseEditModal}
                table={table}
                id={selectedRowId!}        
                name={selectedRowName!}        
            />
            <CreateModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                table={table}
            />
        </main>
    );
}