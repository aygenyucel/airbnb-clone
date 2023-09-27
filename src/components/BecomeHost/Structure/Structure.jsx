import { Button, Form } from "react-bootstrap"
import { links } from "../../../assets/images-links.js"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Structure = (props) => {

    const navigate = useNavigate();
    const [selectedStructure, setSelectedStructure] = useState(null)

    const submitStructureAndNext= () => {
        //TODO: save the selected structure
        if(selectedStructure) {
            navigate("/become-a-host/privacy-type")
        }
    }

    useEffect(() => {
        props.structure(selectedStructure)
    }, [selectedStructure])

    return (
        <div className="structure container d-flex flex-column align-items-end">
            <div className="d-flex row g-3">
                <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                    Which of these best describes your place?
                </div>
                {links.map((link) => {
                    return (<div className="col-6 col-sm-4 place-structure-option-div">
                                <Form>
                                    <Form.Group>
                                        <div className={link.label === selectedStructure ?"place-structure-option selected-structure" : "place-structure-option"} onClick={() => {(selectedStructure !== link.label) ? (setSelectedStructure(link.label)) : (setSelectedStructure(null))}}>
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
            <button className="become-host-next-button" onClick={() => {submitStructureAndNext()}}>Next</button>
        </div>
    )
}

export default Structure