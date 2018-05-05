import axios from 'axios';

require('dotenv').config();

const instance = axios.create({
  baseURL: process.env.FIREBASE_URL
})

export default instance;