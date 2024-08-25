"use client"

import React, { useCallback, useEffect, useState } from "react";
import { FormEvent } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import TablePagination from '@mui/material/TablePagination';
import debounce from "lodash.debounce";
import { Scholarshiptype, Usercareer, Projecttype, Projectstatus, GetHistoricProject } from "@/app/lib/definitions";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { ButtonGroup } from "@mui/material";

interface AMBScholarTableProps {
    historicusercareers: Usercareer[];
    historicscholarships: Scholarshiptype[];
    historicprojecttypes: Projecttype[];
    historicprojectstatus: Projectstatus[];
    laboratory_id: number;
}

export default function ABMHistoricTable({ historicusercareers, historicscholarships, historicprojecttypes, historicprojectstatus, laboratory_id }: AMBScholarTableProps ) {
//filtros
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [showYearFilter, setShowYearFilter] = useState(true);
    const [showProjectSearchForm, setShowProjectSearchForm] = useState(false);
    const [showProjectStatusFilter, setShowProjectStatusFilter] = useState(false);
    const [showProjectTypeFilter, setShowProjectTypeFilter] = useState(false);
    const [showScholarSearchForm, setShowScholarSearchForm] = useState(false);
    const [showScholarshipFilter, setShowScholarshipFilter] = useState(false);
    const [showCarrerFilter, setShowCareerFilter] = useState(false);
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: any }>({});

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleFilterClose = () => {
        setAnchorEl(null);
    };
    const handleYearFilterSelect = () => {
        setShowYearFilter(true);
        setShowScholarSearchForm(false);
        setShowProjectSearchForm(false);
        setShowProjectTypeFilter(false);
        setShowProjectStatusFilter(false);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        handleFilterClose();
    };
    const handleProjectSearchFilterSelect = () => {
        setShowProjectSearchForm(true);
        setShowYearFilter(false);
        setShowScholarSearchForm(false);
        setShowProjectTypeFilter(false);
        setShowProjectStatusFilter(false);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        handleFilterClose();
    };
    const handleProjectStatusFilterSelect = () => {
        setShowProjectStatusFilter(true);
        setShowYearFilter(false);
        setShowScholarSearchForm(false);
        setShowProjectTypeFilter(false);
        setShowProjectSearchForm(false);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        handleFilterClose();
    };
    const handleProjectTypeFilterSelect = () => {
        setShowProjectTypeFilter(true);
        setShowYearFilter(false);
        setShowScholarSearchForm(false);
        setShowProjectStatusFilter(false);
        setShowProjectSearchForm(false);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        handleFilterClose();
    };
    const handleScholarSearchFilterSelect = () => {
        setShowScholarSearchForm(true);
        setShowProjectTypeFilter(false);
        setShowYearFilter(false);
        setShowProjectStatusFilter(false);
        setShowProjectSearchForm(false);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        handleFilterClose();
    };
    const handleScholarshipFilterSelect = () => {
        setShowScholarshipFilter(true);
        setShowYearFilter(false);
        setShowScholarSearchForm(false);
        setShowProjectTypeFilter(false);
        setShowProjectStatusFilter(false);
        setShowCareerFilter(false);
        setShowProjectSearchForm(false);
        handleFilterClose();
    };
    const handleCareerFilterSelect = () => {
        setShowCareerFilter(true);
        setShowScholarSearchForm(false);
        setShowYearFilter(false);
        setShowProjectTypeFilter(false);
        setShowProjectStatusFilter(false);
        setShowScholarshipFilter(false);
        setShowProjectSearchForm(false);
        handleFilterClose();
    };
    //filtro año
    const añoInicio = 2008;
    const añoFinal = new Date().getFullYear() - 1;
    const años = Array.from({ length: añoFinal - añoInicio + 1 }, (_, index) => añoInicio + index);
    const [yearFilter, setYearFilter] = useState<number | ''>('');
    const handleYearFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const yearfilterValue = event.target.value as number;
        setYearFilter(yearfilterValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            year: yearfilterValue,
        }));
    };
    //filtro busqueda por proyecto
    const [projectsearch, setProjectSearch] = useState("");
    const handleProjectSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const projectsearchValue = e.target.value;
        setProjectSearch(projectsearchValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            projectsearch: projectsearchValue,
        }));
    };
    //filtro estado proyecto
    const [projectStatusFilter, setProjectStatusFilter] = useState<number | ''>('');
    const handleProjectStatusFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const projectstatusfilterValue = event.target.value as number;
        setProjectStatusFilter(projectstatusfilterValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            projectstatus: projectstatusfilterValue,
        }));
    };
    const getHistoricProjectStatusNameById = (id: number) => {
        const projectstatus = historicprojectstatus.find(sch => sch.id === id);
        return projectstatus ? projectstatus.name : 'Desconocida';
    };
    //filtro tipo de proyecto
    const [projectTypeFilter, setProjectTypeFilter] = useState<number | ''>('');
    const handleProjectTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const projecttypefilterValue = event.target.value as number;
        setProjectTypeFilter(projecttypefilterValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            projecttype: projecttypefilterValue,
        }));
    };
    const getHistoricProjectTypeNameById = (id: number) => {
        const projecttype = historicprojecttypes.find(sch => sch.id === id);
        return projecttype ? projecttype.name : 'Desconocida';
    };
    //filtro busqueda por proyecto
    const [scholarsearch, setScholarSearch] = useState("");
    const handleScholarSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const scholarsearchValue = e.target.value;
        setScholarSearch(scholarsearchValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            scholarsearch: scholarsearchValue,
        }));
    };
    //filtro beca
    const [scholarshipFilter, setScholarshipFilter] = useState<number | ''>('');
    const handleScholarshipFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const scholarshipfilterValue = event.target.value as number;
        setScholarshipFilter(scholarshipfilterValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            scholarship: scholarshipfilterValue,
        }));
    };
    const getHistoricScholarshipNameById = (id: number) => {
        const scholarship = historicscholarships.find(sch => sch.id === id);
        return scholarship ? scholarship.name : 'Desconocida';
    };
    //filtro carrera
    const [userCareerFilter, setUserCareerFilter] = useState<number | ''>('');
    const handleUserCareerFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const careerfilterValue = event.target.value as number;
        setUserCareerFilter(careerfilterValue);
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            career: careerfilterValue,
        }));
    };
    const getHistoricCareerNameById = (id: number) => {
        const career = historicusercareers.find(sch => sch.id === id);
        return career ? career.name : 'Desconocida';
    };
    //limpiar filtros
    const handleClearFilters = () => {
        setProjectSearch("");
        setScholarSearch("");
        setScholarshipFilter('');
        setUserCareerFilter('');
        setProjectStatusFilter('');
        setProjectTypeFilter('');
        setYearFilter('');
        setShowYearFilter(true);
        setShowProjectSearchForm(false);
        setShowProjectTypeFilter(false);
        setShowScholarSearchForm(false);
        setShowProjectStatusFilter(false);
        setShowCareerFilter(false);
        setShowScholarshipFilter(false);
        setActiveFilters({});
        handleFilterClose();
    };
