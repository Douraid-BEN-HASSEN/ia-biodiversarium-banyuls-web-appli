import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Alert, Button, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Stack } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export enum IaEngine {
    'IMERIR' = 'Imerir',
    'GOOGLE' = 'google',
}

const listIaEngine = [IaEngine.IMERIR, IaEngine.GOOGLE];

const videoConstraints = {
    width: 1280,
    height: 720,
    // facingMode: 'user',
    facingMode: { exact: 'environment' },
};

interface ScreenshotDimensions {
    width: number;
    height: number;
}

export interface CameraProps {
    isShoot: boolean;

    screenShotHandler(value: boolean): void;
}

const Camera: React.FC<CameraProps> = React.memo((Props) => {
    const { isShoot, screenShotHandler } = Props;

    useEffect(() => {
        if (isShoot) {
            screenShotHandler(false);
            takeScreenshot();
            console.log('screen');
        }
    }, [isShoot]);

    const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored' | 'captured'>(
        'pending'
    );

    const [counter, setCounter] = useState(0);
    const [iaEngine, setIaEngine] = useState<IaEngine>(IaEngine.IMERIR);

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [video, setVideo] = useState<HTMLVideoElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 1);

        return () => clearInterval(interval);
    }, []);

    const askForPermission = () => {
        const constraints: MediaStreamConstraints = {
            audio: false,
            video: {
                facingMode: 'environment',
            },
        };

        scroll(0, 0);

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                setStream(stream);
                /* use the stream */
                setCameraStatus('enabled');
                if (video) {
                    video.srcObject = stream;
                    video.oncanplay = () => (video.hidden = false);
                }
            })
            .catch((err) => {
                /* handle the error */
                setCameraStatus(err.toString().includes('Permission denied') ? 'refused' : 'errored');
            });
    };

    const onIaEngineChange = (sender: any) => {
        setIaEngine(sender?.target?.value ? sender.target.value : IaEngine.IMERIR);
    };

    const takeScreenshot = () => {
        setCameraStatus('captured');
        if (video) video.pause();

        const canvas = document.createElement('canvas');

        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (cameraStatus === 'enabled' && ctx && video) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL('image/jpeg');

                console.log(iaEngine);
                console.log(image);
                // TODO: envoi serveur
                axios
                    .post(`SERVER_URL`, {
                        image: image,
                        ia: iaEngine ? iaEngine : 'google',
                    })
                    .then((res) => {
                        setCameraStatus('enabled');
                    });
            }
        }
    };

    return (
        <>
            <Grid>
                <video
                    muted={true}
                    hidden={true}
                    width={'100%'}
                    height={'100%'}
                    autoPlay
                    playsInline
                    ref={(ref) => setVideo(ref)}
                ></video>
            </Grid>
            <Grid xs={12} container justifyContent="center">
                <Grid item xs={8} justifyContent="center">
                    {cameraStatus === 'pending' ? (
                        <Stack spacing={2} pt={5}>
                            <Alert severity="info">Veuillez activer la caméra</Alert>
                            <Button variant="contained" onClick={askForPermission}>
                                Activer la caméra
                            </Button>
                        </Stack>
                    ) : cameraStatus === 'refused' ? (
                        <Alert severity="warning"> La caméra est désactivée ! Veuillez autoriser la caméra</Alert>
                    ) : cameraStatus === 'errored' ? (
                        <Alert severity="error">Votre appareil n'est pas compatible</Alert>
                    ) : cameraStatus === 'enabled' ? (
                        <>
                            <FormControl fullWidth>
                                <InputLabel id="ia-engine-select-label">Ia Engine</InputLabel>
                                <Select
                                    labelId="ia-engine-select-label"
                                    id="ia-engine-select"
                                    value={iaEngine}
                                    label="iaEngine"
                                    onChange={onIaEngineChange}
                                >
                                    <MenuItem value={IaEngine.IMERIR}>{IaEngine.IMERIR}</MenuItem>
                                    <MenuItem value={IaEngine.GOOGLE}>{IaEngine.GOOGLE}</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    ) : (
                        <i>Traitement en cours...</i>
                    )}
                </Grid>
            </Grid>

            {/*<button onClick={capture}>Capture photo</button>*/}
        </>
    );
});

Camera.displayName = 'Camera';
export default Camera;