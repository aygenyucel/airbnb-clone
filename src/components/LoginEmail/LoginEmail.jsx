import { Form } from "react-bootstrap";
import "./loginEmail.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailExistAction, signupLoginEmailAction } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from 'moment';


const LoginEmail = () => {
    const [isEmailExist, setIsEmailExist] = useState(true);

    //if user trying to continue with existed email while signup, redirect user to login with email component
    const [isRedirectFromSignup, setIsRedirectFromSignup] = useState(false)
    const [isContinueClicked, setIsContinueClicked] = useState(false);
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState(null)
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkEmailAndSubmit = (event) => {
        // setIsContinueClicked(true)
        event.preventDefault();
        // console.log("xxxxxxxxx", email)

        if(email === "") {
            console.log("email required!!")
        } else {

            checkEmailExistAction(email)
            .then(email => {
                if(email !== null){
                    setIsEmailExist(true)
                    setIsContinueClicked(true)
                }
                else {
                    setIsEmailExist(false)
                    setIsContinueClicked(true)
                }
            })
            .catch(error => {
                console.log(error)
            });
        }
        
    }

    const signupSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: firstName,
            surname: lastName,
            email: email,
            birthDate: birthDate,
            password: password
        }

        //if user at least 18 years old, check email and save 
        if(birthdayValidation(birthDate)) {
            checkEmailExistAction(email).then(email => {
                if(email === null) {
                    signupLoginEmailAction(newUser)
                    .then(({dispatchAction1, dispatchAction2}) => {
                        dispatch(dispatchAction1, dispatchAction2)
                        })
                    .then(() => navigate("/"))
                    .catch((error) => console.log(error))
                }
                
                else {
                    setIsEmailExist(true);
                    setIsRedirectFromSignup(true)
                    navigate("/signup_login", {state:{redirectEmailLogin: true}})
                }
            })
        } else {
            console.log("invalid birthday")
        }
            
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        }

        signupLoginEmailAction(user)
        .then(({dispatchAction1, dispatchAction2}) => {
            dispatch(dispatchAction1, dispatchAction2)
            })
        .then(() => navigate("/"))
        .catch((error) => console.log(error))
    }

    function birthdayValidation(birthday) {
        const newBirthDate = new Date(birthday);
        const diff = Date.now() - newBirthDate.getTime();
        const ageDate = new Date(diff);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log("age", age)
        return age > 18;
      }

    return (
        <>
                        <div className="signup-login-header">
                            {isContinueClicked ? <>{isEmailExist ? <>{isRedirectFromSignup ? "Account Exists" : "Log in"}</> : "Finish signing up"}</> : "Log in or sign up"}
                        </div>
                        <div className="horizontal-divider"/>
                       
                        {isContinueClicked ? 
                        <>
                            {isEmailExist ?
                            <>
                                
                                    <div className="signup-login-main">
                                        {isRedirectFromSignup &&
                                        <div className="d-flex flex-column justify-content-center account-exist"> 
                                            <div className="mb-3">Looks like you already have an account. Please log in instead.</div>
                                            <div>{email}</div>
                                        </div> }
                                        <Form onSubmit={loginSubmit}>
                                            <div className="login-email-form">
                                                    <Form.Group className="px-3 form-group-email d-flex flex-column justify-content-center">
                                                        <div className="input-password-header form-header d-flex justify-content-start">Password</div>
                                                        
                                                        <Form.Control className="input-password form-input shadow-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                                    </Form.Group>
                                            </div>
                                            <button className="signup-login-button form-button login-button-email" type="submit">
                                                Login
                                            </button>
                                        </Form>
                                    </div>
                            </>
                            :
                            <>
                                    <div className="signup-login-main">
                                            <Form onSubmit={signupSubmit}>
                                                <div className="signup-email-form">
                                                    <div className="d-flex flex-column justify-content-start align-items-start">
                                                        <div className="form-group-div">
                                                            <Form.Group className="px-3 form-group form-group-name d-flex flex-column justify-content-center">                                                    
                                                                <div className="input-firstname-header form-header d-flex justify-content-start">First name</div>

                                                                <Form.Control className="input-firstname form-input shadow-none" type="text" placeholder="First name" onChange={(e) => {setFirstName(e.target.value)}} required/>

                                                            
                                                            </Form.Group>
                                                            <div className="form-divider" />
                                                            <Form.Group className="px-3 form-group form-group-lastname d-flex flex-column justify-content-center">                                                    
                                                                <div className="input-lastname-header form-header d-flex justify-content-start">Last name</div>

                                                                <Form.Control className="input-lastname form-input shadow-none" type="text" placeholder="Last name" onChange={(e) => {setLastName(e.target.value)}} required />
                                                            </Form.Group>
                                                        </div>
                                                        <div className="input-explanation">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</div>
                                                        
                                                        <div className="form-group-div">
                                                            <Form.Group className="px-3 form-group form-group-birthdate d-flex flex-column justify-content-center">                                                    
                                                                <div className="input-birthdate-header form-header d-flex justify-content-start">Birthdate</div>
                                                                <Form.Control 
                                                                    className="input-lastname form-input shadow-none" 
                                                                    type="date" 
                                                                    placeholder="Birthdate" 
                                                                    onChange={(e) => {
                                                                        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
                                                                        setBirthDate(newDate)
                                                                    }} 
                                                                    required
                                                                />
                                                            </Form.Group>
                                                           
                                                        </div>
                                                        <div className="input-explanation" style={{color: !birthdayValidation(birthDate)&&"red"}}>To sign up, you need to be at least 18. Your Birthday won't be shared with other people who use Airbnb Clone.</div>
                                                        <div className="form-group-div">
                                                            <Form.Group className="px-3 form-group form-group-email d-flex flex-column justify-content-center">
                                                                <div className="input-email-header form-header d-flex justify-content-start">Username</div>
                                                                
                                                                <Form.Control className="input-email form-input shadow-none" type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                                
                                                            </Form.Group>
                                                            
                                                        </div>
                                                        <div className="input-explanation">Consectetur adipiscing elit, sed do eiusmod tempor.</div>
                                                        <div className="form-group-div">
                                                            <Form.Group className="px-3 form-group form-group-password d-flex flex-column justify-content-center">
                                                                <div className="input-password-header form-header d-flex justify-content-start">Password</div>
                                                                
                                                                <Form.Control className="input-password form-input shadow-none" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                                                            </Form.Group>
                                                        </div>
                                                        <div className="privacy-policy-signup">
                                                            By selecting <strong>Agree and continue</strong> , I agree to Airbnb Clone's <a href="#">Lorem ipsum of Service</a>, and <a href="#">Lorem ipsum policy</a> dolar sit amet <a href="#">Privacy Policy</a>.
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="signup-login-button form-button login-button-email" type="submit">
                                                    Agree and continue
                                                </button>
                                            </Form>
                                    </div>
                            </>
                            }
                        </>
                        : 
                        <>
                            <div className="signup-login-main">
                                <div className="welcome-to-airbnb d-flex justify-content-start">Welcome to Airbnb Clone</div>
                                    <Form onSubmit={checkEmailAndSubmit}>
                                        <div className="login-email-form">
                                            <Form.Group className="px-3 form-group form-group-email d-flex flex-column justify-content-center">
                                                {/* we are using username temporarily, because we can not validate emails currently*/}
                                                <div className="input-email-header d-flex justify-content-start">Username</div>
                                                
                                                <Form.Control className="input-email shadow-none form-input" type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
                                            </Form.Group>
                                        </div>
                                        <button className="signup-login-button login-button-email" type="submit">
                                            Continue
                                        </button>
                                    </Form>
                            </div>
                        </>}
                        
        </>
    )
}

export default LoginEmail;