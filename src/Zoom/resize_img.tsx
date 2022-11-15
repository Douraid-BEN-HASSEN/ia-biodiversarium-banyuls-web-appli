import React, { useRef, useEffect, useState } from 'react';
import Img from './group_racoon.jpg';





function drawSquare(canvas: HTMLCanvasElement, fishDetected: any) {
    const title = 'Les petits racoons';

    const image = new Image();
    image.src = Img;



    if (canvas !== null) {
        const ctx = canvas.getContext('2d');
  
        canvas.width = image.width;
        canvas.height = image.height;

        image.onload = () => {
            ctx?.drawImage(image, 0, 0,canvas.width,canvas.height);
            ctx?.beginPath();
            ctx?.moveTo(30, 96);
            ctx?.strokeRect(0, 0, 80, 500);
            ctx?.stroke();
          };
    }
}

const testImage = () => {

    const [canvas, setCanvas] = useState<HTMLCanvasElement|null>(null);

    const title = 'Les petits racoons';

    const image = new Image();
    image.src = Img;
    
    if (canvas !== null) {
        const ctx = canvas.getContext('2d');
  
        canvas.width = image.width;
        canvas.height = image.height;

        image.onload = () => {
            ctx?.drawImage(image, 0, 0,canvas.width,canvas.height);
            ctx?.beginPath();
            ctx?.moveTo(30, 96);
            ctx?.strokeRect(0, 0, 80, 500);
            ctx?.stroke();
          };
    }
    


    return (
        <div className='lmj-banner'>
            <canvas ref={(ref) => setCanvas(ref)}></canvas>
        </div>        
    );
};

export default testImage;