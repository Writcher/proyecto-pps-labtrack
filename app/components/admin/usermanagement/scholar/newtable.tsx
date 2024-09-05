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
import IconButton from "@mui/material/IconButton";
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
    page: number;
    rowsPerPage: number;
    search: string;
    modalOpenCreate: boolean;
    modalOpenDelete: boolean;
    modalOpenEdit: boolean;
    selectedRowId: number;
    selectedRowName: string;
    selectedRow: null | GetScholar;
}

export default function ABMScholarTableNEW({ usercareers, scholarships, laboratory_id }: AMBScholarTableProps ) {
    const { register, watch, setValue } = useForm<FormData>({
        defaultValues: {
            page: 0,
            rowsPerPage: 10,
            search: "",
            modalOpenCreate: false,
            modalOpenDelete: false,
            modalOpenEdit: false,
            selectedRowId: 0,
            selectedRowName: "",
            selectedRow: null,
        }
    });

    const search = watch("search");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce((searchTerm: string) => {
        setValue("search", searchTerm);
    }, 500), []);
    // Function to handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(event.target.value);
    };
    const usercareer_id = 0
    const scholarshiptype_id = 0


    //fetch
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tableData', search, usercareer_id , scholarshiptype_id ],
        queryFn: () => fetchTableData({ search, laboratory_id, usercareer_id, scholarshiptype_id}),
        refetchOnWindowFocus: false
    });
    
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