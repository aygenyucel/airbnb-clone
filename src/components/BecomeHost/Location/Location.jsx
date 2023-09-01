import { useEffect, useState } from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import CustomTooltip from './../../CustomTooltip/CustomTooltip';


const Location = (props) => {
    const navigate = useNavigate();
    // const [locationObj, setLocationObj] = useState(null);
    const [country, setCountry] = useState("");
    const [town, setTown] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [postalCode, setPostalCode] = useState("");
    const [district, setDistrict] = useState("")
    const [city, setCity] = useState("")
    const [additional, setAdditional] = useState("")

    const [isTooltipLocationOpen, setIsTooltipLocationOpen] = useState(true)


    const handleSubmit = (e) => {

        e.preventDefault();
        
        if(country !== "" && city !== "") {
            const newLocationObj = {
                country,
                town,
                streetAddress,
                postalCode,
                district,
                city,
                additional
            }
            props.locationObj(newLocationObj);
            navigate("/become-a-host/floor-plan")
        }
    }
    return (
        <div className="container">
            
                        <div className="d-flex row g-3 justify-content-left align-items-left">
                        <CustomTooltip
             open= {isTooltipLocationOpen}
             title= {
                <div className="d-flex align-items-center">
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                            <div textAlign={'center'} className="mb-2" >You are only allowed to select country and city for the security reasons.</div>                        
                        </div>
                    <div className='d-flex justify-content-end'>
                    <CloseButton onClick={() => {setIsTooltipLocationOpen(false)}} />
                </div>
                </div>}
            placement='top-end'
            />
                            <div className="place-question d-flex mb-3 text-start"> 
                                Where's your place located?
                            </div>
                            <div className="text-start">
                                Your address is only shared with guests after they’ve made a reservation.
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <div className="location-form">
                                    <Form.Group className="px-3 mb-3 form-group d-flex flex-column justify-content-center form-frame">
                                        <div className="input-country-header form-header d-flex justify-content-start">Country *</div>
                    
                                        {/* <Form.Control className="input-country form-input shadow-none" type="string" placeholder="Country" onChange={(e) => setCountry(e.target.value)} required/> */}
                                        <CountryDropdown
                                        className="form-control input-country form-input shadow-none"
                                        value={country}
                                       onChange={(val) => setCountry(val)}
                                       defaultOptionLabel = "Country"/>
                                        
                                    </Form.Group>
                                    <div className="form-frame">
                                        <Form.Group className=" px-3 form-group d-flex flex-column justify-content-center">
                                            <div className=" input-town-header form-header d-flex justify-content-start">Town / neighborhood</div>
                                            
                                            <Form.Control className="not-allowed input-town form-input shadow-none" type="string" placeholder="Town / neighborhood" onChange={(e) => setTown(e.target.value)}/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-street-header form-header d-flex justify-content-start">Street address</div>
                                            
                                            <Form.Control className="not-allowed input-street form-input shadow-none" type="string" placeholder="Street address" onChange={(e) => setStreetAddress(e.target.value)}/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-additional-header form-header d-flex justify-content-start">Additional</div>
                                            
                                            <Form.Control className="not-allowed input-additional form-input shadow-none" type="string" placeholder="Unit, floor, bldg, etc. (if applicable)" onChange={(e) => setAdditional(e.target.value)}/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-postal-header form-header d-flex justify-content-start">Postal code</div>
                                            
                                            <Form.Control className="not-allowed input-postal form-input shadow-none" type="string" placeholder="Postal code (if applicable)" onChange={(e) => setPostalCode(e.target.value)}/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-district-header form-header d-flex justify-content-start">District, subdistrict</div>
                                            
                                            <Form.Control className="not-allowed input-disctrict form-input shadow-none" type="string" placeholder="District, subdistrict" onChange={(e) => setDistrict(e.target.value)}/>
                                        </Form.Group>
                                        <div className="form-divider"/>
                                        <Form.Group className="px-3 form-group d-flex flex-column justify-content-center">
                                            <div className="input-district-header form-header d-flex justify-content-start">City *</div>
                                            <RegionDropdown
                                                className="input-disctrict form-input shadow-none"
                                                country={country}
                                                value={city}
                                                onChange={(val) => setCity(val)} 
                                                defaultOptionLabel= "City"	/>
                                            
                                            {/* <Form.Control className="input-disctrict form-input shadow-none" type="string" placeholder="City" onChange={(e) => setCity(e.target.value)} required/> */}
                                        </Form.Group>
                                    </div>
                                </div>
                            <Button type="submit">Next</Button>
                            </Form>

                        </div>
                        

                    </div>
    )
}

export default Location;