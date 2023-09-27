import React, { useEffect, useState } from 'react';

import './mainNavbar.scss';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthorizedAction } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from 'react-bootstrap';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
const MainNavbar = (props) => {

  const [isProfileClicked, setIsProfileClicked] = useState(false)
  const [isNavbarMiddleVisible, setIsNavbarMiddleVisible] = useState(true)
  const [clickedOutside, setClickedOutside] = useState(false);

  const [padding, setPadding] = useState(null)
  const myRef = useRef();
  const userData = useSelector(state => state.userReducer?.data);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isTooltipAirbnbOpen, setIsTooltipAirbnbOpen] = useState(false)
  const [isTooltipWelcomeOpen, setIsTooltipWelcomeOpen] = useState(false)
  const [isTooltipWelcome2Open, setIsTooltipWelcome2Open] = useState(false)

  useEffect(() => {
    //check if user authorized
    isAuthorizedAction(userData, dispatch)
    .then((boolean) => {
      if(boolean === true) {
        setIsAuthorized(true)

        //if its home page, show only airbnb tooltip

        if(props.isHomePage){
          setIsTooltipWelcomeOpen(false)
          setIsTooltipAirbnbOpen(true)
        }
        
      }
      else {
        setIsAuthorized(false)

        //if its home page, show welcome tooltips
        if(props.isHomePage){
          setIsTooltipWelcomeOpen(true)
        }
        
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if(props.isHomePage && isAuthorized) {
  //       setIsTooltipWelcomeOpen(false)
  //       setIsTooltipAirbnbOpen(true)
  //   }
  //   else if(props.isHomePage && !isAuthorized) {
  //     setIsTooltipWelcomeOpen(true)
  //   }
  // }, [isAuthorized])

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
      setIsTooltipAirbnbOpen(false)
    }
  };


  useEffect(() => {
    if(props.isNavbarMiddleVisible !== undefined) {
      setIsNavbarMiddleVisible(props.isNavbarMiddleVisible)
    }
    }, [props.isNavbarMiddleVisible])

    useEffect(() => {
      if(props.isTooltipAirbnbOpen === false) {
        setIsTooltipAirbnbOpen(false)
      }
      }, [props.isTooltipAirbnbOpen])

  useEffect(() => {
    if(props.padding !== undefined ) {
      setPadding(props.padding)
    }
  }, [props.padding])



  const logOut = () => {
    const JWTToken = localStorage.getItem("JWTToken");
    if(JWTToken){
      localStorage.removeItem("JWTToken")
    }
  }


  return (
      <div className="mainNavbar" style={padding && {paddingLeft: padding, paddingRight: padding}}>
        <CustomTooltip
            open= {isTooltipWelcomeOpen}
            title= {
                <div className="d-flex align-items-center">
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                            <div textAlign={'center'} className="mb-2" >Welcome to clone of the airbnb website!</div>                        
                        </div>
                    <div className='d-flex justify-content-end'>
                    <CloseButton onClick={() => {setIsTooltipWelcomeOpen(false); setIsTooltipWelcome2Open(true)}} />
                </div>
                </div>}
                placement='top'/>
                
            
            <CustomTooltip
            open= {isTooltipWelcome2Open}
            title= {
                <div className="d-flex align-items-center">
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                            <div>You can create fake account with custom username and create & share fake places. Have fun!</div>
                        
                        </div>
                    <div className='d-flex justify-content-end'>
                    <CloseButton onClick={() => {setIsTooltipWelcome2Open(false); setIsTooltipAirbnbOpen(true)}}  />
                </div>
                </div>}
                placement='top'/>
                
            
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
              {/* {isAuthorized ?
              <div className='link-switchToHosting d-flex align-items-center justify-content-center'>Switch to hosting</div> 
              :
              <div className='link-airbnbYourHome d-flex align-items-center justify-content-center'>Airbnb your home</div> 
              } */}
              <a href='/become-a-host'>
              <CustomTooltip
                open= {isTooltipAirbnbOpen}
                title={
                  <div className='d-flex jsutify-content-center align-items-center'>
                     <div textAlign={'center'} >You can add a fake airbnb place in seconds!</div>
                    
                    <div className='d-flex justify-content-end'>
                      <CloseButton onClick={() => {setIsTooltipAirbnbOpen(false)}} />
                    </div>
                    
                  </div>
                }
                arrow
              >
                {/* <Tooltip open= {true} title="you can create new place for airbnb here"> */}
                  <div className='link-airbnbYourHome d-flex align-items-center justify-content-center'>Airbnb your home</div> 
                {/* </Tooltip> */}
                </CustomTooltip>
              </a>

              <div className='link-language d-flex align-items-center justify-content-center'> <img className='world-icon' src="/assets/world-icon.png" alt="world icon" /></div>
              <div className='profile d-flex align-items-center justify-content-center' onClick={handleClickInside}>
                <div className='d-flex align-items-center justify-content-center'><img  className='burger-menu-icon' src="/assets/burger-menu-icon.png" alt="menu icon" /> </div>
                {isAuthorized ? 
                <div className='d-flex align-items-center justify-content-center profile-picture'>{(userData.name)[0].toUpperCase()}</div> 
                :
                <div className='d-flex align-items-center justify-content-center'><img className='profile-picture' src="/assets/profile-placeholder.jpg" alt="profile placeholder" /></div> 
                }

                
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
                    <a href="/become-a-host">
                        <div>Airbnb your home</div>
                    </a>
                    <a href="">
                      <div>Refer a Host</div>
                    </a>
                    <a href="">
                      <div onClick={() => navigate("/account-settings")}>Account</div>
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