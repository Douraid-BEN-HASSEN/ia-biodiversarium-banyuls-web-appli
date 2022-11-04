import React from "react";
import Webcam from "react-webcam";

// bootstrap
import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { CircleFill } from 'react-bootstrap-icons';

interface cameraProps {

};

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const WebcamComponent = () => {
    const webcamRef = React.useRef<any>(null);
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc)
        document.getElementById('img')?.setAttribute('src', imageSrc);
      },
      [webcamRef]
    );
    return (
      <>
        <img id="img" src="" height={900}></img>
        <div className="col text-center">
            <Button className="btn-primary" onClick={capture}>
                <CircleFill className="m-3"/>
            </Button>
        </div>
        <Webcam
            style={{visibility: 'hidden'}}
            audio={false}
            height={720}
            width={1280}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
        />        
      </>
    );
};

const Camera : React.FC<cameraProps> = React.memo(({}) => {
    return <>
        <Row className="row">
          <WebcamComponent/>
        </Row>
    </>;
});

export default Camera