import { Form } from "react-bootstrap";
import "./loginEmail.scss";
import { useState } from "react";

const LoginEmail = () => {
    const [isEmailExist, setIsEmailExist] = useState(false)
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
                            {isEmailExist ?
                                <>
                                    <div className="signup-login-main">
                                        <div className="login-email-form">
                                            <Form>
                                                <Form.Group className="px-3 form-group-email d-flex flex-column justify-content-center">
                                                    <div className="input-password-header form-header d-flex justify-content-start">Password</div>
                                                    
                                                    <Form.Control className="input-password form-input shadow-none" type="password" placeholder="Password" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <button className="signup-login-button form-button login-button-email" type="submit" onClick={() => {checkEmailAndSubmit()} }>
                                            Login
                                        </button>
                                    </div>
                                </>

                            :
                            <>
                                    <div className="signup-login-main">
                                        <div className="signup-email-form">
                                            <Form>
                                                <div className="d-flex flex-column justify-content-start align-items-start">

                                                
                                                    <div className="form-group-div">
                                                        <Form.Group className="px-3 form-group form-group-name d-flex flex-column justify-content-center">                                                    
                                                            <div className="input-firstname-header form-header d-flex justify-content-start">First name</div>

                                                            <Form.Control className="input-firstname form-input shadow-none" type="text" placeholder="First name" />

                                                        
                                                        </Form.Group>
                                                        <div className="form-divider" />
                                                        <Form.Group className="px-3 form-group form-group-lastname d-flex flex-column justify-content-center">                                                    
                                                            <div className="input-lastname-header form-header d-flex justify-content-start">Last name</div>

                                                            <Form.Control className="input-lastname form-input shadow-none" type="text" placeholder="Last name" />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="input-explanation">Make sure it matches the name on your government ID.</div>
                                                    <div className="form-group-div">
                                                        <Form.Group className="px-3 form-group form-group-birthdate d-flex flex-column justify-content-center">                                                    
                                                            <div className="input-birthdate-header form-header d-flex justify-content-start">Birthdate</div>
                                                            <Form.Control className="input-lastname form-input shadow-none" type="date" placeholder="Birthdate" />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="input-explanation">To sign up, you need to be at least 18. Your Birthday won't be shared with other people who use Airbnb.</div>
                                                    <div className="form-group-div">
                                                        <Form.Group className="px-3 form-group form-group-email d-flex flex-column justify-content-center">
                                                            <div className="input-email-header form-header d-flex justify-content-start">Email</div>
                                                            
                                                            <Form.Control className="input-email form-input shadow-none" type="email" placeholder="Email" />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="input-explanation">We'll email you trip confirmations and receipts.</div>
                                                    <div className="form-group-div">
                                                        <Form.Group className="px-3 form-group form-group-password d-flex flex-column justify-content-center">
                                                            <div className="input-password-header form-header d-flex justify-content-start">Password</div>
                                                            
                                                            <Form.Control className="input-password form-input shadow-none" type="password" placeholder="Password" />
                                                        </Form.Group>
                                                    </div>
                                                    <div className="privacy-policy-signup">
                                                        By selecting <strong>Agree and continue</strong> , I agree to Airbnb's <a href="#">Terms of Service</a>, <a href="#">Payments Terms of Service</a>, and <a href="#">Nondiscrimination Policy</a> and acknowledge the <a href="#">Privacy Policy</a>.
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                        <button className="signup-login-button form-button login-button-email" type="submit" onClick={() => {checkEmailAndSubmit()} }>
                                            Agree and continue
                                        </button>
                                    </div>
                            </>
                            }
                        </>
                        : 
                        <>
                            <div className="signup-login-main">
                                <div className="welcome-to-airbnb d-flex justify-content-start">Welcome to Airbnb</div>
                                <div className="login-email-form">
                                    <Form>
                                        <Form.Group className="px-3 form-group form-group-email d-flex flex-column justify-content-center">
                                            <div className="input-email-header d-flex justify-content-start">Email</div>
                                            
                                            <Form.Control className="input-email shadow-none form-input" type="email" placeholder="Email" />
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