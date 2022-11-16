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

    const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored' | 'captured'>(
        'pending'
    );
    const [cameraInfo, setCameraInfo] = useState<'none' | 'treatment' | 'errored'>('none');

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    /* todo add square detection */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [analyzeData, setAnalyzeData] = useState<AnalyzedData | null>(null);
    const dataHandler = (value: AnalyzedData) => {
        setAnalyzeData(value);
        itemsDataHandler(value);
    };

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
        setCameraStatus(isShoot ? 'captured' : 'enabled');
    };

    const takeScreenshot = () => {
        if (cameraStatus === 'pending') return;

        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!video) return;
        if (!canvas) return;

        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;

        const ctx = canvas.getContext('2d');
        if (cameraStatus === 'enabled' && ctx && video) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const _image = canvas.toDataURL('image/jpeg');
            setCameraStatus('captured');
            setCameraInfo('treatment');

            analyze(_image)
                .then((r: AxiosResponse<AnalyzeResponse>) => {
                    setCameraInfo('none');
                    dataHandler(r.data.data);
                })
                .catch(() => {
                    setCameraInfo('errored');
                });
        }
    };

    return (
        <Box>
            <Grid>
                <video
                    muted={true}
                    hidden={cameraStatus !== 'enabled'}
                    width={'100%'}
                    height={'100%'}
                    autoPlay
                    playsInline
                    ref={videoRef}
                />
                <canvas hidden={cameraStatus !== 'captured'} width={'100%'} height={'100%'} ref={canvasRef} />
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
                    ) : cameraStatus === 'enabled' || cameraStatus === 'captured' ? (
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
