import './App.scss';
import MessagesList from './components/MessagesList';
import Conversation from './components/Conversation';

function App() {
  return (
    <div className='main-wrapper'>
      <MessagesList/>
      <Conversation/>
    </div>
  );
}

export default App;
