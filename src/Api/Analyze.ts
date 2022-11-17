import axios from 'axios';
import { API_URL } from '../config';

export const test = () => {
    return axios.get(`${API_URL}/api`);
};

/**
 * @param image base64
 */
export const analyze = (image: string) => {
    return axios.post(`${API_URL}/api/mobile/analyze`, {
        content: image,
    });
};
