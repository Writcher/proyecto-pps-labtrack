import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { deleteTableData } from '@/app/services/inventory/inventory.service';
import { deleteSupplyModalProps } from '@/app/lib/dtos/supply';
import CircularProgress from '@mui/material/CircularProgress';

export default function DeleteSupplyModal({ open, handleClose, id, name }: deleteSupplyModalProps) {
    const { handleSubmit, reset } = useForm();
    const mutation = useMutation({
        mutationFn: () => deleteTableData(id),
        onSuccess: (result) => {
            if (result && result.success) {
                handleClose();
                reset();
            };
        }
    });
    const onSubmit = () => {
        mutation.mutate();
    };
    const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    return (
            <Dialog 
                open={open} 
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                maxWidth={false}
                fullWidth
                PaperProps={{ 
                    component: 'form',
                    onSubmit: handleSubmit(onSubmit),
                    onClick: handleDialogClick,
                    style: { width: '600px', maxWidth: 'none' }
                }} 
            >
                <div className='flex flex-col m-2'>
                    <DialogTitle>
                        <div className='text-gray-700 items-center font-medium text-2xl md:text-3xl mb-2'>
                            ¿Eliminar {name} del inventario?
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                            <div className='text-gray-700 font-medium text-xl mb-2'>
                                Esto eliminara la entrada para siempre, ¿Esta seguro?
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='flex flex-row m-4 hidden md:block'>
                            <div className='flex flex-row gap-4'>
                                <Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                                <Button variant="contained" size="large" color="success" disableElevation endIcon={mutation.isPending ? <CircularProgress color="warning" size={26}/> : <DeleteForeverIcon />} type="submit" disabled={mutation.isPending}>BORRAR</Button>
                            </div>
                        </div>
                        <div className='flex flex-row m-3 block md:hidden'>
                            <div className='flex flex-row justify-center gap-4'>
                                <Button variant="contained"  color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                                <Button variant="contained"  color="success" disableElevation endIcon={mutation.isPending ? <CircularProgress color="warning" size={26}/> : <DeleteForeverIcon />} type="submit" disabled={mutation.isPending}>BORRAR</Button>
                            </div>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
    );
};