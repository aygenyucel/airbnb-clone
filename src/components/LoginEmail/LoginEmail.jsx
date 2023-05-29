import { Form } from "react-bootstrap";
import "./loginEmail.scss";
import { useState } from "react";

const LoginEmail = () => {
    const [isEmailExist, setIsEmailExist] = useState(true)
    const [isContinueClicked, setIsContinueClicked] = useState(false)

    const checkEmailAndSubmit = () => {
        setIsContinueClicked(true);
    }

    return (
        <>
                        <div className="signup-login-header">
                            {isContinueClicked ? <>{isEmailExist ? "Log in" : "Finish signing up"}</> : "Log in or sign up"}
                        </div>
                        <div className="horizontal-divider"/>
                       
                        {isContinueClicked ? 
                        <>
                            {isEmailExist ? <div>Email exist. show password component</div>:<div>Email not exist. show sign up component </div>}
                        </>
                        : 
                        <>
                            <div className="signup-login-main">
                                <div className="welcome-to-airbnb d-flex justify-content-start">Welcome to Airbnb</div>
                                <div className="login-email-form">
                                    <Form>
                                        <Form.Group className="px-3 form-group-email d-flex flex-column justify-content-center">
                                            <div className="input-email-header d-flex justify-content-start">Email</div>
                                            
                                            <Form.Control className="input-email shadow-none" type="email" placeholder="Email" />
                                        </Form.Group>
                                    </Form>
                                </div>
                                <button className="signup-login-button login-button-email" type="submit" onClick={() => {checkEmailAndSubmit()} }>
                                    Continue
                                </button>
                            </div>
                        </>}
                        
        </>
    )
}

export default LoginEmail;