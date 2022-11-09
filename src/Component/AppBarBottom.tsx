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

interface AppBarBottomProps {
    isShoot: boolean;
    isCameraActive: boolean;

    screenShotHandler(value: boolean): void;
}

const AppBarBottom: React.FC<AppBarBottomProps> = React.memo((Props) => {
    const { isShoot, isCameraActive, screenShotHandler } = Props;

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                {!isCameraActive ? (
                    <StyledFab variant="extended">Test___test</StyledFab>
                ) : (
                    <StyledFab color="success" aria-label="add">
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
