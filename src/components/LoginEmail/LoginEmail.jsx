import { Form } from "react-bootstrap";
import "./loginEmail.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginEmail = () => {
    const [isEmailExist, setIsEmailExist] = useState(true)
    const [isContinueClicked, setIsContinueClicked] = useState(false)
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState()
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const BE_DEV_URL = process.env.REACT_APP_BE_DEV_URL

    const checkEmailAndSubmit = (event) => {
        // setIsContinueClicked(true)
        event.preventDefault();
        console.log("xxxxxxxxx", email)
        const newEmail = {
            email: email
        }
        checkEmailExist(newEmail).then(setIsContinueClicked(true));
    }

    //check if email exist
    const checkEmailExist = (email) => {
        
        return new Promise(async(resolve,reject) => {
            const options = {
                method: "POST",
                body: JSON.stringify(email),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            try {
                const response = await fetch(`${BE_DEV_URL}/users/checkEmailExist`, options)

                if(response.ok){
                    const data = await response.json();
                    const email = data;
                    console.log("email exist! =>", email)
                    setIsEmailExist(true)
                    resolve({})
                } else {
                    console.log("email not exist! =>", email);
                    setIsEmailExist(false)
                    // response.text()
                    
                    // .then(text => {
                    //     throw new Error(text)
                    // })
                }
                
            } catch (error) {
                console.log("🚀 error", error)
                reject(error)
            }
        })
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

        signupLoginEmail(newUser)
        .then(() => navigate("/"))
        .catch((error) => console.log(error))
    }

    const signupLoginEmail = (user) => {
        return new Promise(async (resolve, reject) => {

            const options = {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            try {
                const response = await fetch(`${BE_DEV_URL}/users/signupLoginEmail`, options)
                if(response.ok) {
                    const data = await response.json();
                    const {JWTToken} = data;
                    console.log("JWTToken =>", JWTToken )
                    resolve({})
                } else {
                    response.text().then(text => {
                        throw new Error(text)
                    })

                    console.log("Ops, something went wrong")

                }
            } catch (error) {
                console.log("🚀 error", error)
                reject(error)
            }
        })
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
                                                    
                                                    <Form.Control className="input-password form-input shadow-none" type="password" placeholder="Password" required/>
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
                                                        <div className="input-explanation">Make sure it matches the name on your government ID.</div>
                                                        <div className="form-group-div">
                                                            <Form.Group className="px-3 form-group form-group-birthdate d-flex flex-column justify-content-center">                                                    
                                                                <div className="input-birthdate-header form-header d-flex justify-content-start">Birthdate</div>
                                                                <Form.Control className="input-lastname form-input shadow-none" type="date" placeholder="Birthdate" onChange={(e) => {setBirthDate(e.target.value)}} required/>
                                                            </Form.Group>
                                                        </div>
                                                        <div className="input-explanation">To sign up, you need to be at least 18. Your Birthday won't be shared with other people who use Airbnb.</div>
                                                        <div className="form-group-div">
                                                            <Form.Group className="px-3 form-group form-group-email d-flex flex-column justify-content-center">
                                                                <div className="input-email-header form-header d-flex justify-content-start">Email</div>
                                                                
                                                                <Form.Control className="input-email form-input shadow-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                            </Form.Group>
                                                        </div>
                                                        <div className="input-explanation">We'll email you trip confirmations and receipts.</div>
                                                        <div className="form-group-div">
                                                            <Form.Group className="px-3 form-group form-group-password d-flex flex-column justify-content-center">
                                                                <div className="input-password-header form-header d-flex justify-content-start">Password</div>
                                                                
                                                                <Form.Control className="input-password form-input shadow-none" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                                                            </Form.Group>
                                                        </div>
                                                        <div className="privacy-policy-signup">
                                                            By selecting <strong>Agree and continue</strong> , I agree to Airbnb's <a href="#">Terms of Service</a>, <a href="#">Payments Terms of Service</a>, and <a href="#">Nondiscrimination Policy</a> and acknowledge the <a href="#">Privacy Policy</a>.
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
                                <div className="welcome-to-airbnb d-flex justify-content-start">Welcome to Airbnb</div>
                                    <Form onSubmit={checkEmailAndSubmit}>
                                        <div className="login-email-form">
                                            <Form.Group className="px-3 form-group form-group-email d-flex flex-column justify-content-center">
                                                <div className="input-email-header d-flex justify-content-start">Email</div>
                                                
                                                <Form.Control className="input-email shadow-none form-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
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