//fetch data
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    const [data, setData] = useState<GetHistoricProject[]>([]);
    async function fetchData(projectsearch: string, scholarshipFilter: number | '', userCareerFilter: number | '', scholarsearch: string, projectStatusFilter: number | '', projectTypeFilter: number | '', yearFilter: number | '') {
        try {
            const url = new URL(`/api/historic`, window.location.origin);
            url.searchParams.append('labid', laboratory_id.toString());
            if (projectsearch !== "") {
                url.searchParams.append('projectname', projectsearch);
            }
            if (scholarshipFilter !== '') {
                url.searchParams.append('scholarship', scholarshipFilter.toString());
            }
            if (userCareerFilter !== '') {
                url.searchParams.append('usercareer', userCareerFilter.toString());
            }
            if (scholarsearch !== "") {
                url.searchParams.append('scholarname', scholarsearch);
            }
            if (projectStatusFilter !== '') {
                url.searchParams.append('projectstatus', projectStatusFilter.toString());
            }
            if (projectTypeFilter !== '') {
                url.searchParams.append('projecttype', projectTypeFilter.toString());
            }
            if (yearFilter !== '') {
                url.searchParams.append('year', yearFilter.toString());
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
        debounce((projectsearch: string, scholarshipFilter: number | '', userCareerFilter: number | '', scholarsearch: string, projectStatusFilter: number | '', projectTypeFilter: number | '', yearFilter: number | '') => fetchData(projectsearch, scholarshipFilter, userCareerFilter, scholarsearch, projectStatusFilter, projectTypeFilter, yearFilter), 300),
        []
    );
    useEffect(() => {
        debouncedFetchData(projectsearch, scholarshipFilter, userCareerFilter, scholarsearch, projectStatusFilter, projectTypeFilter, yearFilter);
    }, [projectsearch, debouncedFetchData, scholarshipFilter, userCareerFilter, scholarsearch, projectStatusFilter, projectTypeFilter, yearFilter]);

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
            debouncedFetchData(projectsearch, scholarshipFilter, userCareerFilter, scholarsearch, projectStatusFilter, projectTypeFilter, yearFilter);
        }
    }, [debouncedFetchData, modalOpenCreate, scholarshipFilter, projectsearch, userCareerFilter, scholarsearch, projectStatusFilter, projectTypeFilter, yearFilter]);

    //fila seleccionada
    const [selectedRow, setSelectedRow] = useState<GetHistoricProject | null>(null);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [selectedRowName, setSelectedRowName] = useState<string | null>(null);       

