import { Form } from "react-bootstrap";
import "./loginPhone.scss"

const LoginPhone = () => {

    return (
        <>
        
        <div className="signup-login-header">
                        Log in or sign up
                    </div>
                    <div className="horizontal-divider"/>
                    <div className="signup-login-main">
                        <div className="welcome-to-airbnb d-flex justify-content-start">Welcome to Airbnb</div>
                        <div className="login-phone-form">
                            <Form>
                                <Form.Group className="px-3 form-group form-group-country d-flex flex-column justify-content-center">
                                    <div className="input-country-header d-flex justify-content-start">Country/Region</div>
                                    <input className="form-control input-country shadow-none" placeholder="Turkey(+90)" />
                                    {/* <Form.Control placeholder="Turkey(+90)"/> */}
                                </Form.Group>
                                <div className="form-divider" />

                                <Form.Group className="px-3 form-group form-group-phone d-flex align-items-center">
                                    <Form.Control className="input-phone shadow-none" type="phone" pattern="[0-9]*" placeholder="Phone number" />
                                </Form.Group>

                            </Form>
                        </div>
                        <div className="privacy-policy d-flex flex-column align-items-start">We’ll call or text you to confirm your number. Standard message and data rates apply. <span className="privacy-policy-link">Privacy Policy</span> </div>
                        <button className="signup-login-button login-button-phone" type="submit">
                            Continue
                        </button>
                        </div>
        </>
    )
}

export default LoginPhone;