/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { useState, memo } from 'react';

import Camera from './Camera';
import { Box, Grid, Paper } from '@mui/material';
import FishInformation from './FishInformation';
import AppBarBottom from './AppBarBottom';

const Main: React.FC = () => {
    const [isTakeScreenShot, setIsTakeScreenShot] = useState(false);

    const takeScreenShotHandler = (value: boolean): void => {
        setIsTakeScreenShot(value);
    };

    const [isCameraActive, setIsCameraActive] = useState(false);

    const cameraActiveHandler = (value: boolean): void => {
        setIsCameraActive(value);
    };

    return (
        <>
            <Camera
                isShoot={isTakeScreenShot}
                screenShotHandler={takeScreenShotHandler}
                isCameraActive={isCameraActive}
                cameraActiveHandler={cameraActiveHandler}
            />

            <Box>
                <Grid sx={{ p: 5 }} container justifyContent="center" spacing={2}>
                    <Grid item xs={12} justifyContent="center">
                        <Paper>
                            <Box p={5}></Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} justifyContent="center">
                        <FishInformation />
                    </Grid>
                </Grid>
            </Box>
            <AppBarBottom
                isShoot={isTakeScreenShot}
                screenShotHandler={takeScreenShotHandler}
                isCameraActive={isCameraActive}
                cameraActiveHandler={cameraActiveHandler}
            />
        </>
    );
};

export default memo(Main);
