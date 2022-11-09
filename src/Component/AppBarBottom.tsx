/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { memo } from 'react';

import { Toolbar, Box, AppBar, Fab, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

const AppBarBottom: React.FC<AppBarBottomProps> = (Props) => {
    const { isShoot, isCameraActive, cameraActiveHandler, screenShotHandler } = Props;

    const { t } = useTranslation();

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                {!isCameraActive ? (
                    <StyledExtendedFab variant="extended" onClick={() => cameraActiveHandler(true)}>
                        {t('appbar.camera.active')}
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
};

export default memo(AppBarBottom);