//expandir fila
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const toggleRowExpansion = (id: number) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };
    
//ordenar por columna
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string>('id');
    const sortData = (data: GetHistoricProject[]) => {
        return data.slice().sort((a, b) => {
            const aValue = a[sortColumn as keyof GetHistoricProject] ?? '';
            const bValue = b[sortColumn as keyof GetHistoricProject] ?? '';
    
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
                    <MenuItem onClick={handleYearFilterSelect}>Filtrar por Año</MenuItem>
                    <MenuItem onClick={handleProjectSearchFilterSelect}>Buscar por Nombre de Proyecto</MenuItem>
                    <MenuItem onClick={handleProjectStatusFilterSelect}>Filtrar por Estado de Proyecto</MenuItem>
                    <MenuItem onClick={handleProjectTypeFilterSelect}>Filtrar por Tipo de Proyecto</MenuItem>
                    <MenuItem onClick={handleScholarSearchFilterSelect}>Buscar por Nombre de Becario</MenuItem>
                    <MenuItem onClick={handleScholarshipFilterSelect}>Filtrar por Beca</MenuItem>
                    <MenuItem onClick={handleCareerFilterSelect}>Filtrar por Carrera</MenuItem>
                </Menu>
                <form className="flex items-center justify-start md:w-2/6" onSubmit={handleSubmit}>
                    {showProjectSearchForm && (
                        <TextField 
                            id="projectsearch"
                            name="projectsearch"
                            label="Buscar por Nombre de Proyecto"
                            type="search"
                            variant="outlined"
                            color="warning"
                            fullWidth
                            value={projectsearch}
                            onChange={handleProjectSearchChange}
                        />
                    )}
                    {showScholarSearchForm && (
                        <TextField 
                            id="scholarsearch"
                            name="scholarsearch"
                            label="Buscar por Nombre de Becario"
                            type="search"
                            variant="outlined"
                            color="warning"
                            fullWidth
                            value={scholarsearch}
                            onChange={handleScholarSearchChange}
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
                            value={scholarshipFilter} 
                            onChange={handleScholarshipFilterChange}
                        > 
                            {historicscholarships.map(scholarshipprop => (
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
                            value={userCareerFilter} 
                            onChange={handleUserCareerFilterChange}
                        >
                            {historicusercareers.map(usercareerprop => (
                                <MenuItem key={usercareerprop.id} value={usercareerprop.id}>{usercareerprop.name}</MenuItem>
                            ))}
                        </TextField>
                    )}
                    {showProjectStatusFilter && (
                        <TextField 
                        id="projectstatus" 
                        name="projectstatus" 
                        label="Filtrar por Estado de Proyecto"
                        type="text"
                        variant="outlined"
                        color="warning"
                        select 
                        fullWidth
                        value={projectStatusFilter} 
                        onChange={handleProjectStatusFilterChange}
                    >
                        {historicprojectstatus.map(projectstatusprop => (
                            <MenuItem key={projectstatusprop.id} value={projectstatusprop.id}>{projectstatusprop.name}</MenuItem>
                        ))}
                    </TextField>
                    )}
                    {showProjectTypeFilter && (
                        <TextField 
                        id="projecttype" 
                        name="projecttype" 
                        label="Filtrar por Tipo de Proyecto"
                        type="text"
                        variant="outlined"
                        color="warning"
                        select 
                        fullWidth
                        value={projectTypeFilter} 
                        onChange={handleProjectTypeFilterChange}
                    >
                        {historicprojecttypes.map(projecttypeprop => (
                            <MenuItem key={projecttypeprop.id} value={projecttypeprop.id}>{projecttypeprop.name}</MenuItem>
                        ))}
                    </TextField>
                    )}
                    {showYearFilter && (
                        <TextField 
                        id="projecttype" 
                        name="projecttype" 
                        label="Filtrar por Año"
                        type="text"
                        variant="outlined"
                        color="warning"
                        select 
                        fullWidth
                        value={yearFilter} 
                        onChange={handleYearFilterChange}
                    >
                        {años.map((año) => (
                            <MenuItem key={año} value={año}>
                                {año}
                            </MenuItem>
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
                            {key === "projectsearch" && `Nombre de Proyecto: ${value}`}
                            {key === "scholarsearch" && `Nombre de Becario: ${value}`}
                            {key === "scholarship" && `Beca: ${getHistoricScholarshipNameById(value as number)}`}
                            {key === "career" && `Carrera: ${getHistoricCareerNameById(value as number)}`}
                            {key === "projectstatus" && `Estado de Proyecto: ${getHistoricProjectStatusNameById(value as number)}`}
                            {key === "projecttype" && `Tipo de Proyecto: ${getHistoricProjectTypeNameById(value as number)}`}
                            {key === "year" && `Año: ${value}`}
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
                                    onClick={() => handleSort('projecttype')}
                                    style={{ cursor: 'pointer' }}
                                    width="20%"
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'name' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Tipo
                                    </div>
                                </TableCell>
                                <TableCell align="center"
                                    onClick={() => handleSort('projectstatus')}
                                    style={{ cursor: 'pointer' }}
                                    width="20%"
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'userstatus' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Estado
                                    </div>
                                </TableCell>
                                <TableCell align="right"
                                    onClick={() => handleSort('year')}
                                    style={{ cursor: 'pointer' }}
                                    width="20%"
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'name' ? (sortDirection === 'asc' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Año
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
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.historicprojecttypename}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small">
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.historicprojectstatusname}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" size="small">
                                            <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                {row.year}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRowId === row.id && (
                                        <TableRow className="bg-gradient-to-r from-transparent to-transparent via-gray-100">
                                            <TableCell colSpan={4}>
                                                <div className="flex flex-col w-full">
                                                    <div className="flex gap-1 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Beca: </strong>{row.description}
                                                    </div>
                                                    {row.historicshcolars.map((row) => (
                                                        <React.Fragment key={row.id}>
                                                            <div className="flex gap-1 text-gray-700 font-medium md:text-[17px]">
                                                                <strong>Becario: </strong>{row.name}
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
                                                                    <strong>Carrera: </strong>{row.historicusercareername}
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
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                            {Array.from({ length: rowsPerPage - paginatedItems.length }).map((_, index) => (
                                <TableRow key={`empty-row-${index}`}>
                                    <TableCell colSpan={4} />
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
        </main>
    );
}