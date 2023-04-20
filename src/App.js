import './App.css';
import DictionaryPage from './components/DictionaryPage';
import ThemeSwitch from './components/ThemeSwitch';
import FontSelector from './components/FontSelector';
import { useState, useEffect } from 'react';

export const FONTS = {
  "sans serif": "sans-serif",
  "serif": "serif",
  "mono": "monospace"
};

function App() {
  const [ word, setWord ] = useState();
  const [ font, setFont ] = useState('sans serif');
  const [ theme, setTheme ] = useState('light');

  useEffect(() => {
    window.addEventListener('hashchange',() => {
      // TO-DO: Handle multiple words in URL
      const newWord = window.location.href.split("#")[1];
      setWord(newWord);
      window.document.getElementById('searchInput').value = newWord;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  })

  const onSearchWord = (event) => {
    if (event.key === 'Enter') {
      setWord(event.target.value);
     // TO-DO: Handle multiple words in URL
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

  const onSelectFont = (font) => {
    setFont(font);
  }

  return (
    <div className={`App ${theme}`} style={{fontFamily: FONTS[font]}}>
      <header>
        <p>Dictionary</p>
        <div className='header-left'>
          <FontSelector
            selected={font}
            options={FONTS}
            onSelect={onSelectFont}
          />
          <hr aria-hidden/>
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
