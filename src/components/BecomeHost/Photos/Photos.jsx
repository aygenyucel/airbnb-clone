import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Photos = (props) => {
    const navigate = useNavigate();

    const [placeImages, setPlaceImages] = useState(null);

    const [url, setUrl] = useState("");

    
    const uploadImage = (event) => {
        setPlaceImages(event.target.files)
        
        try {
            setPlaceImages(Array.from(event.target.files))
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        props.photos(placeImages);

        navigate("/become-a-host/prices")
        
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
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
                            <Form.Group>

                                    <div>
                                        <u>Choose from your device</u>
                                    </div>
                                <Form.Control type="file" name="placeImages[]" multiple= "multiple" accept="image/jpeg, image/png" onChange={uploadImage}>
                                </Form.Control>
                            </Form.Group>
                           
                        </div> 
                        
                        
                    </div>
                    <Button type="submit">Next</Button>
                    </Form>
                </div>
    )
}

export default Photos;