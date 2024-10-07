import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

function myAdmin(){
//Invite user to company
async function addUserToGroup(username, groupName) {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    const result = await Auth.addUserToGroup(username, groupName);
    console.log(result);
  } catch (error) {
    console.log('Error adding user to group: ', error);
  }
}

async function getUserAttributes() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user;
      console.log('User attributes: ', attributes);
      // Access custom attributes like attributes['custom:role']
    } catch (error) {
      console.log('Error getting user attributes: ', error);
    }
  }

  
// Call this after successful signup
addUserToGroup(username, 'UserRole');
}

export default withAuthenticator(myAdmin)