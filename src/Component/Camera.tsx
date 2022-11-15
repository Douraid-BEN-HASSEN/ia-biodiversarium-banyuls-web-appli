import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { isEqual, map } from 'lodash';

import { Alert, Button, FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { Album } from '@mui/icons-material';
import ResultTable from './Table';

export enum IaEngine {
    'IMERIR' = 'Imerir',
    'GOOGLE' = 'google',
}

const Camera: React.FC = React.memo(() => {

    const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored' | 'captured'>(
        'pending'
    );

    const [fishResult, setFishResult] = useState<{
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
    }>({ detections: [], fishes: {}});

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
        if(video) video.pause();
        
        const canvas = document.createElement('canvas');

        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (cameraStatus === 'enabled' && ctx && video) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL('image/jpeg');
                // TODO: envoi serveur
                axios
                .post('http://10.3.1.37:5000/api/mobile/analyze', {//http://10.3.1.37:5000/api/tablet/analyze
                        content: image
                })
                .then((res) => {        
                    const result = (res?.data as unknown) as {
                        detections: {
                            certainty: number;
                            detection: string;
                            position: {
                                bottomright: {
                                    x: number;
                                    y: number;
                                };
                                topleft: {
                                    x: number;
                                    y: number;
                                };
                            };
                        }[];
                        fishes: any;
                    };
                    setFishResult(result);
                    setCameraStatus('enabled');
                })
                .catch((err) => setFishResult({ detections: [], fishes: {} }));
            }
        }
    };

    return (
        <>
            <div id="cameraStatusSection">
                <video
                    muted={true}
                    hidden={true}
                    width={'100%'}
                    height={'100%'}
                    autoPlay
                    playsInline
                    ref={(ref) => setVideo(ref)}
                ></video>

                {cameraStatus === 'pending' ? (
                    <>
                        <Alert severity="info">Veuillez activer la caméra</Alert>
                        <Button variant="contained" onClick={askForPermission}>
                            Activer la caméra
                        </Button>
                    </>
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

                        <IconButton color="primary" aria-label="take Screenshot" onClick={takeScreenshot}>
                            <Album />
                        </IconButton>

                        <ResultTable fishResult={fishResult}/>
                    </>
                ) : (
                    <i>Traitement en cours...</i>                    
                )}
            </div>
        </>
    );
});

Camera.displayName = 'Camera';
export default Camera;
