import './App.scss';
import MessagesList from './components/MessagesList';
import Conversation from './components/Conversation';
import listMessagesMock from './resources/listMessagesMock.json';
import conversationJson from './resources/messagesMock.json';

import { useState } from 'react'

function App() {
  const listMessagesData = JSON.parse(JSON.stringify(listMessagesMock));
  const conversationData = JSON.parse(JSON.stringify(conversationJson));

  const [conversationSelected, setConversationSelected] = useState(conversationData[0])
  const [conversationSelectedIndex, setConversationSelectedIndex] = useState(0)

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
