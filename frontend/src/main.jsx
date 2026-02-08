import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

import axios from 'axios';

// Change this line to handle the base path correctly
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)