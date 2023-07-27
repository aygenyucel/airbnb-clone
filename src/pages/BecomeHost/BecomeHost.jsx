import { useLocation, useNavigate } from "react-router-dom";
import BecomeHostNavbar from "../../components/BecomeHostNavbar/BecomeHostNavbar";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { links } from "../../assets/images-links.js"
import "./becomeHost.scss"

const BecomeHost = () => {

    const location = useLocation()
    const path = location.pathname.slice(location.pathname.lastIndexOf("/"))
    const navigate = useNavigate();

    const [structure, setStructure] = useState(null);
    const [privacyType, setPrivacyType] = useState(null)

    useEffect(() => {
        console.log(privacyType)
    }, [privacyType])

    const startForm = () => {
        navigate("structure")
    }

    
    const submitStructureAndNext= () => {
        //TODO: save the selected structure
        if(structure) {
            navigate("/become-a-host/privacy-type")
        }
        
    }

    const submitPrivacyTypeAndNext = () => {
        if(privacyType) {
            navigate("/become-a-host/location")
        }
        
    }
    const submitLocationAndNext = () => {
        navigate("/become-a-host/floor-plan")
    }

    const submitFloorPlanAndNext = () => {
        navigate("/become-a-host/photos")
    }

    const submitPhotosAndNext = () => {
        navigate("/become-a-host/prices")
    }

    const submitFormAndNext = () => {
        //TODO: create the place & save db. Redirect to place page.
    }


    return <div>
        <BecomeHostNavbar/>
        <div className="become-host d-flex justify-content-center align-items-center">
            
                { 
                (path === "/become-a-host") && 
                <div style={{paddingInline: "50px"}}>
                    <div className="d-flex flex-row align-items-center justify-content-center" >
                        <div className="col-6 pe-5">
                            <div className="mb-4" style={{fontWeight : 700, fontSize: "2.6rem", textAlign: "left", lineHeight:"50px"}}>
                                Tell us about your place
                            </div>
                            <div style={{textAlign: "left"}}>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</div>
                        </div>
                        <div className="col-6">
                            <img src="assets/place-sample.png" alt="place-sample" />
                        </div>
                       
                    </div>
                    <Button onClick={() => startForm()}>Get started</Button>
                </div>
                }
                <div className="become-host-frame d-flex flex-column ">
                { 
                (path === "/structure") &&
                <div className="container">
                    <div className="d-flex row g-3">
                        <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                            Which of these best describes your place?
                        </div>
                        {links.map((link) => {
                            return (<div className="col-6 col-sm-4">
                                        <Form>
                                            <Form.Group>
                                                <div className={link.label === structure ?"place-structure-option selected-structure" : "place-structure-option"} onClick={() => {structure !== link.label ? setStructure(link.label) : setStructure(null)}}>
                                                    <div>
                                                        <img  src={link.imgSrc} alt={link.label} style={{ height: "35px" }} />
                                                    </div>
                                                    <div>{link.label}</div>
                                                </div>
                                            </Form.Group>
                                        </Form>
                                    </div> )
                        })}
                    </div>
                    <Button onClick={() => {submitStructureAndNext()}}>Next</Button>
                </div>
                }
                { 
                (path === "/privacy-type") &&
                <div className="container">
                    <div className="d-flex row g-3">
                        <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                            What type of place will guests have?
                        </div>
                        <div className={"col" + (structure === "0" && "fklsdf")}>

                        </div>
                        <div className="col-12" >
                            <div className={"privacy-type-option form-option d-flex flex-column justify-content-left align-items-left " + (privacyType === "Entire place" && "selected-privacy-type")}  onClick={() => {setPrivacyType("Entire place")}}>
                                <div className="d-flex"><b>An entire place</b></div>
                                <div className="d-flex">Guests have the whole place to themselves.</div>
                            </div>
                        </div> 
                        <div className="col-12" >
                            <div className={" privacy-type-option form-option d-flex flex-column justify-content-left align-items-left " + (privacyType === "Room" && "selected-privacy-type")} onClick={() => {setPrivacyType("Room")}}>
                                <div className="d-flex"><b>A room</b></div>
                                <div className="d-flex">Guests have their own room in a home, plus access to shares spaces.</div>
                            </div>
                        </div> 
                        <div className="col-12" >
                            <div className={" privacy-type-option form-option d-flex flex-column justify-content-left align-items-left " + (privacyType === "Shared room" && "selected-privacy-type")} onClick={() => {setPrivacyType("Shared room")}}>
                                <div className="d-flex"><b>A shared room</b></div>
                                <div className="d-flex">Guests sleep in a room or common area that may be shared with you or others.</div>
                            </div>
                        </div> 
                        
                    </div>
                    <Button onClick={() => {submitPrivacyTypeAndNext()}}>Next</Button>
                </div>
                }
                {
                    (path === "/location") &&
                    <div className="container">
                        <div className="d-flex row g-3 justify-content-left align-items-left">
                            <div className="place-question d-flex mb-3 text-start"> 
                                Where's your place located?
                            </div>
                            <div className="text-start">
                                Your address is only shared with guests after they’ve made a reservation.
                            </div>
                            <Form>
                                <div className="location-form">
                                    <Form.Group className="px-3 mb-3 form-group d-flex flex-column justify-content-center form-frame">
                                        <div className="input-country-header form-header d-flex justify-content-start">Country</div>
                                        
                                        <Form.Control className="input-country form-input shadow-none" type="string" placeholder="Country"/>
                                    </Form.Group>
                                    <div className="form-frame">
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-town-header form-header d-flex justify-content-start">Town / neighborhood</div>
                                            
                                            <Form.Control className="input-town form-input shadow-none" type="string" placeholder="Town / neighborhood"/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-street-header form-header d-flex justify-content-start">Street address</div>
                                            
                                            <Form.Control className="input-street form-input shadow-none" type="string" placeholder="Street address"/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-additional-header form-header d-flex justify-content-start">Additional</div>
                                            
                                            <Form.Control className="input-additional form-input shadow-none" type="string" placeholder="Unit, floor, bldg, etc. (if applicable)"/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-postal-header form-header d-flex justify-content-start">Postal code</div>
                                            
                                            <Form.Control className="input-postal form-input shadow-none" type="string" placeholder="Postal code (if applicable)"/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-district-header form-header d-flex justify-content-start">District, subdistrict</div>
                                            
                                            <Form.Control className="input-disctrict form-input shadow-none" type="string" placeholder="District, subdistrict"/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-district-header form-header d-flex justify-content-start">City</div>
                                            
                                            <Form.Control className="input-disctrict form-input shadow-none" type="string" placeholder="City"/>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Form>
                            <Button onClick={() => {submitLocationAndNext()}}>Next</Button>

                        </div>
                        

                    </div>
                    
                }
                { 
                (path === "/floor-plan") &&
                <div className="container">
                    <div className="d-flex row g-3">
                            <div className="place-question d-flex  mb-3"> 
                                Share some basics about your place
                            </div>
                            <div className="d-flex text-start">
                                You'll add more details later, like bed types.
                            </div>
                        <div className="col-12">
                            <div className=" floor-plan-option d-flex justify-content-between" style={{fontSize: "1.2rem"}}>
                                <div className="d-flex" >Guests</div>
                                <div className="d-flex justify-content-between">
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2">-</button>
                                    <div>1</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2">+</button>
                                </div>
                            </div>
                        </div> 
                        <div className="form-divider-light"/>
                        <div className="col-12">
                            <div className=" floor-plan-option d-flex justify-content-between" style={{fontSize: "1.2rem"}}>
                                <div className="d-flex" >Bedrooms</div>
                                <div className="d-flex justify-content-between">
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2">-</button>
                                    <div>1</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2">+</button>
                                </div>
                            </div>
                        </div> 
                        <div className="form-divider-light"/>
                        <div className="col-12">
                            <div className=" floor-plan-option d-flex justify-content-between" style={{fontSize: "1.2rem"}}>
                                <div className="d-flex" >Beds</div>
                                <div className="d-flex justify-content-between">
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2">-</button>
                                    <div>1</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2">+</button>
                                </div>
                            </div>
                        </div> 
                        <div className="form-divider-light"/>
                        <div className="col-12">
                            <div className=" floor-plan-option d-flex justify-content-between" style={{fontSize: "1.2rem"}}>
                                <div className="d-flex" >Bathrooms</div>
                                <div className="d-flex justify-content-between">
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2">-</button>
                                    <div>1</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2">+</button>
                                </div>
                            </div>
                        </div> 
                        
                        
                    </div>
                    <Button onClick={() => {submitFloorPlanAndNext()}}>Next</Button>
                </div>
                }
                { 
                (path === "/photos") &&
                <div className="container">
                    <div className="d-flex row g-3">
                        <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                            Add some photos of your house
                        </div>
                        <div className="d-flex text-start">
                        You'll need 1 photo to get started. You can add more or make changes later.
                        </div>
                        <div className="photos-frame d-flex flex-column justify-content-center align-items-center">

                            <div >
                                <b>Drag your photos here</b>
                            </div>
                            <div>
                                <small>Choose at least 1 photo</small>
                            </div>
                            <div>
                                <u>Choose from your device</u>
                            </div>
                           
                        </div> 
                        
                        
                    </div>
                    <Button onClick={() => {submitPhotosAndNext()}}>Next</Button>
                </div>
                }
                { 
                (path === "/prices") &&
                <div className="container">
                    <div className="d-flex row g-3">
                        <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                            What is the daily price for airbnb?
                        </div>
                        <Form className="form-frame">
                            <Form.Group>
                                <div className="input-price-header form-header d-flex justify-content-start">Price</div>
                                <Form.Control className="input-additional form-input shadow-none" type="string" placeholder="Daily price"/>
                            </Form.Group>
                        </Form>
                    </div>
                    <Button onClick={() => {submitFormAndNext()}}>Next</Button>
                </div>
                }
                
                </div>
            </div>
        </div>
}

export default BecomeHost;
