import '../styles/components/MessagesList.scss';
import listMessagesMock from '../resources/listMessagesMock.json';

const MessagesList = () => {
    const listMessagesData = JSON.parse(JSON.stringify(listMessagesMock));
    console.log(listMessagesData);
    return(
        <div className='list'>
            {
                listMessagesData.conversations.map((conver)=>{
                    return (
                        <div className='list-item'>
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