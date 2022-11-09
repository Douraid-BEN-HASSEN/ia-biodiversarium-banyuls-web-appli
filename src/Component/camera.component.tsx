import React, { useState, useEffect } from 'react';
import axios from 'axios';

// bootstrap
import { Button } from 'react-bootstrap';
import { Gear, XCircle, RecordCircle } from 'react-bootstrap-icons';

const Camera: React.FC = React.memo(() => {
    const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored' | 'captured'>(
        'pending'
    );
    const [counter, setCounter] = useState(0);
    const [iaEngine, setIaEngine] = useState<'imerir' | 'google'>('imerir');

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
                /* use the stream */
                setCameraStatus('enabled');
                const video = document.querySelector('video');
                if (video) {
                    video.srcObject = stream;
                    video.oncanplay = (sender) => {
                        (sender.target as HTMLVideoElement).hidden = false;
                    };
                }
            })
            .catch((err) => {
                /* handle the error */
                setCameraStatus(err.toString().includes('Permission denied') ? 'refused' : 'errored');
            });
    };

    const onIaEngineChange = (sender: any) => {
        setIaEngine(sender?.target?.value ? sender.target.value : 'imerir');
    };

    const cameraStatusSection = () => {
        if (cameraStatus === 'pending') {
            return (
                <>
                    <div id="cameraStatusSection" className="text-center m-3">
                        <div className="col">
                            <div className="row">
                                <div className="ms-1 text-primary">
                                    <div className="row-12 mb-2">
                                        <Gear className="me-2" />
                                        Veuillez activer la caméra
                                    </div>
                                    <div className="row-12">
                                        <img
                                            src={require('../Assets/enable_camera.jpg')}
                                            style={{ width: '20rem' }}
                                        ></img>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <Button className="mt-2" onClick={askForPermission}>
                                        Activer la caméra
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else if (cameraStatus === 'refused') {
            return (
                <>
                    <div id="cameraStatusSection" className="text-center m-3">
                        <div className="row-12 mb-2">
                            <XCircle className="me-1" />
                            La caméra est désactivée ! Veuillez autoriser la caméra
                        </div>
                        <div className="row-12">
                            <img src={require('../Assets/enable_camera.jpg')} style={{ width: '20rem' }}></img>
                        </div>
                    </div>
                </>
            );
        } else if (cameraStatus === 'errored') {
            return (
                <>
                    <div id="cameraStatusSection" className="text-center m-3">
                        <div className="row-12 mb-2">
                            <XCircle className="me-1" />
                            Votre appareil n'est pas compatible
                        </div>
                        <div className="row-12">
                            <img src={require('../Assets/enable_camera.jpg')} style={{ width: '20rem' }}></img>
                        </div>
                    </div>
                </>
            );
        } else if (cameraStatus === 'enabled') {
            return (
                <>
                    <div className="container">
                        <div className="text-center">
                            <div className="col-12">
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <label htmlFor="iaEngineCB">Moteur IA:</label>
                                    </div>
                                    <div className="col-8">
                                        <select
                                            className="form-control form-control-sm"
                                            id="iaEngineCB"
                                            onChange={onIaEngineChange}
                                        >
                                            <option value="imerir">IA Imerir</option>
                                            <option value="google">IA Google</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <h1>
                                <RecordCircle onClick={takeScreenshot}></RecordCircle>
                            </h1>
                        </div>
                    </div>
                </>
            );
        } else if (cameraStatus === 'captured') {
            return (
                <>
                    <div className="text-center mt-2">
                        <i>Traitement en cours...</i>
                    </div>
                </>
            );
        }
    };

    const takeScreenshot = () => {
        setCameraStatus('captured');

        const canvas = document.createElement('canvas');
        const video = document.querySelector('video');

        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (cameraStatus === 'enabled' && ctx && video) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL('image/jpeg');

                console.log(iaEngine);
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

    const videoInputsection = () => {
        return <></>;
    };

    return (
        <div>
            <video hidden={true} autoPlay playsInline></video>
            {cameraStatusSection()}
        </div>
    );
});

Camera.displayName = 'Camera';
export default Camera;
