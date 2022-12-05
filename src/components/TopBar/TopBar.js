import React from 'react';
import { AppBar, Box, CardMedia, Toolbar } from '@mui/material';

const TopBar = () => {
    //tren-maya-background.jpg
    return (
        <AppBar>
            <Toolbar>
                <CardMedia
                    component="img"
                    src="logo-ine.png"
                    alt="INE"
                    sx={{ width: '150px' }}
                />
                <Box flex={1} />
                <Box display="flex" gap="10px" fontWeight="bold">
                    <h4 style={{ fontSize: '14px' }}>SOBRE EL INE</h4>
                    <h4 style={{ fontSize: '14px' }}>CREDENCIAL PARA VOTAR</h4>
                    <h4 style={{ fontSize: '14px' }}>VOTO Y ELECCIONES</h4>
                    <h4 style={{ fontSize: '14px' }}>CULTURA CÍVICA</h4>
                    <h4 style={{ fontSize: '14px' }}>SECVICIOS INE</h4>
                    <h4 style={{ fontSize: '14px' }}>CENTRAL ELECTORAL</h4>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
