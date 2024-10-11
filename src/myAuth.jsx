import { signUp,signIn,signOut } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';


function MyAuth(){
  const [userAttributes, setUserAttributes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchAttributes();
    
  }, []);

  async function fetchAttributes() {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
      } else {
        setError(new Error('No authenticated user'));
      }
    } catch (err) {
      console.error('Error fetching user attributes:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!userAttributes) return <div>No user attributes found. Please sign in.</div>;

  // console.log('User attributes:', userAttributes);

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
        <div>
      <h2>Welcome, {userAttributes.given_name}</h2>
        </div>
    )
    }
    
    export default MyAuth