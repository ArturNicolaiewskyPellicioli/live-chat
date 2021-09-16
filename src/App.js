import React, { useState, useEffect } from 'react';
// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Button from './components/Button'
import Channel from './components/Channel'
import styled from 'styled-components'
import LoadSpinner from 'lib-milestone'


// dps botar no env
firebase.initializeApp({
  apiKey: "AIzaSyCGFe0a-UbSLbjagZaJpU95iyPCJZPu1-4",
  authDomain: "chat-d6cde.firebaseapp.com",
  databaseURL: "https://chat-d6cde-default-rtdb.firebaseio.com",
  projectId: "chat-d6cde",
  storageBucket: "chat-d6cde.appspot.com",
  messagingSenderId: "501727771927",
  appId: "1:501727771927:web:b4b3b1d0fc76fe0201cb52"
});

const auth = firebase.auth()
const db = firebase.firestore()


const MainContainer = styled.div `
    background-color: #424e5d;
    padding: 5vh;
    min-height: 90vh;

    header {
      position: sticky;
      display: flex;
      justify-content: space-between;
      color: white;
      font-weight: bold;
      max-height: 10vh;
    }

    button {
      border: none;
      background-color: tomato;
      color: white;
      font-weight: bold;
      padding: 0 2rem;
      border-radius: 8px;
      cursor: pointer;
    }

    main {
      height: 40vw;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
`



function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initializing, setInitializing] = useState(true)

  if (!firebase.apps.length) {
   firebase.initializeApp({});
}else {
   firebase.app(); // if already initialized, use that one
}

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    if (initializing) {
      setInitializing(false)
    }
  },[initializing])

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading..."

  return (
    <MainContainer>
      {user ? (
        <div>
          <header>
            <p>Chat</p>
            <Button onClick={signOut}>Sign out</Button>
          </header>
          <Channel user={user} db={db} />
        </div>
      ) : (
          <>
            <header>
              <p>Chat</p>
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </header>
            <main>
              <h1>Welcome :)</h1>
            </main>
          </>
      )}
    </MainContainer>
  );
}

export default App;
