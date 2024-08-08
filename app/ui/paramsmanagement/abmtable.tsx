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
            const response = await fetch(`/api/paramsmanagement?name=${encodeURIComponent(searchTerm)}&table=${encodeURIComponent(table)}`, {
                method: 'GET',
            });
            const fetchedData = await response.json();
            setData(fetchedData);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Error desconocido");
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
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    //placeholders
    async function handleDeleteButton(id: number) {
        console.log("Deleting item with id:", id, "from table:", table);
    }
    async function handleEditButton(id: number) {
        console.log("Editing item with id:", id, "from table:", table);
    }

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
                            onClick={handleOpenModal}
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
                                        <div className="flex flex-row justify-end gap-5 text-gray-700">
                                            <IconButton color="error" onClick={() => handleDeleteButton(row.id)}>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                            <IconButton color="inherit" onClick={() => handleEditButton(row.id)}>
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
            <CreateModal
                open={modalOpen}
                handleClose={handleCloseModal}
                table={table}
            />
        </main>
    );
}