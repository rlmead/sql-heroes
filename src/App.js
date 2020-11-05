import { useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import Login from './Login.js';
import Profile from './Profile.js';

function App() {
  // state: track current user and current view
  const [user, setUser] = useState('');
  const [view, setView] = useState('');

  async function getData(method, f, data) {
    return await axios({
      method,
      url: `http://localhost:8888/php/api.php?f=${f}&u=123`,
      data: JSON.stringify(data)
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }


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
          <Login setView={setView} getData={getData}/>
        )
    }
  };

  return (
    <div className="App">
      <Container>
        {switchView(view)}
      </Container>
    </div>
  );
}

export default App;
