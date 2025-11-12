import { Grid, ListItem, Typography } from '@mui/material';
export default function PageHeader({ pageLabel, children }) {
    return (
        <ListItem>
            <Grid container alignItems="center" justifyContent="space-between">
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