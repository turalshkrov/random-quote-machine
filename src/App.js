import { useEffect, useState } from 'react';
import './App.css';
import themes from './themes.json';

const quoteUrl = 'https://api.api-ninjas.com/v1/quotes';
const apiKey = '2kZRirHHrokYP0dI3wcQWw==bEqlrnXSKyQAoK0M';
const githubURL = "https://github.com/turalshkrov";
const twitterURL = "https://twitter.com/intent/tweet?text=";

function App() {
  const [ quote, setQuote ] = useState(null)
  
  const rollTheme = Math.floor(Math.random() * 10);
  const [ theme, setTheme ] = useState(rollTheme);
  const newTheme = () => setTheme(rollTheme);
  const [ newQuote, setNewQuote ] = useState(null)

  useEffect(() => {
    fetch(quoteUrl,{
      headers: {
        'X-Api-Key': apiKey
      }
    })
    .then(res => res.json())
    .then(data => {
      setQuote(data[0]);
    })
  }, [newQuote])

  const tweet = quote ?
    `${twitterURL}"${quote.quote}"${quote.author ?
    " - " + quote.author : ""}`
    : twitterURL;
  
  return (
    <div className="App" style={{backgroundColor: themes[theme]['bg-color']}}>
      <div className='container'>
        <div id='quote-box'>
          <h2 id='text' style={{color: themes[theme].color}}>
            <i className="fa-sharp fa-solid fa-quote-left"></i>
            {
              quote
                ? quote.quote
                : ''
            }
          </h2>
          <p id='author' style={{color: themes[theme].color}}>
            - {
              quote
                ? quote.author
                  ? quote.author
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
              <i className="fa-brands fa-twitter"></i>
            </a>
            <button id='new-quote' style={{backgroundColor: themes[theme]['color']}}
              onClick={() => {setNewQuote(Math.random()); newTheme()}}>
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
