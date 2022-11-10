/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { useState, memo } from 'react';

import Camera from './Camera';
import { Grid, Paper } from '@mui/material';
import FishInformation from './FishInformation';
import AppBarBottom from './AppBarBottom';

const Home: React.FC = () => {
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
            <Paper>
                <Camera
                    isShoot={isTakeScreenShot}
                    screenShotHandler={takeScreenShotHandler}
                    isCameraActive={isCameraActive}
                    cameraActiveHandler={cameraActiveHandler}
                />
            </Paper>

            <Paper>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} justifyContent="center">
                        <FishInformation />
                    </Grid>
                </Grid>
            </Paper>
            <AppBarBottom
                isShoot={isTakeScreenShot}
                screenShotHandler={takeScreenShotHandler}
                isCameraActive={isCameraActive}
                cameraActiveHandler={cameraActiveHandler}
            />
        </>
    );
};

export default memo(Home);
