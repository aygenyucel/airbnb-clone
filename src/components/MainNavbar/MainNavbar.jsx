import { useEffect, useState } from 'react';
import './mainNavbar.scss';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthorizedAction } from '../../redux/actions';

const MainNavbar = (props) => {

  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const [isNavbarMiddleVisible, setIsNavbarMiddleVisible] = useState(true)
  const [clickedOutside, setClickedOutside] = useState(false);

  const myRef = useRef();

  const dispatch = useDispatch();
  const JWTToken = localStorage.getItem("JWTToken");
  const userData = useSelector(state => state.userReducer?.data);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    //check if user authorized
    isAuthorizedAction(userData, JWTToken, dispatch)
    .then((boolean) => {
      if(boolean === true) {
        setIsAuthorized(true)
      }
      else {
        setIsAuthorized(false)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickOutside = e => {
    if (!myRef?.current?.contains(e.target)) {
        setClickedOutside(true);
        setIsProfileClicked(false)
    }
  };
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
  }, [isProfileClicked])

  const handleClickInside = () => {
    setClickedOutside(false)
    if(isProfileClicked) {
      setIsProfileClicked(false)
    } else {
      setIsProfileClicked(true)
    }
  };


  useEffect(() => {
    if(props.isNavbarMiddleVisible !== undefined) {
      setIsNavbarMiddleVisible(props.isNavbarMiddleVisible)
    }
    }, [props.isNavbarMiddleVisible])

  const logOut = () => {
    if(JWTToken){
      localStorage.removeItem("JWTToken")
    }
  }

  return (
      <div className="mainNavbar">
        <div className='row d-flex align-items-center justify-content-between'>
          <div className='col-1 col-lg-4 d-flex align-items-center justify-content-start'>
            <a href="/" className="logo">
              <div className='d-flex align-items-center'>
                  <img className="airbnb-logo" src="/assets/airbnb_logo.png" alt="airbnb logo" />
                  <div className='airbnb-logo-text'>airbnb</div>
              </div>
            </a>
          </div>
          <div className='col col-lg-4 d-flex mainNavbar-middle-div'>
            {isNavbarMiddleVisible && 
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
            }
          </div>
          <div className='col col-lg-4 col-sm-4 d-flex justify-content-end'>
            <div className='mainNavbar-right'>
              <div className='link-airbnbYourHome d-flex align-items-center justify-content-center'>Airbnb your home</div>
              <div className='link-language d-flex align-items-center justify-content-center'> <img className='world-icon' src="/assets/world-icon.png" alt="world icon" /></div>
              <div className='profile d-flex align-items-center justify-content-center' onClick={handleClickInside}>
                <div className='d-flex align-items-center justify-content-center'><img  className='burger-menu-icon' src="/assets/burger-menu-icon.png" alt="menu icon" /> </div>
                <div className='d-flex align-items-center justify-content-center'><img className='profile-picture' src="/assets/profile-placeholder.jpg" alt="profile placeholder" /></div> 

                
                {isProfileClicked ?
                <>
                  {isAuthorized ? 
                  // if user already logged in 
                  <div className='profile-dropdown-menu d-flex flex-column align-items-start' ref={myRef}>
                    <a href="">
                      <div><b>Messages</b></div>
                    </a>
                    <a href="">
                      <div><b>Notifications</b></div>
                    </a>
                    <a href="">
                      <div><b>Trips</b></div>
                    </a>
                    <a href="">
                      <div><b>Wishlists</b></div>
                    </a>
                    <div className='profile-dropdown-menu-divider'></div>
                    <a href="">
                      <div>Manage listings</div>
                    </a>
                    <a href="">
                      <div>Refer a Host</div>
                    </a>
                    <a href="">
                      <div>Account</div>
                    </a>
                    <div className='profile-dropdown-menu-divider'></div>
                    <a href="">
                      <div>Help</div>
                    </a>
                    <a href="" onClick={() => {logOut()}}>
                      <div>Log out</div>
                    </a>
                  </div>
                  : 
                  <div className='profile-dropdown-menu d-flex flex-column align-items-start' ref={myRef}>
                    <a href="/signup_login">
                      <div className='link-signup'>Sign up</div>
                    </a>
                    <a href='/signup_login'>
                      <div className='link-login'>Log in</div>
                    </a>
                    <div className='profile-dropdown-menu-divider'></div>
                    <a href="">
                      <div>Airbnb your home</div>
                    </a>
                    <a href="">
                      <div>Help</div>
                    </a>
                  </div>}
              </>
                : <div ref={myRef}></div>}
                
                
              </div>
              </div>

            </div>
          </div>
        </div>
  )
}

export default MainNavbar;