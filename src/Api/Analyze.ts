import axios from 'axios';
import { SERVER_URL } from '../config';

/**
 * @param image base64
 */
export const analyze = (image: string) => {
    console.log(`Server url ${SERVER_URL}`);

    return axios.post(`${SERVER_URL}/mobile/analyze`, {
        content: image,
    });
};
