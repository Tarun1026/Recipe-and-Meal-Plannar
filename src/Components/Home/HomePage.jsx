import React from 'react';
import './HomePage.css';
import SideBar from '../SideHomePage/SideBar';
import SearchBar from '../Navbar/SearchBar';
import ReportShow from '../Report/ReportShow';

const HomePage = () => {
  return (
    <div className='divs'> 
      <div className='firstDiv'>  
        <SideBar />
      </div>   
      <div className='middleDiv'>
        <SearchBar />
      </div>
      <div className='lastDiv'>
        <ReportShow />
      </div>
    </div>
  );
}

export default HomePage;
