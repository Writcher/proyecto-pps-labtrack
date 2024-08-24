"use client"

import React, { useCallback, useEffect, useState } from "react";
import { FormEvent } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
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
import TablePagination from '@mui/material/TablePagination';
import debounce from "lodash.debounce";
import { GetSupply, Supplystatus, Supplytype } from "@/app/lib/definitions";
import CreateSupplyModal from "./createmodal";
import EditSupplyModal from "./editmodal";
import DeleteSupplyModal from "./deletemodal";


interface AMBInventoryTableProps {
    laboratory_id: number;
    supplytypes: Supplytype[];
    supplystatuses: Supplystatus[];
}

export default function ABMInventoryTable({ laboratory_id, supplystatuses, supplytypes }: AMBInventoryTableProps ) {

    //busqueda
    const [search, setSearch] = useState("");
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const [data, setData] = useState<GetSupply[]>([]);
    async function fetchData(searchTerm: string) {
        try {
            const response = await fetch(`/api/inventory?name=${encodeURIComponent(searchTerm)}&labid=${encodeURIComponent(laboratory_id)}`, {
                method: 'GET',
            });
            const fetchedData = await response.json();
            console.log(fetchedData.userstatus);
            setData(fetchedData);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Error desconocido, la cagaste");
            }
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchData = useCallback(
        debounce((searchTerm: string) => fetchData(searchTerm), 300),
        []
    );
    useEffect(() => {
        debouncedFetchData(search);
    }, [search, debouncedFetchData]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    //paginacion
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
    }, [debouncedFetchData, modalOpenCreate, search]);

    //fila seleccionada
    const [selectedRow, setSelectedRow] = useState<GetSupply | null>(null);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [selectedRowName, setSelectedRowName] = useState<string | null>(null);       

    //delete
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
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
    }, [debouncedFetchData, modalOpenDelete, search]);

    //edit
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const handleOpenEditModal = (row: GetSupply) => {
        setSelectedRow(row);
        setModalOpenEdit(true);
    }
    const handleCloseEditModal = () => {
        setModalOpenEdit(false);
    }
    useEffect(()=> {
        if (!modalOpenEdit) {
            debouncedFetchData(search);
        }
    },[debouncedFetchData, modalOpenEdit, search]);

    //expandir fila
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const toggleRowExpansion = (id: number) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    //ordenar por columna
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string>('id');

    const sortData = (data: GetSupply[]) => {
        return data.slice().sort((a, b) => {
            const aValue = a[sortColumn as keyof GetSupply] ?? '';
            const bValue = b[sortColumn as keyof GetSupply] ?? '';
    
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    useEffect(() => {
        const sortedData = sortData(data);
        setData(sortedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortColumn, sortDirection]);

    const handleSort = (column: string) => {
        const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(newDirection);
    };

    return (
        <main className="flex flex-col gap-2 px-6 pb-10 w-full h-full">
            <div className="flex flex-row w-full mb-4">
                <form className="flew items-center justify-start w-2/6" onSubmit={handleSubmit}>
                    <TextField 
                        id="search"
                        name="search"
                        label="Buscar por Nombre"
                        type="search"
                        variant="outlined"
                        color="warning"
                        fullWidth
                        value={search}
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
                                <TableCell align="left"
                                    onClick={() => handleSort('id')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'id' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        ID
                                    </div>
                                </TableCell>
                                <TableCell align="center"
                                    onClick={() => handleSort('name')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'name' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell align="center"
                                    onClick={() => handleSort('inventorytype')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'inventorytype' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Tipo
                                    </div>
                                </TableCell>
                                <TableCell align="center"
                                    onClick={() => handleSort('year')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'year' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Año
                                    </div>
                                </TableCell>
                                <TableCell align="center"
                                    onClick={() => handleSort('inventorystatus')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'inventorystatus' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Estado
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className="mr-4 text-gray-700 font-medium md:font-bold text-[17px] md:text-lg">
                                        Acciones
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            {paginatedItems.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow 
                                        onClick={() => toggleRowExpansion(row.id)}
                                        className={`cursor-pointer ${expandedRowId === row.id ? 'bg-gradient-to-r from-transparent to-transparent via-gray-100' : ''}`}
                                    >
                                        <TableCell align="left" size="small">
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.id}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.name}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.supplytype}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.year}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.supplystatus}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" size="small">
                                            <div className="flex flex-row justify-end gap-5 text-gray-700">
                                                <IconButton color="inherit" onClick={() => handleOpenEditModal(row)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleOpenDeleteModal(row.id, row.name)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRowId === row.id && (
                                        <TableRow className="bg-gradient-to-r from-transparent to-transparent via-gray-100">
                                            <TableCell colSpan={6}>
                                                <div className="flex flex-col w-full">
                                                    <div className="flex gap-1 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Descripción: </strong>{row.description}
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}                            
                            {Array.from({ length: rowsPerPage - paginatedItems.length }).map((_, index) => (
                                <TableRow key={`empty-row-${index}`}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex justify-end items-end grow overflow-x-hide">
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            <CreateSupplyModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                supplystatuses={supplystatuses}
                supplytypes={supplytypes}
                laboratory_id={laboratory_id}
            />
            <EditSupplyModal
                open={modalOpenEdit}
                handleClose={handleCloseEditModal}
                supplystatuses={supplystatuses}
                supplytypes={supplytypes}
                row={selectedRow!}
            />
            <DeleteSupplyModal
                open={modalOpenDelete}
                handleClose={handleCloseDeleteModal}
                id={selectedRowId!}
                name={selectedRowName!}
            />
        </main>
    );
}