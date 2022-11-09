import React, { useState, useEffect } from 'react';

import { Toolbar, Box, AppBar, Fab, IconButton } from '@mui/material';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Search from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

interface AppBarBottomProps {
    screenShotHandler(value: boolean): void;
}

const AppBarBottom: React.FC<AppBarBottomProps> = React.memo((Props) => {
    const { screenShotHandler } = Props;

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <StyledFab color="success" aria-label="add">
                    <PhotoCamera onClick={() => screenShotHandler(true)} />
                </StyledFab>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit">
                    <Search />
                </IconButton>
                <IconButton color="inherit">
                    <MoreIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
});

AppBarBottom.displayName = 'AppBarBottom';
export default AppBarBottom;
