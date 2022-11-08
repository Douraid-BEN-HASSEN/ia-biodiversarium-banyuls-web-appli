import React, { useState, useEffect } from "react";

// bootstrap
import { Button } from 'react-bootstrap';
import { Gear, XCircle, RecordCircle } from 'react-bootstrap-icons';

interface cameraProps {

};

const Camera : React.FC<cameraProps> = React.memo(({}) => {
  const [cameraStatus, setCameraStatus] = useState<'pending' | 'enabled' | 'refused' | 'errored' | 'captured'>("pending")

  const [counter, setCounter] = useState(0);

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
        facingMode: 'environment'
      }
    };
  
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      /* use the stream */
      setCameraStatus('enabled')
      var video = document.querySelector('video');
      if(video) {
        video.srcObject = stream; 
        video.oncanplay = (sender) => {
          (sender.target as HTMLVideoElement).hidden = false;
        };
      }    
    })
    .catch((err) => {
      /* handle the error */
      setCameraStatus(err.toString().includes('Permission denied') ? 'refused' : 'errored')
    });
  };

  const cameraStatusSection = () => {    
    if(cameraStatus === 'pending') {
      return <>
        <div id="cameraStatusSection" className="text-center m-3">
          <div className="col">
            <div className="row">
              <div className="ms-1 text-primary">
                <div className="row-12 mb-2">
                  <Gear className="me-2"/>Veuillez activer la caméra
                </div>
                <div className="row-12">
                  <img src={require('../Assets/enable_camera.jpg')} style={{width: '20rem'}}></img>
                </div>
                
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <Button className="mt-2" onClick={askForPermission}>Activer la caméra</Button>
              </div>
            </div>
          </div>
        </div>
      </>;   
    } else if(cameraStatus === 'refused') {
      return <>
        <div id="cameraStatusSection" className="text-center m-3">
          <div className="row-12 mb-2">
            <XCircle className="me-1"/>La caméra est désactivée ! Veuillez autoriser la caméra
          </div>
          <div className="row-12">
            <img src={require('../Assets/enable_camera.jpg')} style={{width: '20rem'}}></img>
          </div>
        </div>
      </>;
    } else if(cameraStatus === 'errored') {
      return <>
        <div id="cameraStatusSection" className="text-center m-3">
          <div className="row-12 mb-2">
            <XCircle className="me-1"/>Votre appareil n'est pas compatible
          </div>
          <div className="row-12">
            <img src={require('../Assets/enable_camera.jpg')} style={{width: '20rem'}}></img>
          </div>
        </div>
      </>;
    } else if(cameraStatus === 'enabled') {
      return <>
      <div className="container">
          <div className="text-center">
          <div className="col-12">
            <div className="row mt-3">
              <div className="col-4">
                <label htmlFor="serverCB">Moteur IA:</label>
              </div>
              <div className="col-8">
                <select className="form-control form-control-sm" aria-label="Sélectionner une IA" id="serverCB">
                  <option value="1">IA Google</option>
                  <option value="2">IA Imerir</option>
                </select>
              </div>
            </div>

              
          </div>
          <h1><RecordCircle onClick={takeScreenshot}></RecordCircle></h1>
        </div>
      </div>
      </>;
    } else if(cameraStatus === 'captured') {
      return <>
        <div className="text-center mt-2">
          <i>Traitement en cours...</i>
        </div>
      </>;
    }
  }

  const takeScreenshot = () => {
    setCameraStatus('captured');
    
    let canvas = document.createElement('canvas');
    let video = document.querySelector('video');
    
    if(video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      let ctx = canvas.getContext('2d');
      if(cameraStatus === 'enabled' && ctx && video) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let image = canvas.toDataURL('image/jpeg');
        console.log(image);
      }
    }
    
    
  };

  const videoInputsection = () => {
    return <>
      <video hidden={true} autoPlay playsInline></video>
    </>;
  }
  
  return <>
      <div className="row">
        <>
          {videoInputsection()}
          {cameraStatusSection()}
        </>
      </div>
  </>;
});

export default Camera;