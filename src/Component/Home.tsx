/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { useState, memo } from 'react';

import Camera from './Camera';
import { Grid, Paper } from '@mui/material';
import FishInformation from './FishInformation';
import AppBarBottom from './AppBarBottom';
import { AnalyzedData } from '../Api/Analyze';

const Home: React.FC = () => {
    const [isTakeScreenShot, setIsTakeScreenShot] = useState(false);

    const takeScreenShotHandler = (value: boolean): void => {
        setIsTakeScreenShot(value);
    };

    const [isCameraActive, setIsCameraActive] = useState(false);

    const cameraActiveHandler = (value: boolean): void => {
        setIsCameraActive(value);
    };

    const [itemsData, setItemsData] = useState<AnalyzedData | null>(null);

    const itemsDataHandler = (value: AnalyzedData) => {
        setItemsData(value);
    };

    return (
        <>
            <Paper>
                <Camera
                    isShoot={isTakeScreenShot}
                    screenShotHandler={takeScreenShotHandler}
                    isCameraActive={isCameraActive}
                    cameraActiveHandler={cameraActiveHandler}
                    itemsDataHandler={itemsDataHandler}
                />
            </Paper>

            <Paper>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} justifyContent="center">
                        <FishInformation itemsData={itemsData?.fishes ?? {}} />
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
