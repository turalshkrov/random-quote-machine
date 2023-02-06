import { useEffect, useState } from 'react';
import './App.css';
import themes from './themes.json';

const quoteUrl = 'https://type.fit/api/quotes';
const githubURL = "https://github.com/turalshkrov";
const twitterURL = "https://twitter.com/intent/tweet?text=";

function App() {
  const [ quotes, setQuotes ] = useState(null);
  const rollQuote = Math.floor(Math.random() * 1643);
  const [ random, setRandom ] = useState(rollQuote);
  const newQuote = () => setRandom(rollQuote);
  
  const rollTheme = Math.floor(Math.random() * 10);
  const [ theme, setTheme ] = useState(rollTheme);
  const newTheme = () => setTheme(rollTheme);

  useEffect(() => {
    fetch(quoteUrl)
    .then(res => res.json())
    .then(data => setQuotes(data));
  }, [])

  const tweet = quotes ?
    `${twitterURL}"${quotes[random].text}"${quotes[random].author ?
    " - " + quotes[random].author : ""}`
    : twitterURL;
  return (
    <div className="App" style={{backgroundColor: themes[theme]['bg-color']}}>
      <div className='container'>
        <div id='quote-box'>
          <h2 id='text' style={{color: themes[theme].color}}>
            <i class="fa-sharp fa-solid fa-quote-left"></i>
            {
              quotes 
                ? quotes[random].text 
                : ''
            }
          </h2>
          <p id='author' style={{color: themes[theme].color}}>
            - {
              quotes 
                ? quotes[random].author 
                  ? quotes[random].author 
                  : 'Unknown' 
                : ''
            }
          </p>
          <div id='box-footer'>
            <a style={{backgroundColor: themes[theme].color}}
              id='tweet-quote'
              title='Tweet this quote!'
              target='_blank'
              rel="noreferrer"
              href={tweet}>
              <i class="fa-brands fa-twitter"></i>
            </a>
            <button id='new-quote' style={{backgroundColor: themes[theme]['color']}}
              onClick={() => {newQuote(); newTheme()}}>
              New Quote
            </button>
          </div>
        </div>
        <footer>
        by <a
          target="_blank"
          rel="noreferrer"
          href={githubURL}>
          turalshkrov</a>
      </footer>
      </div>
    </div>
  );
}

export default App;
