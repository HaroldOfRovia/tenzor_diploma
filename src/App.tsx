import React from 'react';
import { mainPage } from "./mainPage"
import { searchPage } from "./searchPage"
import lastfmLogo from './images/Last.fm-Logo.wine.svg';
import searchIco from './images/searchIco.png';


function getContent() {
  switch (window.location.href) {
    case "http://localhost:3000/search":
      return searchPage();
    default: 
      return mainPage();
  } 
}

function App() {

   return (
    <>
      <header className="header">
        <img src={lastfmLogo} className="header-logo" alt="Last.fm"/>
        <nav className='header-right'>
          <div className='header-navigation'>
              <ul className='navigation-list'>
              <li><a href='/search' className='link nav-item'><img src={searchIco} className="search-button" alt="search"/></a></li>
              <li><a href='/' className='link nav-item'>Home</a></li>
              <li><a href='/' className='link nav-item'>Live</a></li>
              <li><a href='/' className='link nav-item'>Music</a></li>
              <li><a href='/' className='link nav-item'>Charts</a></li>
              <li><a href='/' className='link nav-item'>Events</a></li>
              <li><a href='/' className='link nav-item'>Features</a></li>
              <li><a href='/' className='user link nav-item'/></li>
              </ul>
          </div>
        </nav>
      </header>
      { getContent() }
      <footer className='footer'>
        <div className="footer-text">
        Тут что-то должно быть, потому вот анекдот. <br/><br/>
        В дом к грузину забрались воры. Попали в подвал, а там бочки с вином.
        Выпили. "Давай еще немного выпьем, и тихо-тихо попоем." Попели. 
        "Давай еще немного выпьем, и тихо-тихо потанцуем." Потанцевали. 
        "Давай еще немного выпьем и тихо-тихо постреляем." Постреляли. 
        Входит хозяин:"Вах! Вах! Вах! В доме гости, а я сплю!"
        </div>
      </footer>
    </>
   )
}

export default App;
