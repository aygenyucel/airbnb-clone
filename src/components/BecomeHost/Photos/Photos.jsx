import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Photos = (props) => {
    const navigate = useNavigate();

    const [placeImages, setPlaceImages] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget);
        setPlaceImages(formData.getAll("placeImages"))

        for (let i = 0; i < formData.getAll("placeImages").length; i++) {
            // formData.append(placeImages[i].name, placeImages[i]);
            formData.append("upload_preset", "airbnb-place-images")
            formData.append("cloud_name",process.env.CLOUD_NAME)
        }
        console.log(formData.getAll("placeImages"));

        props.photos(formData.getAll("placeImages"));
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
                                <Form.Control type="file" name="placeImages" multiple="multiple" accept="image/jpeg">
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