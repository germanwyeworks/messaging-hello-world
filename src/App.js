import './App.scss';



import { useEffect, useState } from 'react'
import ClientContainer from './components/ClientContainer';
import Loader from './components/Loader';

function App() {

  
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState("");
  localStorage.setItem("username", "German Alvarez")
  const userLogged = localStorage.getItem('username');

  useEffect(() => {
    fetch(`http://localhost:5000/auth/user/${userLogged}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.token);
        setIsLoading(false);
      });

  }, []);



  return(
    <>
      {
        !isLoading ? <ClientContainer token={token}/> : <Loader/>
      }
    </>
  )
}

export default App;
