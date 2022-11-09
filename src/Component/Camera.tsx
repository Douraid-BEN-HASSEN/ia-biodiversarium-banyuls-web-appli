/**
 * @author Douraïd BEN HASSEN <douraid.benhassen@gmail.com>
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';

import { Alert, FormControl, Grid, IconButton, InputLabel, MenuItem, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
    isCameraActive: boolean;
    cameraActiveHandler(value: boolean): void;
}

const Camera: React.FC<CameraProps> = (Props) => {
    const { isShoot, screenShotHandler, isCameraActive, cameraActiveHandler } = Props;

    const { t } = useTranslation();

    const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored' | 'captured'>(
        'pending'
    );

    const [iaEngine, setIaEngine] = useState<IaEngine>(IaEngine.IMERIR);

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [video, setVideo] = useState<HTMLVideoElement | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (cameraStatus !== 'enabled' && cameraStatus !== 'captured') return;
        if (isShoot) takeScreenshot();

        switchCamera();
    }, [isShoot]);

    useEffect(() => {
        if (isCameraActive) askForPermission();
    }, [isCameraActive]);

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
                cameraActiveHandler(false);
            });
    };

    const onIaEngineChange = (sender: any) => {
        setIaEngine(sender?.target?.value ? sender.target.value : IaEngine.IMERIR);
    };

    const switchCamera = () => {
        if (video) {
            video.hidden = isShoot;
            setCameraStatus(isShoot ? 'captured' : 'enabled');
        }

        if (image) {
            image.hidden = !isShoot;
        }
    };

    const takeScreenshot = () => {
        if (cameraStatus === 'pending') return;
        setCameraStatus('captured');
        const canvas = document.createElement('canvas');

        if (video) {
            video.hidden = true;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');

            console.log(cameraStatus);
            console.log(ctx);
            console.log(video);

            if (cameraStatus === 'enabled' && ctx && video) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const _image = canvas.toDataURL('image/jpeg');

                if (image) {
                    console.log('screen');
                    image.src = _image;
                }
                console.log(iaEngine);
                console.log(_image);
                // TODO: envoi serveur
                axios
                    .post(`SERVER_URL`, {
                        image: _image,
                        ia: iaEngine ? iaEngine : 'Imerir',
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
                />
                <img hidden={true} alt={'img'} width={'100%'} height={'100%'} ref={(ref) => setImage(ref)} />
            </Grid>
            <Grid xs={12} container justifyContent="center">
                <Grid item xs={8} justifyContent="center">
                    {cameraStatus === 'pending' ? (
                        <Stack spacing={2} pt={5}>
                            <Alert severity="info"> {t('camera.pending')} </Alert>
                        </Stack>
                    ) : cameraStatus === 'refused' ? (
                        <Alert severity="warning"> {t('camera.disable')} </Alert>
                    ) : cameraStatus === 'errored' ? (
                        <Alert severity="error"> {t('camera.errored')} </Alert>
                    ) : cameraStatus === 'enabled' ? (
                        <>
                            {/*                            <FormControl fullWidth>
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
                            </FormControl>*/}
                        </>
                    ) : cameraStatus === 'captured' ? (
                        <Alert severity="success"> {t('camera.captured')} </Alert>
                    ) : (
                        <Alert severity="error"> ERROR </Alert>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default memo(Camera);
