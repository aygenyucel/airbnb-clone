import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Photos = () => {
    const navigate = useNavigate();

    const submitPhotosAndNext = () => {
        navigate("/become-a-host/prices")
    }
    return (
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
    )
}

export default Photos;