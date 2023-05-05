import { useState } from 'react';
import './mainNavbar.scss';

const MainNavbar = () => {

  const [isProfileClicked, setIsProfileClicked] = useState(false)

  const showProfileDropdown = () => {
    if(isProfileClicked) {
      setIsProfileClicked(false)
    } else {
      setIsProfileClicked(true)
    }
  }

  return (
      <div className="mainNavbar">
        <div className='row d-flex align-items-center justify-content-between'>
          <div className='col-4 d-flex align-items-center justify-content-start'>
            <a href="/" className="logo">
              <div className='d-flex align-items-center'>
                  <img className="airbnb-logo" src="/assets/airbnb_logo.png" alt="airbnb logo" />
                  <div className='airbnb-logo-text'>airbnb</div>
              </div>
            </a>
          </div>
          <div className='col-4 d-flex align-items-center justify-content-center'>
            <div className='mainNavbar-middle d-flex align-items-center'>
              <div className='mainNavbar-middle-link link-anywhere'>Anywhere</div>
              <div className='mainNavbar-middle-divider'/>
              <div className='mainNavbar-middle-link link-anyweek'>Any Week</div>
              <div className='mainNavbar-middle-divider'/>

              <div className='mainNavbar-middle-link link-addguests'>Add Guests</div>
              <div className='mainNavbar-search d-flex align-items-center justify-content-center'>
                <img src="/assets/search-icon.svg" alt="search icon"/>
              </div>
            </div>
          </div>
          <div className='col-4 d-flex justify-content-end'>
            <div className='mainNavbar-right d-flex align-items-center'>
              <div className='link-airbnbYourHome d-flex align-items-center justify-content-center'>Airbnb your home</div>
              <div className='link-language d-flex align-items-center justify-content-center'> <img className='world-icon' src="/assets/world-icon.png" alt="world icon" /></div>
              <div className='profile d-flex align-items-center justify-content-center' onClick={showProfileDropdown}>
                <div className='d-flex align-items-center justify-content-center'><img  className='burger-menu-icon' src="/assets/burger-menu-icon.png" alt="menu icon" /> </div>
                <div className='d-flex align-items-center justify-content-center'><img className='profile-picture' src="/assets/profile-placeholder.jpg" alt="profile placeholder" /></div> 

                {isProfileClicked && 
                <div className='profile-dropdown-menu d-flex flex-column align-items-start'>
                  <div>Sign up</div>
                  <div>Log in</div>
                  <div className='profile-dropdown-menu-divider'></div>
                  <div>Airbnb your home</div>
                  <div>Help</div>
                </div>
                }
                
              </div>
              </div>

            </div>
          </div>
        </div>
  )
}

export default MainNavbar;