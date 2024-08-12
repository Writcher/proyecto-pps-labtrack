"use client"

import React, { useCallback, useEffect } from "react";
import { FormEvent, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import debounce from "lodash.debounce";
import DeleteModal from "./deletemodal";
import EditModal from "./editmodal";


interface ABMTableProps {
    table: string;
}

export default function ABMTable({ table }: ABMTableProps) {
    const [data, setData] = useState<{ id: number; name: string }[]>([]);

    //busqueda
    const [search, setSearch] = useState("");
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    async function fetchData(searchTerm: string) {
        try {
            const response = await fetch(`/api/dashboard/paramsmanagement?name=${encodeURIComponent(searchTerm)}&table=${encodeURIComponent(table)}`, {
                method: 'GET',
            });
            const fetchedData = await response.json();
            setData(fetchedData);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Error desconocido, la cagaste");
            }
        }
    }

    const debouncedFetchData = useCallback(
        debounce((searchTerm: string) => fetchData(searchTerm), 300),
        [table]
    );
    useEffect(() => {
        debouncedFetchData(search);
    }, [search, debouncedFetchData]);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    //paginacion
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const paginatedItems = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //modales
        //create
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const handleOpenCreateModal = () => setModalOpenCreate(true);
    const handleCloseCreateModal = () => {
        setModalOpenCreate(false);
    };
    useEffect(() => {
        if (!modalOpenCreate) {
            debouncedFetchData(search);
        }
    }, [modalOpenCreate]);
        //fila seleccionada
        const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
        const [selectedRowName, setSelectedRowName] = useState<string | null>(null);       
            //delete
    {/*const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const handleOpenDeleteModal = (id: number, name: string) => {
        setSelectedRowId(id);
        setSelectedRowName(name);
        setModalOpenDelete(true);
    }
    const handleCloseDeleteModal = () => {
        setModalOpenDelete(false);
    };
    useEffect(() => {
        if (!modalOpenDelete) {
            debouncedFetchData(search);
        }
    }, [modalOpenDelete]);*/}
            //edit
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const handleOpenEditModal = (id: number, name: string) => {
        setSelectedRowId(id);
        setSelectedRowName(name);
        setModalOpenEdit(true);
    }
    const handleCloseEditModal = () => {
        setModalOpenEdit(false);
    }
    useEffect(()=> {
        if (!modalOpenEdit) {
            debouncedFetchData(search);
        }
    },[modalOpenEdit]);

    return (
        <main className="flex flex-col gap-6 mt-12 w-full md:w-3/5">
            <div className="flex flex-row w-full">
                <form className="flew items-center justify-start w-2/5" onSubmit={handleSubmit}>
                    <TextField 
                        id="search"
                        name="search"
                        label="Buscar"
                        helperText="Buscar por Nombre"
                        type="search"
                        variant="outlined"
                        color="warning"
                        fullWidth
                        value={search}
                        onChange={handleSearchChange}
                    />
                </form>
                <div className="flex grow" />
                <div className="flex items-center justify-end">
                    <div className="h-16">
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
                </div>
            </div>
            <div>
                <TableContainer>
                    <Table stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">
                                    <div className="text-gray-700 font-medium md:font-bold text-lg">
                                        ID
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="text-gray-700 font-medium md:font-bold text-lg">
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className="mr-5 text-gray-700 font-medium md:font-bold text-lg">
                                        Acciones
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            {paginatedItems.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">
                                        <div className="text-gray-700 font-medium text-lg">
                                            {row.id}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className="text-gray-700 font-medium text-lg">
                                            {row.name}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="flex flex-row justify-end mr-10 items-center text-gray-700">
                                            {/*<IconButton color="error" onClick={() => handleOpenDeleteModal(row.id, row.name)}>
                                                <DeleteForeverIcon />
                                            </IconButton>*/}
                                            <IconButton color="inherit" onClick={() => handleOpenEditModal(row.id, row.name)}>
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            <EditModal
                open={modalOpenEdit}
                handleClose={handleCloseEditModal}
                table={table}
                id={selectedRowId!}        
                name={selectedRowName!}        
            />
            {/*<DeleteModal
                open={modalOpenDelete}
                handleClose={handleCloseDeleteModal}
                table={table}
                id={selectedRowId!}        
                name={selectedRowName!}        
            />*/}
            <CreateModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                table={table}
            />
        </main>
    );
}