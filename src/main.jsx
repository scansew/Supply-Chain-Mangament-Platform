import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Amplify
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);//Amplify

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)