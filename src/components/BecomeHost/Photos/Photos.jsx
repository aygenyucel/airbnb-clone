import { useState } from "react";
import { Button, CloseButton, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import CustomTooltip from './../../CustomTooltip/CustomTooltip'
import { Circles } from  'react-loader-spinner';
import "./photos.scss";

const Photos = (props) => {
    const navigate = useNavigate();

    const [placeImages, setPlaceImages] = useState(null);
    const [isTooltipRandomImagesOpen, setIsTooltipRandomImagesOpen] = useState(true)
    const [imageArray, setImageArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const uploadImage = (event) => {
        setPlaceImages(event.target.files)
        try {
            console.log("ppp", event.target.files)
            setPlaceImages(Array.from(event.target.files))

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(placeImages !== null) {
            props.photos(placeImages);
            navigate("/become-a-host/prices")
        }
    }

    // converting image from http url to base64
    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
            });
        }
        //return a promise that resolves with a File instance
        const urltoFile = async (url, filename) => {
            return (await fetch(url)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], filename);})
        );
    }

    //converting base64 images from url to a file & pushing files to an array
    const getImageFiles = async() => {
        for(let imageIndex = 0; imageIndex <= 5; imageIndex++)  {
           await getBase64FromUrl('https://source.unsplash.com/random/?home').then((base64) => {
                urltoFile(base64, "placeImages").then(function(file){
                    imageArray.push(file)         
                })
            })
        }
    }

    const loadRandomImages = async() => {
        setIsLoading(true)
        await getImageFiles().then(() => {
            setPlaceImages(Array.from(imageArray))
            setIsLoading(false)
            setIsTooltipRandomImagesOpen(false)
        })
    }

    return (
        <div className="container">
            <div className= {isLoading && "loading-div"}>
                <div>
                    <Circles
                        type="Spinner Type"
                        visible={isLoading}
                        color="#FF385C"
                    />
                </div>
                
            </div>
            
            <Form onSubmit={handleSubmit}>
                    <div className="d-flex row g-3">
                        <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3">
                            Add some photos of your house
                        </div>
                        <div className="d-flex text-start">
                            You'll need 1 photo to get started. You can add more or make changes later.
                        </div>
                        <div className="photos-frame d-flex flex-column justify-content-center align-items-center">
                            <div className= "not-allowed photos-frame-main-div">
                                <div >
                                    <b>Drag your photos here</b>
                                </div>
                                <div>
                                    <small>Choose at least 5 photos</small>
                                </div>
                                <Form.Group >

                                        <div>
                                            <u>Choose from your device</u>
                                        </div>
                                    <Form.Control className= "not-allowed mt-2" type="file" name="placeImages[]" multiple= "multiple" accept="image/jpeg" onChange={uploadImage} disabled>
                                    </Form.Control>
                                </Form.Group>

                            </div>

                            <CustomTooltip
                                open= {isTooltipRandomImagesOpen}
                                title= {
                                <div className="d-flex align-items-center">
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <div textAlign={'center'} className="mb-2" >You are only allowed to load random place images for security reasons.</div>
                                        </div>
                                    <div className='d-flex justify-content-end'>
                                    <CloseButton onClick={() => {setIsTooltipRandomImagesOpen(false)}} />
                                </div>
                                </div>}
                                placement='right'
                                arrow
                            >
                                {placeImages 
                                ? <button className="random-images-button " disabled>
                                    Images are loaded successfully!
                                </button>
                                : <button className="random-images-button" onClick={()=> { loadRandomImages()}}>
                                    Load random place images
                                    
                                </button>
                                }
                            </CustomTooltip>
                        </div>
                    </div>
                    <Button type="submit">Next</Button>
            </Form>
        </div>
    )
}

export default Photos;