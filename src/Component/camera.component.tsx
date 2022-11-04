import React, { useState, useEffect } from "react";

// bootstrap
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Gear, XCircle, CheckCircle, RecordCircle } from 'react-bootstrap-icons';

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
        width: 1920, 
        height: 1080
      }
    };
  
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      /* use the stream */
      setCameraStatus('enabled')
      var video = document.querySelector('video');
      if(video) {
        video.srcObject = stream;
        video.play();        
      }    
    })
    .catch((err) => {
      /* handle the error */
      setCameraStatus(err.toString().includes('Permission denied') ? 'refused' : 'errored')
    });
  };

  const cameraDisplay = () => {
    let canvas = document.createElement('canvas');
    let video = document.querySelector('video');
    
    canvas.width = 1920;
    canvas.height = 1080;
    
    let ctx = canvas.getContext('2d');
    if(cameraStatus == 'enabled' && ctx && video) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height );
      let image = canvas.toDataURL('image/jpeg');
      document.getElementById('imageInput')?.setAttribute('src', image);
    }
  }

  const cameraStatusSection = () => {    
    if(cameraStatus == 'pending') {
      return <>
        <div id="cameraStatusSection" className="m-3">
          <Col>
            <Row>
              <div className="ms-1 text-primary">
                <div className="row-12">
                  <Gear className="me-2"/>Veuillez activer la caméra
                </div>
                <div className="row-12">
                  <img src={require('../Assets/enable_camera.png')} style={{width: '20rem'}}></img>
                </div>
                
              </div>
            </Row>
            <Row>
              <div className="col text-center">
                <Button className="mt-1" onClick={askForPermission}>Activer la caméra</Button>
              </div>
            </Row>
          </Col>
        </div>
      </>;   
    } else if(cameraStatus == 'refused') {
      return <>
        <div id="cameraStatusSection" className="m-3">
          <XCircle className="me-1"/><p>La caméra est désactivée ! Veuillez autoriser la caméra</p>
          <img src={require('../Assets/enable_camera.png')}></img>
        </div>
      </>;
    } else if(cameraStatus == 'errored') {
      return <>
        <div id="cameraStatusSection" className="m-3">
          <XCircle className="me-1"/><p>La caméra est désactivée ! Veuillez autoriser la caméra</p>
          <img src={require('../Assets/enable_camera.png')}></img>
        </div>
      </>;
    } else if(cameraStatus == 'enabled') {
      cameraDisplay();
      return <>
        <img id="imageInput"></img>
        <div className="text-center">
          <h1><RecordCircle onClick={takeScreenshot}></RecordCircle></h1>
        </div>
      </>;
    } else if(cameraStatus == 'captured') {
      return <>
        <img id="imageInput"></img>
        <div className="text-center">
          <h1>
            <XCircle className="me-1 text-danger" onClick={cancelScreenshot}></XCircle>
            <CheckCircle className="text-success" onClick={saveScreenshot}></CheckCircle>
          </h1>
        </div>
      </>;
    }
  }

  const takeScreenshot = () => {
    setCameraStatus('captured');
  }

  const saveScreenshot = () => {
    let canvas = document.createElement('canvas');
    let video = document.querySelector('video');
    
    canvas.width = 1920;
    canvas.height = 1080;
    
    let ctx = canvas.getContext('2d');
    if(ctx && video) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      let image = canvas.toDataURL('image/jpeg');
      console.log(image);
    }
  }

  const cancelScreenshot = () => {
    setCameraStatus('enabled');
  };

  const videoInputsection = () => {
    return <>
      <video hidden={true}></video>
    </>;
  }
  
  return <>
      <Row className="row">
        <>
          {cameraStatusSection()}
          {videoInputsection()}
        </>
      </Row>
  </>;
});

export default Camera;