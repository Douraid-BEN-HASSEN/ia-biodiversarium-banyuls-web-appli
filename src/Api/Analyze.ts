import axios from 'axios';
import { SERVER_URL } from '../config';

export const test = () => {
    return axios.get(`${SERVER_URL}/api`);
};

export interface AnalyzedFishs {
    id: number,
    scientific_name: string,
    name: string,
    family: string,
    description: any,
    s_type: string,
    img: string
}

export interface AnalyzedCoordinate {
    x: number;
    y: number;
}

export interface AnalyzedPosition {
    bottonright: AnalyzedCoordinate;
    topleft: AnalyzedCoordinate;
}

export interface AnalyzedDetections {
    certainty: number;
    detection: "string";
    position: AnalyzedPosition
}


/**
 * @param image base64
 */
export const analyze = (image: string) => {
    return axios.post(`${SERVER_URL}/api/mobile/analyze`, {
        content: image,
    });
};

export interface FishInformationObject {
    id: number,
    scientific_name: string,
    name: string,
    family: string,
    description: any,
    s_type: string,
    img: string
}

export const findFish = (scientific_name: string) => {
    return axios.get(`${SERVER_URL}/api/species/${scientific_name}`);
};
