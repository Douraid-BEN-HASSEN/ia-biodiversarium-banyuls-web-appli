import React, { useRef, useEffect, useState } from 'react';
import { AnalyzedDetections } from '../Api/Analyze';
import Img from './group_racoon.jpg';

function drawSquare(canvas: HTMLCanvasElement, fishDetected: AnalyzedDetections) {
    const ctx = canvas.getContext('2d');

    const name = fishDetected.detection;
    const pourcent = fishDetected.certainty*100;
    const posX = fishDetected.position.topleft.x;
    const posY = fishDetected.position.topleft.y;
    const width = fishDetected.position.bottomright.x - posX;
    const height = fishDetected.position.bottomright.y - posY;

    if (ctx !== null) {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';

        // ctx?.moveTo(30, 96);
        ctx.strokeRect(posX, posY, width, height);
        ctx.fillText(name, posX, fishDetected.position.bottomright.y + 15);
        ctx.fillText(
            pourcent.toFixed(0).toString() + ' %',
            fishDetected.position.bottomright.x - 20,
            fishDetected.position.bottomright.y + 15
        );

        ctx.font = '18px arial';

        ctx?.stroke();
    }
}

const testImage = () => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

    const title = 'Les petits racoons';

    const image = new Image();
    image.src = Img;

    if (canvas !== null) {
        const ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        image.onload = () => {
            ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
            json.forEach((element) => drawSquare(canvas, element));
        };
    }

    return (
        <div className="lmj-banner">
            <canvas ref={(ref) => setCanvas(ref)}></canvas>
        </div>
    );
};

const json: AnalyzedDetections[] = [
    {
        certainty: 0.7309659719467163,
        detection: 'carrot',
        position: {
            bottomright: {
                x: 587.9774169921875,
                y: 444.05169677734375,
            },
            topleft: {
                x: 105.20343017578125,
                y: 1.075653076171875,
            },
        },
    },
    {
        certainty: 0.7309659719467163,
        detection: 'chien',
        position: {
            bottomright: {
                x: 387.9774169921875,
                y: 144.05169677734375,
            },
            topleft: {
                x: 305.20343017578125,
                y: 60.075653076171875,
            },
        },
    },
];

export default testImage;
