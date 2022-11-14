import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

import { isEqual, map } from 'lodash';

import { Alert, Button, FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Settings, Cancel, Album } from '@mui/icons-material';

export enum IaEngine {
    'IMERIR' = 'Imerir',
    'GOOGLE' = 'google',
}

interface CamProps {
    fishResult: {
            id: number,
            scientific_name: string,
            name: string,
            family: string,
            description: { fr: string },
            s_type: string,
    }[];
    setFishResult(value: {
            id: number,
            scientific_name: string,
            name: string,
            family: string,
            description: { fr: string },
            s_type: string,
    }[]): void;
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

const Camera: React.FC<CamProps> = React.memo((Props) => {
    const { fishResult, setFishResult } = Props;

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

                console.log(iaEngine);
                console.log(image);
                // TODO: envoi serveur
                axios
                    .post(`SERVER_URL`, {
                        image: image,
                        ia: iaEngine ? iaEngine : 'google',
                    })
                    .then((res) => {
                        const result = (res as unknown) as {
                            id: number;
                            scientific_name: string;
                            name: string;
                            family: string;
                            description: {
                                fr: string;
                            };
                            s_type: string;
                        }[];
                                            
                        setFishResult(result);
                        setCameraStatus('enabled');
                    })
                    .catch((err) => console.log(err));
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

                        <table>
                                <thead>
                                        <tr>
                                                <th>Nom scientifique</th>
                                                <th>Nom</th>
                                                <th>Famille</th>
                                                <th>Description</th>
                                                <th>Type</th>
                                        </tr>
                                </thead>
                                {fishResult.map(result =>
                                <tbody key={result.id}>
                                        <tr>
                                                <td>{result.scientific_name}</td>
                                                <td>{result.name}</td>
                                                <td>{result.family}</td>
                                                <td>{result.description.fr}</td>
                                                <td>{result.s_type}</td>
                                        </tr>
                                </tbody>
                                )}
                        </table>
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
