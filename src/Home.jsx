import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@aws-amplify/ui-react/styles.css';

import MyAuth from './myAuth.jsx';

function Home({}) {
  const [count, setCount] = useState(0)

  return (
    <>

      <MyAuth />
    </>
  )
}

export default Home;