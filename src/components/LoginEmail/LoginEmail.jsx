import { Form } from "react-bootstrap";
import "./loginEmail.scss";

const LoginEmail = () => {
    return (
        <>
                        <div className="login-email-form">
                            <Form>
                                <Form.Group className="px-3 form-group-email d-flex flex-column justify-content-center">
                                    <div className="input-email-header d-flex justify-content-start">Email</div>
                                    
                                    <Form.Control className="input-email shadow-none" type="email" placeholder="Email" />
                                </Form.Group>
                            </Form>
                        </div>
                        <button className="signup-login-button login-button-email" type="submit">
                            Continue
                        </button>
        </>
    )
}

export default LoginEmail;