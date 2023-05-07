import { Button, Form } from "react-bootstrap";
import MainNavbar from "../../components/MainNavbar/MainNavbar"
import './signupLogin.scss'

const SignupLogin = () => {
    return (
        <>
            <MainNavbar isNavbarMiddleVisible = {false}/>
            <div className="signup-login d-flex justify-content-center align-items-center">
                <div className="signup-login-frame">
                    <div className="signup-login-header">
                        Log in or sign up
                    </div>
                    <div className="horizontal-divider"/>
                    <div className="signup-login-main">
                        <div className="welcome-to-airbnb d-flex justify-content-start">Welcome to Airbnb</div>
                        <div className="signup-login-form">
                            <Form>
                                <Form.Group className="px-3 form-group-country d-flex flex-column justify-content-center">
                                    <div className="input-country-header d-flex justify-content-start">Country/Region</div>
                                    <input className="form-control input-country" placeholder="Turkey(+90)" />
                                    {/* <Form.Control placeholder="Turkey(+90)"/> */}
                                </Form.Group>
                                <div className="form-divider" />

                                <Form.Group className="px-3 form-group-phone d-flex align-items-center">
                                    <Form.Control className="input-phone" type="number" placeholder="Phone number" />
                                </Form.Group>

                            </Form>
                        </div>
                        <div className="privacy-policy d-flex flex-column align-items-start">We’ll call or text you to confirm your number. Standard message and data rates apply. <span className="privacy-policy-link">Privacy Policy</span> </div>
                        <button className="signup-login-button" type="submit">
                            Continue
                        </button>

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
                            <div className="d-flex">
                                <span>
                                    <img className="other-options-logo" src="/assets/email-icon.png" alt="email icon" />
                                </span>
                                <div className="login-option-email d-flex justify-content-center align-items-center">
                                    Continue with email
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignupLogin;