"use client"

import { IDandNAME, Supplytype} from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from "@mui/material/Button";

interface ABMTableProps {
    items: IDandNAME[];
}

export default function ABMTable({ items }: ABMTableProps) {
    const [error, setError] = useState("");
    const router = useRouter();


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(IDandNAME => (
                        <tr key={IDandNAME.id}>
                            <td>{IDandNAME.id}</td>
                            <td>{IDandNAME.name}</td>
                            <td>
                                <Button variant="contained" size="large" color="error" disableElevation startIcon={<DeleteForeverIcon/>}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}