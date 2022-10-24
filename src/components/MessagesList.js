import '../styles/components/MessagesList.scss';

const MessagesList = (props) => {
    
    return(
        <div className='list'>
            {
                props.conversationList.conversations.map((conver,index)=>{
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
    )
}

export default MessagesList;