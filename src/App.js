import './App.scss';


import { Client } from '@twilio/conversations';

import { useEffect, useState } from 'react'
import MessagesList from './components/MessagesList';
import Conversation from './components/Conversation';
import Loader from './components/Loader';
import conversationJson from './resources/messagesMock.json';

function App() {
  const conversationData = JSON.parse(JSON.stringify(conversationJson));

  const [client, setClient] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState("");
  const [conversationSelected, setConversationSelected] = useState(conversationData[0]);
  const [listOfMessages, setListOfMessages] = useState();
  const [conversationSelectedIndex, setConversationSelectedIndex] = useState(0);


  localStorage.setItem("username", "Lucas");
  const userLogged = localStorage.getItem('username');
  useEffect(() => {
    fetch(`http://localhost:5000/auth/user/${userLogged}`)
      .then((response) => response.json())
      .then((data) => {
        const client = new Client(data.token);
        setClient(client);
        setToken(data.token);
        setListOfMessages(getSubscribedConversations(client));
        setIsLoading(false);
      });

  }, []);


  const createNewConversation = (info) => {
    console.log(info);
    client.createConversation().then((data)=>{
      const conversation = data;
      conversation.add(info.user,{
        'topic': info.topic,
        'patientName': info.patient
      }).then((result) => {
        const attributes = JSON.parse(result.attributes);
        /*
        listMessagesData.conversations.push(
            {
              "conversation_participants": {
                  "employee": {
                      "id": 1,
                      "name": result.identity,
                      "provider": {
                          "id": 2,
                          "name": "Unite US Healthcare"
                      }
                  }
              },
              "is_favourite": false,
              "conversation_id": result.sid,
              "topic_id": 2,
              "topic_type": attributes.topic,
              "last_message": result.date_updated,
              "patient": {
                  "id": 2,
                  "name": attributes.patientName
              }
          }
        )
        */
        //setListOfMessages(listMessagesData)
        console.log(listOfMessages);
      })
    })
  }

  const getSubscribedConversations = async(
    client
  ) => {
    let subscribedConversations = await client.getSubscribedConversations();
    let conversations = subscribedConversations.items;
    
    while (subscribedConversations.hasNextPage) {
      subscribedConversations = await subscribedConversations.nextPage();
      conversations = [...conversations, ...subscribedConversations.items];
    }
    
    console.log(conversations);
    console.log(conversations[2].lastMessage);
    return conversations;
  }

  const handleConversationSelection = (evt) => {
    setConversationSelectedIndex(+evt.target.id);
    setConversationSelected(conversationData.find((conver) => {
      return conver.conversation_id == listOfMessages.conversations[+evt.target.id].conversation_id
    }));

  }
  return(
    <>
      {
        isLoading ? 
        <Loader/> :
        <div className='main-wrapper'>
          <MessagesList
            onConversationSelected={handleConversationSelection}
            conversationList={listOfMessages}
            conversationSelectedIndex={conversationSelectedIndex}
            onCreateNewConversation={(data)=> createNewConversation(data)}
          />
          <Conversation
            employeeId={listOfMessages.employee_id}
            conversation={conversationSelected}
          />
        </div>
      }
    </>
  )
}

export default App;
