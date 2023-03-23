import './App.css';
import DictionaryPage from './components/DictionaryPage';
import { useState } from 'react';

function App() {
  const [ word, setWord ] = useState(); 

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setWord(event.target.value);
    }
  }

  return (
    <div className="App">
      <header>
        <p>Dictionary</p>
      </header>
      <div class="main-content">
          <input type="text" placeholder='search' onKeyDown={handleSearch}/>
          <DictionaryPage word={word} />
      </div>
      {/* TO-DO: footer */}
    </div>
  );
}

export default App;
