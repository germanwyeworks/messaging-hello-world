import { useState, useEffect } from 'react';
import '../styles/components/MessagesList.scss';

const MessagesList = (props) => {
    
    const [newConversationName, setNewConversationName] = useState("");
    const [newConversationTopic, setNewConversationTopic] = useState("");
    const [newConversationPatient, setNewConversationPatient] = useState("");
    const [listOfMessages, setListOfMessages] = useState(props.conversationList);
    useEffect(() => {
        setListOfMessages(props.conversationList)
    
      }, []); 
    const onCreateNewConversation = (event) => {
       event.preventDefault();
        
        props.onCreateNewConversation({
            'user':newConversationName,
            'topic': newConversationTopic,
            'patient': newConversationPatient
        })
        event.target.reset();
    }
    return(
        <div className='list-wrapper'>
            <form className='new-conversation' onSubmit={onCreateNewConversation}>
                <label for="browser">User:</label>
                <input onChange={(e) => setNewConversationName(e.target.value)} list="users" name="browser" id="user"/>
                <datalist id="users">
                    <option value="German Alvarez"/>
                    <option value="Lucas Troncoso"/>
                    <option value="Richard Wilson"/>
                </datalist>

                <label for="browser">Topic:</label>
                <input onChange={(e) => setNewConversationTopic(e.target.value)} list="topics" name="browser" id="topic"/>
                <datalist id="topics">
                    <option value="Referral is pending"/>
                    <option value="Case is pending"/>
                </datalist>

                <label for="browser">Patient:</label>
                <input onChange={(e) => setNewConversationPatient(e.target.value)} list="patients" name="browser" id="patient"/>
                <datalist id="patients">
                    <option value="German Alvarez"/>
                    <option value="Lucas Troncoso"/>
                    <option value="Richard Wilson"/>
                </datalist>
                <input type="submit" value="Create" id='createButton'/>
                
            </form>
            <div className='list'>
                {
                    listOfMessages.conversations.map((conver,index)=>{
                        return (
                            <div className={props.conversationSelectedIndex == index ? 'list-item selected' : 'list-item'} id={index} onClick={props.onConversationSelected}>
                                <b>{conver.conversation_participants.employee.name} ({conver.conversation_participants.employee.provider.name})</b>
                                {conver.last_message}
                                <span><b>Topic:</b> {conver.topic_type}</span>
                                <span><b>Patient:</b> {conver.patient.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default MessagesList;