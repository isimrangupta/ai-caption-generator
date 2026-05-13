// lib/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: 'https://ai-caption-generator-aytk.onrender.com',
  withCredentials: true  
})

export default API