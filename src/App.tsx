import React, { useState } from 'react';
import './App.css';

import Camera from './Component/Camera';
// import Camera from './Component/camera.component';
import { Grid, Paper, Box } from '@mui/material';
import FishInformation from './Component/FishInformation';

import AppBarBottom from './Component/AppBarBottom';

function App() {
    const [isTakeScreenShot, setIsTakeScreenShot] = useState(false);

    const takeScreenShotHandler = (value: boolean): void => {
        setIsTakeScreenShot(value);
    };

    return (
        <>
            <Camera isShoot={isTakeScreenShot} screenShotHandler={takeScreenShotHandler} />
            {/*<DrawerAppBar />*/}
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
            <AppBarBottom screenShotHandler={takeScreenShotHandler} />
        </>
    );
}

export default App;
