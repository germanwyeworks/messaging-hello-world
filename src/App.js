import './App.scss';



import { useEffect, useState } from 'react'
import Client from './components/ClientContainer';
import Loader from './components/Loader';

function App() {

  
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState("");
  const userLogged = {
    name: "German Alvarez"
  }
  



  
  useEffect(() => {
    fetch(`http://localhost:5000/auth/user/${userLogged.name}`)
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
        !isLoading ? <Client token={token}/> : <Loader/>
      }
    </>
  )
}

export default App;
