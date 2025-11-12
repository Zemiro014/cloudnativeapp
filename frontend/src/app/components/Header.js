"use client";

import { AppBar, Button, IconButton, Toolbar, Typography } from
'@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';
import Head from 'next/head';

export default function Header({ menuItems }) {
    return (
        <div>
            <Head>
                <title>Cloud Native App</title>
                <meta name="description" content="A simple Next.js application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cloud Native App
                    </Typography>
                    {menuItems.map(({ href, title }) => (
                        <NextLink key={title} href={href}>
                            <Button color="inherit">{title}</Button>
                        </NextLink>
                    ))}
                </Toolbar>
            </AppBar>
        </div>
    );  
}