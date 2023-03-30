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
      <main>
          <input
            className="search"
            type="text"
            placeholder="search"
            onKeyDown={handleSearch}
          />
          <DictionaryPage word={word} />
      </main>
      {/* TO-DO: footer */}
    </div>
  );
}

export default App;
