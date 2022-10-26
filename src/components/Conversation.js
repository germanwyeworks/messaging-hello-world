import '../styles/components/Conversation.scss';
import conversationJson from '../resources/messagesMock.json';
import { useEffect,useState } from 'react';

const Conversation = (props) => {
    const [conversationSelected, setConversationSelected] = useState(props.conversation)
    const [employeeId, setEmployeeId] = useState(props.employeeId)

    useEffect(() => {
        setConversationSelected(props.conversation);
    });
    
    return (
        <div className='conversation'>
            <div className='conversation-header'>
                <b className='conversation-name'>{conversationSelected.conversation_participants.employee.name} ({conversationSelected.conversation_participants.employee.provider.name})</b>
                <span className='conversation-data'><span><b>Client:</b> {conversationSelected.patient.name}</span> | <span><b>Topic:</b> {conversationSelected.topic_type}</span> | <a href='#'>Link</a></span>
            </div>
            <div className='conversation-body'>
                <div className='conversation-body-container'>
                    {
                        conversationSelected.messages.map(msgObj => {
                            return msgObj.sender.id === employeeId ? 
                                <div className='conversation-body-container-message send'>
                                    <span className='date'>{new Date(msgObj.date_created).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</span>
                                    <span className='text'>{msgObj.body}</span>
                                </div> : 
                                <div className='conversation-body-container-message received'>
                                    <span className='text'>{msgObj.body}</span>
                                    <span className='date'>{new Date(msgObj.date_created).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</span>
                                </div>
                        })
                    }
                </div>
                <div className='conversation-body-sender'>
                    <textarea rows="5" cols="50"></textarea>
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Conversation;