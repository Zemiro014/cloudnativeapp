'use client';

import { CssBaseline } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import Header from '@/app/components/Header';
import Body from '@/app/components/Body';
import { menuItems } from './menuItems';
import { defaultTheme } from './theme';

export default function Layout({ children }) {
    const theme = defaultTheme;
    const menuContent = menuItems;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <Header menuItems={menuContent} />
                <Body>{children}</Body>
            </Box>
        </ThemeProvider>
    );
}