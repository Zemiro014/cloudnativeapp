'use client';
import { useEffect, useState } from 'react';
import { Grid, ListItem, Typography } from '@mui/material';
export default function PageHeader({ pageLabel, children }) {
    return (
        <ListItem>
            <Grid
                sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}
            >
                <Grid>
                    <Typography component="h4" variant="h4">
                        {pageLabel}
                    </Typography>
                </Grid>
                <Grid alignItems="right" size={{ xs: 6 }}>
                    {children}
                </Grid>
            </Grid>
        </ListItem>
    )
}