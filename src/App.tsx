import React from 'react';
import './App.css';

import Camera from './Component/Camera';
// import Camera from './Component/camera.component';
import { Box, Grid } from '@mui/material';
import DrawerAppBar from './Component/AppBar';
import FishInformation from './Component/FishInformation';

function App() {

    const fishResultHandler = (value: {
        id: number,
        scientific_name: string,
        name: string,
        family: string,
        description: { fr: string },
        s_type: string,
    }[]): void => {
        fishResultHandler(value);
    };

    return (
        <>
            <DrawerAppBar />
            <Grid sx={{ p: 5 }} container justifyContent="center">
                <Grid item>
                    <Camera
                    fishResult={[
                        {
                                id: 1,
                                scientific_name: 'scientific_name',
                                name: 'poisson 1',
                                family: 'family',
                                description: {
                                    fr: 'DESCRIPTION'
                                },
                                s_type: 'string'
                        },
                        {
                            id: 2,
                            scientific_name: 'scientific_name',
                            name: 'poisson 2',
                            family: 'family',
                            description: {
                                fr: 'DESCRIPTION'
                            },
                            s_type: 'string'
                        }
                    ]}
                    setFishResult={fishResultHandler}/>
                </Grid>

                <Grid item>
                    <FishInformation />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
