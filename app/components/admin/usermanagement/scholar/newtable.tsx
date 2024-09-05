"use client"

import { scholarshipType } from "@/app/lib/dtos/scholarshiptype";
import { userCareer } from "@/app/lib/dtos/usercareer";
import CreateScholarModal from "./createmodal";
import EditScholarModal from "./editmodal";
import DeleteScholarModal from "./deletemodal";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTableData } from "@/app/services/usermanagement/scholar.service";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { GetScholar } from "@/app/lib/definitions";

interface AMBScholarTableProps {
    usercareers: userCareer[];
    scholarships: scholarshipType[];
    laboratory_id: number;
}

interface FormData {
    //filters
    filterAnchor: null | HTMLElement;
    filterMenuOpen: boolean;
    activeFilters: { [key: string ]: any }
    showSearchForm: boolean;
    search: string;
    
    //pagination
    page: number;
    rowsPerPage: number;
    //modals
    modalOpenCreate: boolean;
    modalOpenDelete: boolean;
    modalOpenEdit: boolean;
    //selected row
    selectedRowId: number;
    selectedRowName: string;
    selectedRow: null | GetScholar;
    //expanded row
    expandedRowId: null | number;
}

export default function ABMScholarTableNEW({ usercareers, scholarships, laboratory_id }: AMBScholarTableProps ) {
    const { register, watch, setValue, getValue } = useForm<FormData>({
        defaultValues: {
            //filters
            filterAnchor: null,
            filterMenuOpen: Boolean(filterAnchor),
            activeFilters: {},
            search: "",
            showSearchForm: true,
            



            //pagination
            page: 0,
            rowsPerPage: 10,
            //modals
            modalOpenCreate: false,
            modalOpenDelete: false,
            modalOpenEdit: false,
            //selected row
            selectedRowId: 0,
            selectedRowName: "",
            selectedRow: null,
            //expanded row
            expandedRowId: null,
        }
    });
    //filters
    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setValue("filterAnchor", event.currentTarget);
    }
    const handleFilterClose = () => {
        setValue("filterAnchor", null);
    }
    const handleClearFilters = () => {
            //reset values
        setValue("search", "");

            //reset default filter show
        setValue("showSearchForm", true);

            //reset active filters and close
        setValue("activeFilters", {});
        handleFilterClose();
    }
        //search
    const search = watch("search");
    const handleSearchFilterSelect = () => {
        setValue("showSearchForm", true);
            //aca los otros filtros en false
        handleFilterClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce((searchTerm: string) => {
        setValue("search", searchTerm);
    }, 500), []);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(event.target.value);
        const currentFilters = getValues("activeFilters");
        setValue("activeFilters", {
            ...currentFilters,
            search: event.target.value,
        });
    };


    const usercareer_id = 0
    const scholarshiptype_id = 0


    //fetch
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tableData', search, usercareer_id , scholarshiptype_id ],
        queryFn: () => fetchTableData({ search, laboratory_id, usercareer_id, scholarshiptype_id}),
        refetchOnWindowFocus: false
    });
    //expanded row
    const expandedRowId = watch("expandedRowId");
    const toggleRowExpansion = (id: number) => {
        setValue("expandedRowId", expandedRowId === id ? null : id);
    }
    //pagination
    const page = watch("page");
    const rowsPerPage = watch("rowsPerPage")
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
    const modalOpenCreate = watch("modalOpenCreate");
    const handleOpenCreateModal = () => setValue("modalOpenCreate", true);
    const handleCloseCreateModal = () => {
        setValue("modalOpenCreate", false);
        refetch();
    };
        //selected row
    const selectedRowId = watch("selectedRowId");
    const selectedRowName = watch("selectedRowName");
    const selectedRow = watch("selectedRow");
        //delete
    const modalOpenDelete = watch("modalOpenDelete");
    const handleOpenDeleteModal = (id: number, name: string) => {
        setValue("selectedRowId", id);
        setValue("selectedRowName", name);
        setValue("modalOpenEdit", true);
    }
    const handleCloseDeleteModal = () => {
        setValue("modalOpenEdit", false);
        refetch();
    }
        //edit
    const modalOpenEdit = watch("modalOpenEdit");
    const handleOpenEditModal = (row: GetScholar) => {
        setValue("selectedRow", row);
        setValue("modalOpenEdit", true);
    }
    const handleCloseEditModal = () => {
        setValue("modalOpenEdit", false);
        refetch();
    }
    return (
        <main className="flex flex-col gap-2 px-6 pb-10 w-full h-full">
            <div className="flex flex-row w-full mb-4">
                <div className="flex flex-row gap-2 h-14 text-gray-700">
                    <ButtonGroup variant="outlined" color="inherit">
                        <Button 
                            variant="outlined" 
                            color="inherit"
                            disableElevation 
                            endIcon={<FilterAltIcon />}
                            onClick={handleFilterClick} 
                        >
                            Filtros
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="error"
                            disableElevation 
                            onClick={handleClearFilters}
                        >
                            <FilterAltOffIcon/>
                        </Button>
                    </ButtonGroup>
                    <div className="flex grow"/>
                    <div className="flex block md:hidden">
                        <Button
                            variant="contained"
                            color="success"
                            disableElevation
                            endIcon={<AddIcon />}
                            onClick={handleOpenCreateModal}
                        >
                            Añadir
                        </Button>
                    </div>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleFilterClose}
                >
                    <MenuItem onClick={handleSearchFilterSelect}>Buscar por Nombre</MenuItem>
                    <MenuItem >Filtrar por Beca</MenuItem>
                    <MenuItem >Filtrar por Carrera</MenuItem>
                </Menu>
                <form className="flex items-center justify-start md:w-2/6" onSubmit={handleSubmit}>
                    {showSearchForm && (
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
                    )}
                </form>
                <div className="flex grow" />
                <div className="md:flex hidden md:block">
                    <Button
                        variant="contained"
                        color="success"
                        disableElevation
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreateModal}
                    >
                        Añadir
                    </Button>
                </div>
            </div>
            <div className="flex gap-2 md:flex-row md:flex-wrap">
                {Object.entries(activeFilters).map(([key, value]) => (
                    value && (
                        <span key={key} className="border border-gray-700 p-2 rounded text-xs md:text-sm">
                            {key === "search" && `Nombre: ${value}`}
                        </span>
                    )
                ))}
            </div>
            <div className="flex flex-col overflow-y-auto h-full">
                <TableContainer>
                    <Table stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    width="40%"
                                >
                                    <div className="text-gray-700 font-medium md:font-bold text-[17px] md:text-lg">
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell 
                                    align="center"
                                    width="30%"
                                >
                                    <div className="text-gray-700 font-medium md:font-bold text-[17px] md:text-lg">
                                        Estado
                                    </div>
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    width="30%"
                                >
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
                                                {row.name}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className={`
                                                md:max-w-[50%] flex justify-center items-center mx-auto text-center  text-white font-medium text-[15px] md:text-lg py-2 px-2 rounded-3xl
                                                ${row.userstatus === 'Activo' ? 'bg-green-600' : ''}
                                                ${row.userstatus === 'Inactivo' ? 'bg-red-500' : ''}
                                                ${row.userstatus === 'Pendiente' ? 'bg-yellow-500' : ''}
                                            `}>
                                                {row.userstatus}
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
                                            <TableCell colSpan={3}>
                                                <div className="flex flex-col w-full">
                                                    <div className="flex gap-1 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Beca: </strong>{row.scholarshiptype}
                                                    </div>
                                                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>DNI: </strong>{row.dni}
                                                        </div>
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Legajo: </strong>{row.file}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Carrera: </strong>{row.usercareer}
                                                        </div>
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Año de Cursado: </strong>{row.careerlevel}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Email: </strong>{row.email}
                                                        </div>
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Telefono: </strong>{row.phone}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                        <div className="text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Dirección: </strong>{row.address}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Fecha de Creación: </strong>
                                                            {new Date(row.created_at).toLocaleDateString('es-AR', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                        <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Fecha de Inhabilitación: </strong>
                                                            {row.dropped_at ? 
                                                                new Date(row.dropped_at).toLocaleDateString('es-AR', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })
                                                                : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
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
            <CreateScholarModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                usercareers={usercareers}
                scholarships={scholarships}
                laboratory_id={laboratory_id}
            />
            <EditScholarModal
                open={modalOpenEdit}
                handleClose={handleCloseEditModal}
                usercareers={usercareers}
                scholarships={scholarships}
                row={selectedRow!}
            />
            <DeleteScholarModal
                open={modalOpenDelete}
                handleClose={handleCloseDeleteModal}
                id={selectedRowId!}
                name={selectedRowName!}
            />
        </main>
    );
}