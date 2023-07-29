import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const PrivacyType = (props) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null)

    const submitPrivacyTypeAndNext = () => {
        if(selected) {
            navigate("/become-a-host/location")
        }
    }

    useEffect(() => {
        props.privacyType(selected)
    }, [selected])

    return (
        <div className="container">
            <div className="d-flex row g-3">
                <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                    What type of place will guests have?
                </div>
                <div className="col-12" >
                    <div className={"privacy-type-option form-option d-flex flex-column justify-content-left align-items-left " + (selected === "Entire place" && "selected-privacy-type")}  onClick={() => {setSelected("Entire place")}}>
                        <div className="d-flex"><b>An entire place</b></div>
                        <div className="d-flex">Guests have the whole place to themselves.</div>
                    </div>
                </div> 
                <div className="col-12" >
                    <div className={" privacy-type-option form-option d-flex flex-column justify-content-left align-items-left " + (selected === "Room" && "selected-privacy-type")} onClick={() => {setSelected("Room")}}>
                        <div className="d-flex"><b>A room</b></div>
                        <div className="d-flex">Guests have their own room in a home, plus access to shares spaces.</div>
                    </div>
                </div> 
                <div className="col-12" >
                    <div className={" privacy-type-option form-option d-flex flex-column justify-content-left align-items-left " + (selected === "Shared room" && "selected-privacy-type")} onClick={() => {setSelected("Shared room")}}>
                        <div className="d-flex"><b>A shared room</b></div>
                        <div className="d-flex">Guests sleep in a room or common area that may be shared with you or others.</div>
                    </div>
                </div> 
                
            </div>
            <Button onClick={() => {submitPrivacyTypeAndNext()}}>Next</Button>
        </div>

    )
}

export default PrivacyType