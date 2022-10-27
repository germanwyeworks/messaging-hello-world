import { Client } from '@twilio/conversations';
import MessagesList from './MessagesList';
import Conversation from './Conversation';
import listMessagesMock from '../resources/listMessagesMock.json';
import conversationJson from '../resources/messagesMock.json';
import { useEffect, useState } from 'react'

const ClientContainer = (props) => {
  const listMessagesData = JSON.parse(JSON.stringify(listMessagesMock));
  const conversationData = JSON.parse(JSON.stringify(conversationJson));

  const [conversationSelected, setConversationSelected] = useState(conversationData[0]);
  const [conversationSelectedIndex, setConversationSelectedIndex] = useState(0);

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const client = new Client(props.token)
  // Before you use the client, subscribe to the `'initialized'` event.
  client.on('initialized', () => {
    // Use the client.
  });

  // To catch client initialization errors, subscribe to the `'initFailed'` event.
  client.on('initFailed', ({ error }) => {
    // Handle the error.
  });
  /*
  Fired when the client joins a conversation.
  */
  client.on("conversationJoined", (conversation) => {
    console.log(conversation);
    conversation.on("typingStarted", (participant) => {
      console.log(participant);
    });
  });
  /*
  Fired when a conversation becomes visible to the client. 
  The event is also triggered when the client creates a new conversation.
  */
  client.on("conversationAdded", (conversation) => {
    console.log(conversation);
    conversation.on("typingStarted", (participant) => {
      console.log(participant);
    });
  });
  client.on("tokenAboutToExpire", () => {
    if (username && password) {
      //log back again
    }
  });
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

export default ClientContainer;