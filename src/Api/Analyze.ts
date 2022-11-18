import axios from 'axios';
import { API_URL } from '../config';
import { Language } from '../i18n/Language';

export const test = () => {
    return axios.get(`${API_URL}/api`);
};

export interface AnalyzedCoordinate {
    x: number;
    y: number;
}

export interface AnalyzedPosition {
    bottomright: AnalyzedCoordinate;
    topleft: AnalyzedCoordinate;
}

export interface AnalyzedDetections {
    certainty: number;
    detection: string;
    position: AnalyzedPosition;
}

export interface FishsInfo {
    [key: string]: FishInfo;
}

export type FishDescription = {
    [key in Language]?: string | undefined | null;
};

export interface FishInfo {
    id: number;
    description: FishDescription;
    family: string;
    name: string;
    s_name: string;
    type: string;
    image: string | null;
}

export interface AnalyzedData {
    detections: AnalyzedDetections[];
    fishes: FishsInfo;
}

export interface AnalyzeResponse {
    data: AnalyzedData;
}

/**
 * @param image base64
 */
export const analyze = (image: string) => {
    return axios.post(`${API_URL}/api/mobile/analyze`, {
        content: image,
    });
};

export const findFish = (scientific_name: string) => {
    return axios.get(`${API_URL}/api/species/${scientific_name}`);
};

export const getDocAllFish = () => {
    return axios.get(`${API_URL}/api/species`);
};