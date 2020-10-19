import React from 'react';
import Login from './Login';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';


function App() {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return ( 
    <div style={styles.body}>
      <div style={styles.blueBar}></div>
    <div style={styles.whatsapp} className="container-sm p-0 mt-4">
    { id ? dashboard : <Login onIdSubmit={setId} /> }
    </div>
    </div>
  ); 
}
 
export default App;

const styles = {
  body: {
    backgroundColor: "#f1f1f1",
    posistion: "relative",
  },
  blueBar: {
    position: "absolute",
    zIndex: 88,
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#007bff",
    height: 80
  },
  whatsapp: {
    position: "relative",
    top: 0,
    zIndex: 888,
    backgroundColor: "#fff"
  }
}
