import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SAPIENS_URL: any = process.env.SAPIENS_URL;

export const Sapiens = axios.create({
  baseURL: SAPIENS_URL,
});

export { axios };
