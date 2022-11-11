import axios from 'axios';
import { SERVER_URL } from '../config';

export const test = () => {
    return axios.get(`${SERVER_URL}/api`);
};

/**
 * @param image base64
 */
export const analyze = (image: string) => {
    return axios.post(`${SERVER_URL}/api/mobile/analyze`, {
        content: image,
    });
};
