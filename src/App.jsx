import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { signUp,signIn,signOut } from 'aws-amplify/auth';

function App() {
  const [count, setCount] = useState(0)
  

  async function handleSignUp({ username, password, email }) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number // E.164 number convention
          },
          // optional
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
  
      console.log(userId);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function signIn({ username, password }) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App



