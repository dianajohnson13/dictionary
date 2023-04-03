import './App.css';
import DictionaryPage from './components/DictionaryPage';
import ThemeSwitch from './components/ThemeSwitch';
import { useState, useEffect } from 'react';

// const FONTS = {};
function App() {
  const [ word, setWord ] = useState();
  // const [ font, setFont ] = useState();
  const [ theme, setTheme ] = useState('light');

  useEffect(() => {
    window.addEventListener('hashchange',() => {
      const newWord = window.location.href.split("#")[1];
      setWord(newWord);
      window.document.getElementById('searchInput').value = newWord;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  })

  const onSearchWord = (event) => {
    if (event.key === 'Enter') {
      setWord(event.target.value);
      window.location.hash = `#${event.target.value}`;
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
            id="searchInput"
            className="search"
            type="text"
            placeholder="search"
            onKeyDown={onSearchWord}
          />
          <DictionaryPage word={word} />
      </main>
      {/* TO-DO: footer */}
    </div>
  );
}

export default App;
