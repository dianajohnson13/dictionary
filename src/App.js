import './App.css';
import DictionaryPage from './components/DictionaryPage';
import ThemeSwitch from './components/ThemeSwitch';
import { useState } from 'react';

// const FONTS = {};

function App() {
  const [ word, setWord ] = useState(); 

  // const [ font, setFont ] = useState();
  const [ theme, setTheme ] = useState('light');

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setWord(event.target.value);
    }
  }

  const onSwitchTheme = () => {
    if (theme === "light") {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <div className={`App ${theme}`}>
      <header>
        <p>Dictionary</p>
        <div>
          {/* font picker */}
          <ThemeSwitch
              checked={theme === "dark"}
              onToggle={onSwitchTheme}
          />
        </div>
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
