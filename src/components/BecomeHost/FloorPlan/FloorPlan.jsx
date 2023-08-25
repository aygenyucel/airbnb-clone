import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const FloorPlan = (props) => {
    const navigate = useNavigate();

    const [numOfGuests, setNumOfGuests] = useState(1);
    const [numOfBedrooms, setNumOfBedrooms] = useState(1);
    const [numOfBeds, setNumOfBeds] = useState(1);
    const [numOfBathrooms, setNumOfBathrooms] = useState(1);

    const submitFloorPlanAndNext = () => {
        
        const newFloorPlanObj = {
            numOfGuests,
            numOfBedrooms,
            numOfBeds,
            numOfBathrooms
        }
        props.floorPlanObj(newFloorPlanObj);
        navigate("/become-a-host/photos")
    }
    
    const increaseNumOfBathrooms = () => {
        setNumOfBathrooms(numOfBathrooms + 1)
    }
    const decreaseNumOfBathrooms = () => {
        if(numOfBathrooms > 1) {
            setNumOfBathrooms(numOfBathrooms -1)
        }
    }
    const increaseNumOfBeds= () => {
        setNumOfBeds(numOfBeds+ 1)
    }
    const decreaseNumOfBeds= () => {
        if(numOfBeds> 1) {
            setNumOfBeds(numOfBeds-1)
        }
    }
    const increaseNumOfBedrooms = () => {
        setNumOfBedrooms(numOfBedrooms + 1)
    }
    const decreaseNumOfBedrooms = () => {
        if(numOfBedrooms > 1) {
            setNumOfBedrooms(numOfBedrooms -1)
        }
    }
    const increaseNumOfGuests = () => {
        setNumOfGuests(numOfGuests + 1)
    }
    const decreaseNumOfGuests = () => {
        if(numOfGuests > 1) {
            setNumOfGuests(numOfGuests -1)
        }
    }
    return (
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
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2" onClick={() => {decreaseNumOfGuests()}}>-</button>
                                    <div>{numOfGuests}</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2 " onClick={() => {increaseNumOfGuests()}}>+</button>
                                </div>
                            </div>
                        </div> 
                        <div className="form-divider-light"/>
                        <div className="col-12">
                            <div className=" floor-plan-option d-flex justify-content-between" style={{fontSize: "1.2rem"}}>
                                <div className="d-flex" >Bedrooms</div>
                                <div className="d-flex justify-content-between">
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2" onClick={() => {decreaseNumOfBedrooms()}}>-</button>
                                    <div>{numOfBedrooms}</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2" onClick={() => {increaseNumOfBedrooms()}}>+</button>
                                </div>
                            </div>
                        </div> 
                        <div className="form-divider-light"/>
                        <div className="col-12">
                            <div className=" floor-plan-option d-flex justify-content-between" style={{fontSize: "1.2rem"}}>
                                <div className="d-flex" >Beds</div>
                                <div className="d-flex justify-content-between">
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2" onClick={() => {decreaseNumOfBeds()}}>-</button>
                                    <div>{numOfBeds}</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2" onClick={() => {increaseNumOfBeds()}}>+</button>
                                </div>
                            </div>
                        </div> 
                        <div className="form-divider-light"/>
                        <div className="col-12">
                            <div className=" floor-plan-option d-flex justify-content-between" style={{fontSize: "1.2rem"}}>
                                <div className="d-flex" >Bathrooms</div>
                                <div className="d-flex justify-content-between">
                                    <button className="floor-plan-btn floor-plan-decrease-btn d-flex justify-content-center align-items-center me-2" onClick={() => {decreaseNumOfBathrooms()}}>-</button>
                                    <div>{numOfBathrooms}</div>
                                    <button className="floor-plan-btn floor-plan-increase-btn d-flex justify-content-center align-items-center ms-2" onClick={() => {increaseNumOfBathrooms()}}>+</button>
                                </div>
                            </div>
                        </div> 
                        
                        
                    </div>
                    <Button onClick={() => {submitFloorPlanAndNext()}}>Next</Button>
                </div>
    )
}

export default FloorPlan;