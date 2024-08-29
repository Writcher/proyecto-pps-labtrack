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
import CreateScholarModal from "./createmodal";
import { Scholarshiptype, Usercareer, GetScholar } from "@/app/lib/definitions";
import DeleteScholarModal from "./deletemodal";
import EditScholarModal from "./editmodal";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { ButtonGroup } from "@mui/material";

interface AMBScholarTableProps {
    usercareers: Usercareer[];
    scholarships: Scholarshiptype[];
    laboratory_id: number;
}

export default function ABMScholarTable({ usercareers, scholarships, laboratory_id }: AMBScholarTableProps ) {
//filtros
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [showSearchForm, setShowSearchForm] = useState(true);
    const [showScholarshipFilter, setShowScholarshipFilter] = useState(false);
    const [showCarrerFilter, setShowCareerFilter] = useState(false);
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: any }>({});

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleFilterClose = () => {
        setAnchorEl(null);
    };
    const handleSearchFilterSelect = () => {
        setShowSearchForm(true);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        handleFilterClose();
    };
    const handleScholarshipFilterSelect = () => {
        setShowScholarshipFilter(true);
        setShowCareerFilter(false);
        setShowSearchForm(false);
        handleFilterClose();
    }
    const handleCareerFilterSelect = () => {
        setShowCareerFilter(true);
        setShowScholarshipFilter(false);
        setShowSearchForm(false);
        handleFilterClose();
    }
    //filtro beca
    const [scholarship, setScholarship] = useState<number | ''>('');
    const handleScholarshipChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const scholarshipValue = event.target.value as number;
        setScholarship(scholarshipValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            scholarship: scholarshipValue,
        }));
    };
    const getScholarshipNameById = (id: number) => {
        const scholarship = scholarships.find(sch => sch.id === id);
        return scholarship ? scholarship.name : 'Desconocida';
    };
    //filtro busqueda
    const [search, setSearch] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            search: searchValue,
        }));
    };
    //filtro carrera
    const [userCareer, setUserCareer] = useState<number | ''>('');
    const handleUserCareerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const careerValue = event.target.value as number;
        setUserCareer(careerValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            career: careerValue,
        }));
    };
    const getCareerNameById = (id: number) => {
        const career = usercareers.find(sch => sch.id === id);
        return career ? career.name : 'Desconocida';
    };
    //limpiar filtros
    const handleClearFilters = () => {
        setSearch("");
        setScholarship('');
        setUserCareer('');
        setShowSearchForm(true);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        setActiveFilters({});
        handleFilterClose();
    };
//fetch data
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    const [data, setData] = useState<GetScholar[]>([]);
    async function fetchData(searchTerm: string, scholarship: number | '', userCareer: number | '') {
        try {
            const url = new URL(`/api/admin/usermanagement/scholar`, window.location.origin);
            url.searchParams.append('name', searchTerm);
            url.searchParams.append('labid', laboratory_id.toString());
            if (scholarship !== '') {
                url.searchParams.append('scholarship', scholarship.toString());
            }
            if (userCareer !== '') {
                url.searchParams.append('usercareer', userCareer.toString());
            }
            const response = await fetch(url.toString(), {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchData = useCallback(
        debounce((searchTerm: string, scholarship: number | '', userCareer: number | '') => fetchData(searchTerm, scholarship, userCareer), 300),
        []
    );
    useEffect(() => {
        debouncedFetchData(search, scholarship, userCareer);
    }, [search, debouncedFetchData, scholarship, userCareer]);

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
            debouncedFetchData(search, scholarship, userCareer);
        }
    }, [debouncedFetchData, modalOpenCreate, scholarship, search, userCareer]);

    //fila seleccionada
    const [selectedRow, setSelectedRow] = useState<GetScholar | null>(null);
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
            debouncedFetchData(search, scholarship, userCareer);
        }
    }, [debouncedFetchData, modalOpenDelete, scholarship, search, userCareer]);

    //edit
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const handleOpenEditModal = (row: GetScholar) => {
        setSelectedRow(row);
        setModalOpenEdit(true);
    }
    const handleCloseEditModal = () => {
        setModalOpenEdit(false);
    }
    useEffect(()=> {
        if (!modalOpenEdit) {
            debouncedFetchData(search, scholarship, userCareer);
        }
    },[debouncedFetchData, modalOpenEdit, scholarship, search, userCareer]);

//expandir fila
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const toggleRowExpansion = (id: number) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };

//ordenar por columna
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string>('id');
    const sortData = (data: GetScholar[]) => {
        return data.slice().sort((a, b) => {
            const aValue = a[sortColumn as keyof GetScholar] ?? '';
            const bValue = b[sortColumn as keyof GetScholar] ?? '';
    
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
            <div className="flex flex-col justify-center md:flex-row w-full md:h-14 gap-4 md:gap-2 text-gray-700">
                <div className="flex flex-row gap-2 h-14">
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
                    <MenuItem onClick={handleScholarshipFilterSelect}>Filtrar por Beca</MenuItem>
                    <MenuItem onClick={handleCareerFilterSelect}>Filtrar por Carrera</MenuItem>
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
                    {showScholarshipFilter && (
                        <TextField 
                            id="scholarship" 
                            name="scholarship" 
                            label="Filtrar por Beca" 
                            type="text" 
                            variant="outlined" 
                            color="warning"
                            select 
                            fullWidth 
                            value={scholarship} 
                            onChange={handleScholarshipChange}
                        > 
                            {scholarships.map(scholarshipprop => (
                                <MenuItem key={scholarshipprop.id} value={scholarshipprop.id}>{scholarshipprop.name}</MenuItem>
                            ))}
                        </TextField>
                    )}
                    {showCarrerFilter && (
                        <TextField 
                            id="career" 
                            name="career" 
                            label="Filtrar por Carrera"
                            type="text"
                            variant="outlined"
                            color="warning"
                            select 
                            fullWidth
                            value={userCareer} 
                            onChange={handleUserCareerChange}
                        >
                            {usercareers.map(usercareerprop => (
                                <MenuItem key={usercareerprop.id} value={usercareerprop.id}>{usercareerprop.name}</MenuItem>
                            ))}
                        </TextField>
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
            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
                {Object.entries(activeFilters).map(([key, value]) => (
                    value && (
                        <span key={key} className="border border-gray-700 p-2 rounded text-xs md:text-sm">
                            {key === "search" && `Nombre: ${value}`}
                            {key === "scholarship" && `Beca: ${getScholarshipNameById(value as number)}`}
                            {key === "career" && `Carrera: ${getCareerNameById(value as number)}`}
                        </span>
                    )
                ))}
            </div>
            <div className="flex flex-col overflow-y-auto h-full">
                <TableContainer>
                    <Table stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left"
                                    onClick={() => handleSort('name')}
                                    style={{ cursor: 'pointer' }}
                                    width="40%"
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'name' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell align="center"
                                    onClick={() => handleSort('userstatus')}
                                    style={{ cursor: 'pointer' }}
                                    width="30%"
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'userstatus' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Estado
                                    </div>
                                </TableCell>
                                <TableCell align="right"
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
                        count={data.length}
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