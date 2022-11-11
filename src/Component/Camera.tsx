/**
 * @author Douraïd BEN HASSEN <douraid.benhassen@gmail.com>
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { useState, useEffect, memo } from 'react';

import { Alert, Box, Grid, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { analyze } from '../Api/Analyze';

export interface CameraProps {
    isShoot: boolean;

    screenShotHandler(value: boolean): void;

    isCameraActive: boolean;

    cameraActiveHandler(value: boolean): void;
}

const Camera: React.FC<CameraProps> = (Props) => {
    const { isShoot, screenShotHandler, isCameraActive, cameraActiveHandler } = Props;

    const { t } = useTranslation();

    const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored'>('pending');
    const [cameraInfo, setCameraInfo] = useState<'none' | 'treatment' | 'errored'>('none');

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [video, setVideo] = useState<HTMLVideoElement | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

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

    const switchCamera = () => {
        if (video) {
            video.hidden = isShoot;
            setCameraInfo(isShoot ? 'treatment' : 'none');
        }

        if (image) {
            image.hidden = !isShoot;
        }
    };

    const takeScreenshot = () => {
        if (cameraStatus === 'pending') return;
        setCameraInfo('treatment');
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
                // console.log(_image);
                // TODO: envoi serveur

                analyze(_image)
                    .then(() => {
                        console.log('response');
                        setCameraInfo('treatment');
                    })
                    .catch(() => {
                        console.log('no response');
                        setCameraInfo('errored');
                    })
                    .finally(() => {
                        console.log('');
                    });
            }
        }
    };

    return (
        <Box>
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
