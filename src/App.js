import axios from 'axios';
import './App.css';

function App() {

  async function getData() {
    console.log('working');
    let apiUrl = 'http://localhost:8888/php/api.php?f=get_data&u=123';
    return await axios.get(apiUrl)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }


  return (
    <div className="App">
    <button onClick={() => getData()}>get data</button>
    </div>
  );
}

export default App;
