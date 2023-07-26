import { Button, Form } from "react-bootstrap";
import { links } from "../../assets/images-links.js"
import "./placeStructure.scss";
import { useNavigate } from "react-router-dom";

const PlaceStructure = () => {

    const navigate = useNavigate();

    const submitAndNext= () => {
        //TODO: save the selected structure
        navigate("/become-a-host/privacy-type")
    }

    return (
        <div className="place-structure d-flex flex-column ">
            
            <div className="container">
                <div className="d-flex row g-3">
                    <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> Which of these best describes your place?</div>
                        {links.map((structure) => {
                            return <div className="col-6 col-sm-4 ">
                                <div className=" place-structure-option d-flex flex-column justify-content-left align-items-left">

                                    <div>
                                        <img  src={structure.imgSrc} alt={structure.label} style={{ height: "35px" }} />
                                    </div>
                                    <div>{structure.label}</div>
                                </div>
                                
                            </div> 
                        })}
                        

                    </div>
            </div>
            
            <Button onClick={() => {submitAndNext()}}>Next</Button>
            
        </div>

    )
}

export default PlaceStructure;