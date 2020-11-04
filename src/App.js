import { useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import Login from './Login.js';
import Profile from './Profile.js';

function App() {
  // state: track current user and current view
  const [user, setUser] = useState('');
  const [view, setView] = useState('');

  // function with switch statement to determine what component to render
  // according to the current view
  const switchView = (view) => {
    switch (view) {
      case 'profile':
        return (
          <Profile setView={setView} />
        )
      default:
        return (
          <Login setView={setView} />
        )
    }
  };


  // async function getData() {
  //   console.log('working');
  //   let apiUrl = 'http://localhost:8888/php/api.php?f=get_data&u=123';
  //   return await axios.get(apiUrl)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // }


  return (
    <div className="App">
      <Container>
        {switchView(view)}
        {/* <button onClick={() => getData()}>get data</button> */}
      </Container>
    </div>
  );
}

export default App;
