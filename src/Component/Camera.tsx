import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";

import Button from '@mui/material/Button';

const Camera: React.FC = React.memo(() => {

    const [cameraStatus, setCameraStatus] =
        useState<'pending' | 'enabled' | 'refused' | 'errored' | 'captured'>('pending');

    const [counter, setCounter] = useState(0);

    const [originalImage, setOriginalImage] = useState<string>('');

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

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                /* use the stream */
                setCameraStatus('enabled');
                const video = document.querySelector('video');
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch((err) => {
                /* handle the error */
                setCameraStatus(err.toString().includes('Permission denied') ? 'refused' : 'errored');
            });
    };

    const cameraDisplay = () => {
        const canvas = document.createElement('canvas');
        const video = document.querySelector('video');

        canvas.width = window.screen.width;
        canvas.height = window.screen.height;

        const ctx = canvas.getContext('2d');
        if (cameraStatus == 'enabled' && ctx && video) {
            console.log('ICI');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL('image/jpeg');
            document.getElementById('imageInput')?.setAttribute('src', image);
        }
    };

    const cameraStatusSection = () => {

        return (
            <>
                <div>

                </div>
            </>
        );

        // if (cameraStatus == 'pending') {
        //     return <>
        //         <div id="cameraStatusSection" className="text-center m-3">
        //             <Col>
        //                 <Row>
        //                     <div className="ms-1 text-primary">
        //                         <div className="row-12 mb-2">
        //                             <Gear className="me-2"/>Veuillez activer la caméra
        //                         </div>
        //                         <div className="row-12">
        //                             <img src={require('../Assets/enable_camera.jpg')} style={{width: '20rem'}}></img>
        //                         </div>
        //
        //                     </div>
        //                 </Row>
        //                 <Row>
        //                     <div className="col text-center">
        //                         <Button className="mt-2" onClick={askForPermission}>Activer la caméra</Button>
        //                     </div>
        //                 </Row>
        //             </Col>
        //         </div>
        //     </>;
        // } else if (cameraStatus == 'refused') {
        //     return <>
        //         <div id="cameraStatusSection" className="text-center m-3">
        //             <div className="row-12 mb-2">
        //                 <XCircle className="me-1"/>La caméra est désactivée ! Veuillez autoriser la caméra
        //             </div>
        //             <div className="row-12">
        //                 <img src={require('../Assets/enable_camera.jpg')} style={{width: '20rem'}}></img>
        //             </div>
        //         </div>
        //     </>;
        // } else if (cameraStatus == 'errored') {
        //     return <>
        //         <div id="cameraStatusSection" className="text-center m-3">
        //             <div className="row-12 mb-2">
        //                 <XCircle className="me-1"/>Votre appareil n'est pas compatible
        //             </div>
        //             <div className="row-12">
        //                 <img src={require('../Assets/enable_camera.jpg')} style={{width: '20rem'}}></img>
        //             </div>
        //         </div>
        //     </>;
        // } else if (cameraStatus == 'enabled') {
        //     cameraDisplay();
        //     return <>
        //         <div className="text-center">
        //             <img id="imageInput"></img>
        //             <h1><RecordCircle onClick={takeScreenshot}></RecordCircle></h1>
        //         </div>
        //     </>;
        // } else if (cameraStatus == 'captured') {
        //     return <>
        //         <img id="imageInput" src={originalImage}></img>
        //         <form className="m-2">
        //             <div className="form-group row">
        //                 <label htmlFor="serverCB" className="col-sm-2 col-form-label">IA: </label>
        //                 <div className="col-sm-10">
        //                     <select className="form-control form-control-sm" aria-label="Sélectionner une IA"
        //                             id="serverCB">
        //                         <option value="1">IA Google</option>
        //                         <option value="2">IA Imerir</option>
        //                     </select>
        //                 </div>
        //             </div>
        //
        //             <div className="text-center">
        //                 <h1>
        //                     <XCircle className="me-1 text-danger" onClick={cancelScreenshot}></XCircle>
        //                     <CheckCircle className="text-success" onClick={saveScreenshot}></CheckCircle>
        //                 </h1>
        //             </div>
        //
        //         </form>
        //     </>;
        // }
    };

    const takeScreenshot = () => {
        setCameraStatus('captured');

        const image = document.getElementById('imageInput') as HTMLImageElement | null;

        if (image) {
            const dataUrl = image.getAttribute('src');
            if (dataUrl) setOriginalImage(dataUrl);
        }

    };

    const saveScreenshot = () => {
        const image = document.getElementById('imageInput');
        if (image) {
            console.log(image);
        }
    };

    const cancelScreenshot = () => {
        setCameraStatus('enabled');
    };

    const videoInputsection = () => {
        return <>
            <video hidden={true}></video>
        </>;
    };

    return (
        <>
            <Button variant='contained' onClick={() => askForPermission()}>
                Activer la caméra
            </Button>
            <Webcam />
            {/*{videoInputsection()}*/}
        </>
    );
});

Camera.displayName = 'Camera';
export default Camera;
