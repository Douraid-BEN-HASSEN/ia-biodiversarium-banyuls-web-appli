import React, { useState, useEffect } from 'react';

import { Toolbar, Box, AppBar, Fab, IconButton } from '@mui/material';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
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

const StyledExtendedFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: '20%',
    right: '20%',
    margin: '0 auto',
});

interface AppBarBottomProps {
    isShoot: boolean;
    screenShotHandler(value: boolean): void;
    isCameraActive: boolean;
    cameraActiveHandler(value: boolean): void;
}

const AppBarBottom: React.FC<AppBarBottomProps> = React.memo((Props) => {
    const { isShoot, isCameraActive, cameraActiveHandler, screenShotHandler } = Props;

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                {!isCameraActive ? (
                    <StyledExtendedFab variant="extended" onClick={() => cameraActiveHandler(true)}>
                        Veuillez activer la caméra
                    </StyledExtendedFab>
                ) : (
                    <StyledFab color="success" aria-label="takeScreen">
                        {isShoot ? (
                            <PlayArrowIcon onClick={() => screenShotHandler(!isShoot)} />
                        ) : (
                            <PhotoCameraIcon onClick={() => screenShotHandler(!isShoot)} />
                        )}
                    </StyledFab>
                )}

                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit">
                    <SearchIcon />
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
