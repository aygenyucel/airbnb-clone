import { redirect, useLocation, useNavigate } from "react-router-dom";
import BecomeHostNavbar from "../../components/BecomeHostNavbar/BecomeHostNavbar";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { links } from "../../assets/images-links.js"
import "./becomeHost.scss"
import Structure from "../../components/BecomeHost/Structure/Structure";
import PrivacyType from "../../components/BecomeHost/PrivacyType/PrivacyType";
import Location from "../../components/BecomeHost/Location/Location";
import FloorPlan from "../../components/BecomeHost/FloorPlan/FloorPlan";
import Photos from "../../components/BecomeHost/Photos/Photos";
import Prices from "../../components/BecomeHost/Prices/Prices";
import { useDispatch, useSelector } from "react-redux";
import { isAuthorizedAction } from "../../redux/actions";

const BecomeHost = () => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer?.data);
    const location = useLocation()
    const path = location.pathname.slice(location.pathname.lastIndexOf("/"))
    const navigate = useNavigate();

    const [isAuthorized, setIsAuthorized] = useState(null)

    const [structure, setStructure] = useState(null);
    const [privacyType, setPrivacyType] = useState(null);
    const [locationObj, setLocationObj] = useState(null);
    const [floorPlanObj, setFloorPlanObj] = useState(null);
    const [price, setPrice] = useState(null);
    const [photos, setPhotos] = useState(null)

    const [isFormSubmit, setIsFormSubmit] = useState(false)

    // useEffect(() => {
    //     console.log("xxxhdskjsladhj!!!", photos)
    // }, [photos])

    const startForm = () => {
        navigate("structure")
    }
    
    useEffect(() => {
        isAuthorizedAction(userData, dispatch).then(boolean => {
            if(boolean === true) {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        })
        .catch(err => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(isAuthorized === false) {
            navigate("/signup_login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthorized])


    //needed to filled up previous questions before see the next endpoints
    useEffect(() => {
        if(path === "/privacy-type") {
            if(structure === null) {
                navigate("/become-a-host/structure")
            }
        }
        if(path === "/location") {
            if(privacyType === null) {
                navigate("/become-a-host/privacy-type")
            }
        }
        if(path === "/floor-plan") {
            if(locationObj === null) {
                navigate("/become-a-host/location")
            }

        }
        if(path === "/photos") {
            if(floorPlanObj === null) {
                navigate("/become-a-host/floor-plan")
            }
        }
        if(path === "/prices") {
            if(photos === null) {
                navigate("/become-a-host/photos")
            }
        }

    }, [path])

    useEffect(() => {
        if(isFormSubmit === true) {

            new Promise(async (resolve, reject) => {
                try {
                    //first we upload the images and getting cloudinary urls

                    const formData = new FormData();
                    // formData.append("placeImages", event.target.files[0]);
                    photos.forEach((photo) =>  
                        {formData.append("placeImages", photo)}
                    )
                    
                    console.log(formData)
                    const options = {
                        method: "POST",
                        body: formData
                    }
                    
                    const response = await fetch(`${process.env.REACT_APP_BE_DEV_URL}/places/uploadImages`, options)
                    if(response.ok) {
                        //if we upload images successfully, we are creating newPlace object
                        //and save new place to db
                        const data = await response.json();
                        const imageUrls = data.data

                        try {
                            const newPlace = {
                                structure,
                                privacyType,
                                location: locationObj,
                                floorPlan: floorPlanObj,
                                dailyPrice: price,
                                userID: `${userData._id}`,
                                images: imageUrls
                            }

                            const options = {
                                method: "POST",
                                body: JSON.stringify(newPlace),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }
                            try {
                                const response = await fetch(`${process.env.REACT_APP_BE_DEV_URL}/places`, options)
                                if(response.ok) {
                                    const {_id} = await response.json();
                                    console.log("new place created. ID: ", _id)
                                    navigate("/")
                                    resolve(_id)
                                } else {
                                    console.log("Error when fetching!", response.status)
                                }
                                
                            } catch (error) {
                                console.log("🚀 error", error)
                                reject(error)
                            }
                            
                        } catch (error) {
                            
                        }

                    } else {
                        console.log("oppss, error when fetching!")
                    }
                } catch (error) {
                    
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFormSubmit])
    
   
    return <>{ isAuthorized &&  <div>
            <BecomeHostNavbar/>
            <div className="become-host d-flex justify-content-center align-items-center">
                
                    { 
                    (path === "/become-a-host") && 
                    <div style={{paddingInline: "50px"}}>
                        <div className="d-flex flex-row align-items-center justify-content-center" >
                            <div className="col-6 pe-5">
                                <div className="mb-4" style={{fontWeight : 700, fontSize: "2.6rem", textAlign: "left", lineHeight:"50px"}}>
                                    Tell us about your place
                                </div>
                                <div style={{textAlign: "left"}}>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</div>
                            </div>
                            <div className="col-6">
                                <img src="assets/place-sample.png" alt="place-sample" />
                            </div>
                        
                        </div>
                        <Button onClick={() => startForm()}>Get started</Button>
                    </div>
                    }
                    <div className="become-host-frame d-flex flex-column ">
                    { 
                    (path === "/structure") &&
                    <Structure structure = {(selectedStructure) => setStructure(selectedStructure)}/>
                    }
                    { 
                    (path === "/privacy-type") &&
                    <PrivacyType privacyType = {(selectedPrivacyType) => setPrivacyType(selectedPrivacyType)}/>
                    }
                    {
                    (path === "/location") &&
                    <Location locationObj = {(locationObj) => setLocationObj(locationObj)}/>
                    }
                    { 
                    (path === "/floor-plan") &&
                    <FloorPlan floorPlanObj = {(floorPlanObj => setFloorPlanObj(floorPlanObj))}/>
                    }
                    { 
                    (path === "/photos") &&
                    <Photos photos = {(photos => setPhotos(photos))}/>
                    }
                    { 
                    (path === "/prices") &&
                    <Prices price = {(price) => setPrice(price)} isFormSubmit = {(boolean) => setIsFormSubmit(boolean)}/>
                    }
                    
                    </div>
                </div>
            </div>
        }</>
}

export default BecomeHost;
