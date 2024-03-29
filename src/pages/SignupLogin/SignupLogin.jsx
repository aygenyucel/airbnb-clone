import { Button, CloseButton, Form } from "react-bootstrap";
import MainNavbar from "../../components/MainNavbar/MainNavbar"
import './signupLogin.scss'
import LoginPhone from "../../components/LoginPhone/LoginPhone.jsx";
import { useState } from "react";
import LoginEmail from "../../components/LoginEmail/LoginEmail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthorizedAction } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "../../components/CustomTooltip/CustomTooltip";

const SignupLogin = (props) => {

    const navigate = useNavigate();
    const redirectEmailLogin = props.redirectEmailLogin;
    const userData = useSelector(state => state.userReducer?.data);
    const [isAuthorized, setIsAuthorized] = useState(null);
    const dispatch = useDispatch();

    const [isLoginEmail, setIsLoginEmail] = useState(false);
    const [isLoginPhone, setIsLoginPhone] = useState(true);
    const [isLoginApple, setIsLoginApple] = useState(false);
    const [isLoginGoogle, setIsLoginGoogle] = useState(true);

    const [isTooltipLoginEmailOpen, setIsTooltipLoginEmailOpen] = useState(true)


    useEffect(() => {
        //checking if user authorized on first render
        isAuthorizedAction(userData, dispatch)
        .then((boolean) => {
            if(boolean === true) {
                setIsAuthorized(true)
                navigate("/")
            } else {
                setIsAuthorized(false)
            }
        })
        .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setIsLoginEmail(redirectEmailLogin)
    }, [redirectEmailLogin])

    const changeLoginType = (loginType) => {
        if(loginType === "email") {
            setIsLoginApple(false);
            setIsLoginGoogle(false);
            setIsLoginPhone(false);
            setIsLoginEmail(true)
        }
        else if(loginType === "apple") {
            setIsLoginEmail(false)
            setIsLoginGoogle(false);
            setIsLoginPhone(false);
            setIsLoginApple(true);
        }
        else if(loginType === "google") {
            setIsLoginEmail(false)
            setIsLoginApple(false);
            setIsLoginPhone(false);
            setIsLoginGoogle(true);
        }
        else if(loginType === "phone") {
            setIsLoginEmail(false)
            setIsLoginApple(false);
            setIsLoginGoogle(false);
            setIsLoginPhone(true);
        }
    }

    return <> {!isAuthorized && 
            <> 
                <MainNavbar isNavbarMiddleVisible = {false} isTooltipAirbnbOpen = {false}/>
                <div className="fsdf">
                    
                    <div className="signup-login d-flex justify-content-center ">
                        <div className="signup-login-frame">
                        
                                {isLoginPhone && <LoginPhone/>}
                                {isLoginEmail && <LoginEmail/>}
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="other-options-divider me-3"/>
                                    <div style={{fontSize:"0.8rem", marginBlock: "16px"}}>or</div>
                                    <div className="other-options-divider ms-3"/>
                                </div>

                                <div className="other-options d-flex flex-column justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span>
                                            <img className="other-options-logo" src="/assets/facebook-icon.png" alt="facebook logo" />
                                        </span>
                                        <div className="login-option-facebook d-flex justify-content-center align-items-center">
                                            Continue with Facebook
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <span>
                                            <img className="other-options-logo" src="/assets/google-icon.png" alt="google logo" />
                                        </span>
                                        <div className="login-option-google d-flex justify-content-center align-items-center">
                                            Continue with Google
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <span>
                                            <img className="other-options-logo" src="/assets/apple-icon.png" alt="apple logo" />
                                        </span>
                                        <div className="login-option-apple d-flex justify-content-center align-items-center">
                                            Continue with Apple
                                        </div>
                                    </div>
                                        {isLoginPhone && 
                                            <CustomTooltip
                                            open = {isTooltipLoginEmailOpen}
                                            title = {
                                                <div className='d-flex jsutify-content-center align-items-center'>
                                                <div textAlign={'center'} >You can login & signup with custom <u>username</u> from here! </div>
                                                
                                                <div className='d-flex justify-content-end'>
                                                    <CloseButton onClick={() => {setIsTooltipLoginEmailOpen(false)}} />
                                                </div>
                                                
                                                </div>
                                            }
                                            placement="top"
                                            arrow
                                            
                                        >
                                                <div className="d-flex" onClick={() => {changeLoginType("email")}}>
                                                    <span>
                                                        <img className="other-options-logo" src="/assets/email-icon.png" alt="email icon" />
                                                    </span>
                                                    
                                                        <div className="login-option-email d-flex justify-content-center align-items-center" >
                                                            
                                                            Continue with email
                                                            
                                                        </div>
                                                    
                                                </div>
                                            </CustomTooltip>
                                            }
                                        {isLoginEmail && 
                                        
                                            <div className="d-flex" onClick={() => {changeLoginType("phone")}}>
                                                <span>
                                                    <img className="other-options-logo" src="/assets/phone-icon.png" alt="phone icon" />
                                                </span>
                                                <div className="login-option-phone d-flex justify-content-center align-items-center" >
                                                    
                                                    Continue with phone
                                                </div>
                                            </div>
                                        
                                        }
                                        
                                </div>
                        </div>

                    </div>
                </div>
            </>
            }
        </>
}

export default SignupLogin;