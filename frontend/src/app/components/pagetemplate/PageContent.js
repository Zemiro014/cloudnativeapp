/* eslint-disable no-undef */
'use client';
import { ListItem, Table, TableContainer } from '@mui/material';

export default function PageContent({ children }) {
    return (
        <ListItem>
            <TableContainer>
                <Table>
                    {children}
                </Table>
            </TableContainer>
        </ListItem>
    )
}