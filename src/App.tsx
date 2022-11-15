import React from 'react';
import './App.css';

import Camera from './Component/Camera';
// import Camera from './Component/camera.component';
import { Box, Grid } from '@mui/material';
import DrawerAppBar from './Component/AppBar';
import FishInformation from './Component/FishInformation';

function App() {

    const fishResultHandler = (value: {
        detections: {
            certainty: number,
            detection: string,
            position: {
                bottomright: {
                    x: number,
                    y: number
                },
                topleft: {
                    x: number,
                    y: number
                }
            }
        }[],
        fishes: any
}): void => {
        fishResultHandler(value);
    };

    return (
        <>
            <DrawerAppBar />
            <Grid sx={{ p: 5 }} container justifyContent="center">
                <Grid item>
                    <Camera/>
                </Grid>

                <Grid item>
                    <FishInformation />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
