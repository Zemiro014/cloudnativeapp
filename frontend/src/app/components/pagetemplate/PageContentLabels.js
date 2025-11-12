import { TableCell, TableHead, TableRow } from '@mui/material';

export default function PageContentLabels({ labels }) {
    return (
        <>
            <TableHead>
                <TableRow>
                    {labels.map((label, index) => (
                        <TableCell key={index}>{label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </>

    )
}