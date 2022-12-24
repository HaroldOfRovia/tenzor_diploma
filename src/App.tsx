import { useState } from 'react';
import { MainPage } from './components/MainPage/MainPage';
import { SearchPage } from './components/SearchPage/SearchPage';
import searchButton from './images/searchIco.png'


function App() {
  const [content, setContent] = useState(<MainPage/>);
  

  /**
   *  меняет главную старницу на страницу поиска
   */
  function setSearchPage(event: any){
    event.preventDefault();
    
    const form = document.getElementById("formId");
    if(!form)
      return;
    const formData = new FormData(form as HTMLFormElement);
    
    if(formData.get('input') == "")
      return;
    setContent(<SearchPage input={formData.get('input') as string}/>);
  }

  /**
   * устанавливает главную страницу
   */
  function home(){
    setContent(<MainPage/>);
  }

  return (
   <div className='app'>
     <header className="header">
       <form id='formId' className="search-field-container" onSubmit={setSearchPage}>
         <input className="search-field" name='input'/>
         <div className='link' onClick={setSearchPage}>
           <img src={searchButton} className="search-button" alt="search"/>
         </div>
       </form>
       <img src='https://www.last.fm/static/images/logo_static@2x.11f9df44aefc.png' onClick={home} className="header-logo link" alt="Last.fm"/>
       <nav className='header-right'>
         <div className='header-navigation'>
             <ul className='navigation-list'>
             <li><div className='link nav-item' onClick={home}>Home</div></li>
             <li><div className='link nav-item'>Live</div></li>
             <li><div className='link nav-item'>Music</div></li>
             <li><div className='link nav-item'>Charts</div></li>
             <li><div className='link nav-item'>Events</div></li>
             <li><div className='link nav-item'>Features</div></li>
             <li><div className='user link nav-item'></div></li>
             </ul>
         </div>
       </nav>
     </header>
     { content }
     <footer className='footer'>
       <ul className='navigation-footer'>
         <li className='nav-footer-topic'><div className='bold-font'>COMPANY</div></li>
         <li className='nav-footer-item'><div className='link'>About Last.fm</div></li>
         <li className='nav-footer-item'><div className='link'>Contact Us</div></li>
         <li className='nav-footer-item'><div className='link'>Jobs</div></li>
       </ul>
       <ul className='navigation-footer'>
           <li className='nav-footer-topic'><div className='bold-font'>HELP</div></li>
           <li className='nav-footer-item'><div className='link'>Track My Music</div></li>
           <li className='nav-footer-item'><div className='link'>Community Support</div></li>
           <li className='nav-footer-item'><div className='link'>Community Guidelines</div></li>
           <li className='nav-footer-item'><div className='link'>Help</div></li>
       </ul>
       <ul className='navigation-footer'>
           <li className='nav-footer-topic'><div className='bold-font'>HOME</div></li>
           <li className='nav-footer-item'><div className='link'>It's a pity</div></li>
           <li className='nav-footer-item'><div className='link'>That you</div></li>
           <li className='nav-footer-item'><div className='link'>Didn't like</div></li>
           <li className='nav-footer-item'><div className='link'>The joke</div></li>
       </ul>
       <ul className='navigation-footer'>
           <li className='nav-footer-topic'><div className='bold-font'>GOODIES</div></li>
           <li className='nav-footer-item'><div className='link'>Download Scrobbler</div></li>
           <li className='nav-footer-item'><div className='link'>Developer API</div></li>
           <li className='nav-footer-item'><div className='link'>Free Music Downloads</div></li>
           <li className='nav-footer-item'><div className='link'>Merchandise</div></li>
       </ul>
     </footer>
   </div>
  )
}

export default App;
