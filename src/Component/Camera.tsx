/**
 * @author Douraïd BEN HASSEN <douraid.benhassen@gmail.com>
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { useState, useEffect, memo, useRef } from 'react';

import { Alert, Box, Grid, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { analyze, AnalyzedData, AnalyzeResponse } from '../Api/Analyze';
import { AxiosResponse } from 'axios';

export interface CameraProps {
    isShoot: boolean;

    screenShotHandler(value: boolean): void;

    isCameraActive: boolean;

    cameraActiveHandler(value: boolean): void;
    itemsDataHandler(value: AnalyzedData): void;
}

const Camera: React.FC<CameraProps> = (Props) => {
    const { isShoot, isCameraActive, cameraActiveHandler, itemsDataHandler } = Props;

    const { t } = useTranslation();

    const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored'>('pending');
    const [cameraInfo, setCameraInfo] = useState<'none' | 'treatment' | 'errored'>('none');

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (cameraStatus !== 'enabled' && cameraInfo !== 'treatment') return;
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
                /* use the stream */
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.oncanplay = () => setCameraStatus('enabled');
                }
            })
            .catch((err) => {
                /* handle the error */
                setCameraStatus(err.toString().includes('Permission denied') ? 'refused' : 'errored');
                cameraActiveHandler(false);
            });
    };

    const switchCamera = () => {
        setCameraInfo(isShoot ? 'treatment' : 'none');
    };

    const takeScreenshot = () => {
        if (cameraStatus === 'pending') return;
        setCameraInfo('treatment');
        const canvas = document.createElement('canvas');

        if (videoRef.current) {
            const video = videoRef.current;
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

                if (imageRef.current) {
                    console.log(_image);
                    imageRef.current.src = _image;
                }
                // console.log(_image);
                // TODO: envoi serveur
                setCameraInfo('treatment');

                analyze(_image)
                    .then((r: AxiosResponse<AnalyzeResponse>) => {
                        console.log(r);
                        setCameraInfo('none');
                        itemsDataHandler(r.data.data);
                    })
                    .catch(() => {
                        console.log('no response');
                        setCameraInfo('errored');
                    });
            }
        }
    };

    return (
        <Box>
            <Grid>
                <video
                    muted={true}
                    hidden={cameraInfo !== 'none' || cameraStatus !== 'enabled'}
                    width={'100%'}
                    height={'100%'}
                    autoPlay
                    playsInline
                    ref={videoRef}
                />
                <img hidden={cameraInfo !== 'treatment'} alt={'img'} width={'100%'} height={'100%'} ref={imageRef} />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
                <Grid item xs={8} justifyContent="center">
                    {cameraStatus === 'pending' ? (
                        <Box pt={10} pb={10}>
                            <Alert severity="info"> {t('camera.status.pending')} </Alert>
                        </Box>
                    ) : cameraStatus === 'refused' ? (
                        <Box pt={10} pb={10}>
                            <Alert severity="warning"> {t('camera.status.disable')} </Alert>
                        </Box>
                    ) : cameraStatus === 'errored' ? (
                        <Box pt={10} pb={10}>
                            <Alert severity="error"> {t('camera.status.errored')} </Alert>
                        </Box>
                    ) : cameraStatus === 'enabled' ? (
                        cameraInfo === 'treatment' ? (
                            <Box pt={2} pb={5}>
                                <LinearProgress />
                                <Alert severity="success"> {t('camera.info.treatment')} </Alert>
                            </Box>
                        ) : cameraInfo === 'errored' ? (
                            <Box pt={2} pb={5}>
                                <Alert severity="error"> {t('camera.info.errored')} </Alert>
                            </Box>
                        ) : (
                            <></>
                        )
                    ) : (
                        <Box pt={5} pb={5}>
                            <Alert severity="error"> ERROR </Alert>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default memo(Camera);
