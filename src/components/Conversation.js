import '../styles/components/Conversation.scss';
import conversationJson from '../resources/messagesMock.json';
const Conversation = () => {
    console.log(conversationJson);
    const employeeId = 2;
    return (
        <div className='conversation'>
            <div className='conversation-header'>
                <b className='conversation-name'>Richard Wilson (Unite Us Healthcare)</b>
                <span className='conversation-data'><span><b>Client:</b> German Alvarez</span> | <span><b>Topic:</b> case</span> | <a href='#'>Link</a></span>
            </div>
            <div className='conversation-body'>
                {
                    conversationJson.messages.map(msgObj => {
                        return msgObj.sender.id === employeeId ? <div className='conversation-body-message send'><span className='date'>{new Date(msgObj.date_created).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</span><span className='text'>{msgObj.body}</span></div> : <div className='conversation-body-message received'><span className='text'>{msgObj.body}</span><span className='date'>{new Date(msgObj.date_created).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</span></div>
                    })
                }
            </div>
        </div>
    );
}

export default Conversation;