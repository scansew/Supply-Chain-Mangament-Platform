import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Dashboard from './Dashboard.jsx';  

function App({ signOut, user }) {

  return (
    <>
    
    <Dashboard />
    
    </>
  )
}

export default withAuthenticator(App)



