import { useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import Nav from './Nav.js';
import Profile from './Profile.js';
import AllHeroes from './AllHeroes.js';
import Login from './Login.js';

function App() {
  // state: track current userName and current view
  const [userName, setUserName] = useState('');
  const [heroName, setHeroName] = useState('');
  const [view, setView] = useState('login');

  async function getData(method, f, data) {
    return await axios({
      method,
      url: `http://localhost:8888/php/api.php?f=${f}&u=${userName}`,
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
  function switchView(view) {
    switch (view) {
      case 'profile':
        return (
          <Profile
            userName={userName}
            heroName={heroName}
            setView={setView}
            getData={getData} />
        )
      case 'allHeroes':
        return (
          <AllHeroes
            userName={userName}
            setHeroName={setHeroName}
            setView={setView}
            getData={getData} />
        )
      default:
        return (
          <Login
            setHeroName={setHeroName}
            setUserName={setUserName}
            setView={setView}
            getData={getData} />
        )
    }
  };

  return (
    <div className="App">
      <Container>
      {/* show the navbar on every page but login */}
      { view !== 'login' &&
        <Nav
          setHeroName={setHeroName}
          userName={userName}
          setUserName={setUserName}
          setView={setView}
          getData={getData}
        />
      }
        {/* switch page according to view state */}
        {switchView(view)}
      </Container>
    </div>
  );
}

export default App;
