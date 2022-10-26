import './App.scss';
import MessagesList from './components/MessagesList';
import Conversation from './components/Conversation';
import listMessagesMock from './resources/listMessagesMock.json';
import conversationJson from './resources/messagesMock.json';
import { Client } from '@twilio/conversations';

import { useEffect, useState } from 'react'

function App() {
  const listMessagesData = JSON.parse(JSON.stringify(listMessagesMock));
  const conversationData = JSON.parse(JSON.stringify(conversationJson));

  const [conversationSelected, setConversationSelected] = useState(conversationData[0])
  const [conversationSelectedIndex, setConversationSelectedIndex] = useState(0)

  const userLogged = {
    name: "German Alvarez"
  }
  const client = new Client("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzQyNzE4ZDc2MDg4NzVlZjk4YzFlM2YwZjcwMmJkNWU1LTE2NjY4MjU2NTYiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJHZXJtYW4gQWx2YXJleiIsImNoYXQiOnsic2VydmljZV9zaWQiOiJJU2U2ZDMxMGMwM2U0MTQwNmJhMzI0YzYwNjUxNDU1ZjRmIn19LCJpYXQiOjE2NjY4MjU2NTYsImV4cCI6MTY2NjgyOTI1NiwiaXNzIjoiU0s0MjcxOGQ3NjA4ODc1ZWY5OGMxZTNmMGY3MDJiZDVlNSIsInN1YiI6IkFDM2QyZTRkNmQzZDI1ZTc1MWY2YWJjM2ZiMTZkZjBmNWQifQ.bi2f6V6YRtW0nqqFw8pWt3-pdgTWrE8ThOFIGCRq9w0");
  // Before you use the client, subscribe to the `'initialized'` event.
  client.on('initialized', () => {
    // Use the client.
  })

  // To catch client initialization errors, subscribe to the `'initFailed'` event.
  client.on('initFailed', ({ error }) => {
    // Handle the error.
  });

  useEffect(() => {
    fetch(`http://localhost:5000/auth/user/${userLogged.name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

  }, []);
  const handleConversationSelection = (evt) => {
    setConversationSelectedIndex(+evt.target.id);
    setConversationSelected(conversationData.find((conver) => {
      return conver.conversation_id == listMessagesData.conversations[+evt.target.id].conversation_id
    }));

  }
  return (
    <div className='main-wrapper'>
      <MessagesList 
        onConversationSelected={handleConversationSelection} 
        conversationList={listMessagesData}
        conversationSelectedIndex={conversationSelectedIndex}
      />
      <Conversation 
        employeeId={listMessagesData.employee_id} 
        conversation={conversationSelected}
      />
    </div>
  );
}

export default App;
