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
import { Circles } from "react-loader-spinner";

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

    const [isLoading, setIsLoading] = useState(false)


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
                setIsLoading(true)
                try {
                    //first we upload the images and getting cloudinary urls

                    const formData = new FormData();
                    // formData.append("placeImages", event.target.files[0]);
                    photos.forEach((photo) =>  {
                        formData.append("placeImages", photo)}
                    )
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
                                    setIsLoading(false)
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
                    <div className= {isLoading && "loading-div"}>
                        <div>
                            <Circles
                                type="Spinner Type"
                                visible={isLoading}
                                color="#FF385C"
                            />
                        </div>
                        
                    </div>
                
                    { 
                    (path === "/become-a-host") && 
                    <div className="become-a-host-div d-flex flex-column justify-content-center ">
                        <div className="d-flex flex-row align-items-center justify-content-center" >
                            <div className="col-md-6 col-12">
                                <div className="mb-4" style={{fontWeight : 700, fontSize: "2.6rem", textAlign: "left", lineHeight:"50px"}}>
                                    Tell us about your place
                                </div>
                                <div style={{textAlign: "left", fontSize:"1.1rem"}}>
                                Fames ac turpis egestas sed tempus urna et pharetra pharetra. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Posuere urna nec tincidunt praesent. 
                                </div>
                                <div style={{textAlign: "left"}}>
                                    <button  className= "become-host-next-button" onClick={() => startForm()}>Get started</button>
                                </div>

                            </div>
                            <div className="col-md-6 place-sample-img">
                                <img src="assets/place-sample.png" alt="place-sample" />
                            </div>
                        
                        </div>
                        
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
