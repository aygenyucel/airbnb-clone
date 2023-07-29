import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Location = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null)

    const submitLocationAndNext = () => {
        navigate("/become-a-host/floor-plan")
    }
    return (
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
    )
}

export default Location;