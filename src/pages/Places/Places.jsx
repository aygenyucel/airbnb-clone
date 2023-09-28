import { useParams } from 'react-router-dom';
import MainNavbar from './../../components/MainNavbar/MainNavbar';
import "./places.scss"
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
const Places = () => {

    const {placeID} = useParams();
    const BE_DEV_URL = process.env.REACT_APP_BE_DEV_URL

    const [placeData, setPlaceData] = useState(null);

    const [location, setLocation] = useState(null)
    const [floorPlan, setFloorPlan] = useState(null)
    const [images, setImages] = useState(null)
    const [privacyType, setPrivacyType] = useState(null)
    const [userData, setUserData] = useState(null)
    const [username, setUsername] = useState(null)

    const [isPlaceImageClicked, setIsPlaceImageClicked] = useState(false)

    useEffect(() => {
        //fetching the place informations
        fetchPlace(placeID).then((placeData) => {
            setPlaceData(placeData)
            setLocation(placeData.location)
            setImages(placeData.images)
            setPrivacyType(placeData.privacyType)
            setFloorPlan(placeData.floorPlan)

            fetchUserdata(placeData.userID).then(userData => {
                setUserData(userData)
                setUsername(userData.email)
            })
        })

    }, []) 

    const fetchPlace = (placeID) => {
        return new Promise(async(resolve, reject) => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${BE_DEV_URL}/places/${placeID}`)

                if(response.ok) {
                    const placeData = await response.json();
                    console.log("place data: ", placeData)
                    resolve(placeData)

                } else {
                    console.log("opps, error when fetching places!")
                }
                
            } catch (error) {
                console.log("opps, error when fetching places!", error)
                reject(error)
            }
        })
    }

    const fetchUserdata = (userID) => {
        return new Promise(async(resolve, reject) => {
            try {
                const options = {
                    method : "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${BE_DEV_URL}/users/${userID}`)

                if(response.ok) {
                    const userData = await response.json();
                    
                    resolve(userData)
                } else {
                    console.log("error when fetching user!")
                }
                
            } catch (error) {
                reject(error)
            }
        })
    }

    const [clickedImageNumber, setClickedImageNumber] = useState()
    const openPlaceImages = (e) => {
        setIsPlaceImageClicked(true)
        setClickedImageNumber(e.target.alt.replace("image ", "")-1)
        console.log(e.target.alt.replace("image ", ""))
    }
    const closePlaceImages = () => {
        setIsPlaceImageClicked(false)
    }

    const showPreviousImage = () => {
        if(clickedImageNumber > 0 ) {
            setClickedImageNumber(clickedImageNumber-1)
        }
    }

    const showNextImage = () => {
        if(clickedImageNumber < images.length -1) {
            setClickedImageNumber(clickedImageNumber+1)
        }
    }



    return (<>
                {isPlaceImageClicked ?
                <>{images && 
                    <div className='place-images-window d-flex flex-column'>
                            <div className='place-images-window-controls d-flex  align-items-center'>
                                <div className='col-4 d-flex align-items-center' onClick={closePlaceImages} style={{cursor: "pointer"}}>
                                    <div className='d-flex align-items-center me-1'>
                                        <img src="/assets/close-icon-white.png" alt="heart-icon" style={{height:"15px", width:"15px"}}/>
                                    </div>
                                    <div>
                                        Close
                                    </div>
                                </div>
                                <div className='col-4'>
                                    {clickedImageNumber+1}/{images.length}
                                </div>
                                <div className='col-4 d-flex align-items-center justify-content-end'>
                                    <img src="/assets/heart-icon-white.png" alt="heart-icon" style={{height:"17px", width:"17px"}}/>
                                </div>
                            </div>
                            
                            <div className='place-images-window-frame d-flex align-items-center justify-content-center'>
                                    <Row className='place-images-window-frame'>
                                        <div className='place-images-window-frame-left-arrow d-none d-sm-flex col-1 justify-content-start p-0'>
                                            {clickedImageNumber > 0 && 
                                                <div className='d-flex align-items-center me-1' onClick={showPreviousImage} style={{cursor: "pointer"}}>
                                                    <img src="/assets/left-arrow-white.png" alt="heart-icon" style={{height:"30px", width:"30px"}}/>
                                                </div>
                                            }
                                        </div>
                                        <div className='col-sm-10 col-12 p-0 px-sm-3' d-flex >
                                            {images?.[clickedImageNumber] ? 
                                            <img className='clicked-place-image' src={images[clickedImageNumber]} alt={`image ${clickedImageNumber}`}/>
                                            :
                                            <img className='clicked-place-image' src="/assets/image-placeHolder.jpg" alt="image placeHolder" />

                                            }
                                        </div>
                                        <div className='place-images-window-frame-right-arrow d-none d-sm-flex col-1 justify-content-end p-0 ' onClick={showNextImage} style={{cursor: "pointer"}}>
                                            {clickedImageNumber +1 < images.length && 
                                                <div className='d-flex align-items-center justify-content-end me-1'>
                                                    <img src="/assets/right-arrow-white.png" alt="heart-icon" style={{height:"30px", width:"30px"}}/>
                                                </div>
                                            }
                                            
                                        </div>
                                    </Row>
                               
                            </div>
                    
                    </div>
                }</>
                :
                <>
                <MainNavbar padding="80px"/>
                <div className='places d-flex flex-column'>
                    <div className='place-heading'>
                        Place heading placeholder
                    </div>
                    <div className='place-heading-information d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <div className='place-rating d-flex align-items-center'>
                                {/* shows only if exist */}
                                <img src="/assets/star-icon.png" alt="star icon" style={{height:"12px", marginRight: "3px"}}/>
                                <div>4.3</div>
                            </div>
                            <div className='mx-1'>·</div>
                            <div className='place-reviews'>
                                {/* shows only if exist */}
                                <div><u><span className='review'>52</span>  reviews</u></div>
                            </div>
                            {/* <div className='place-superhost'>
                            </div> */}
                            <div className='mx-2'>·</div>
                            <div className='place-location'>
                               <u> {location?.town? <>{location.town},</> : <></>} {location? <>{location.city}</> : <>City</>}, {location? <>{location.country}</> : <>Country</>} </u>
                            </div>

                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='me-2'>Share</div>
                            <div>Save</div>
                        </div>
                    </div>
                    <div >
                    <div className='place-images row'>
                        
                            <div className='col-6 image-left' onClick={openPlaceImages}>
                                    {images && images[0]
                                    ? <img src={images[0]} alt="image 1" />
                                    : <img src="/assets/image-placeHolder.jpg" alt="image placeHolder" />}
                            </div>

                            <div className='col-6'>
                                <div className='row pb-2'>
                                    <div className='col-6' onClick={openPlaceImages}>
                                        {images && images[1]
                                        ? <img src={images[1]} alt="image 2" />
                                        : <img src="/assets/image-placeHolder.jpg" alt="image placeHolder" />
                                        }
                                    </div>
                                    <div className='col-6  image-right-top' onClick={openPlaceImages}>
                                        {images && images[2]
                                        ? <img src={images[2]} alt="image 3" />
                                        : <img src="/assets/image-placeHolder.jpg" alt="image placeHolder" />
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6' onClick={openPlaceImages}>
                                        {images && images[3]
                                        ? <img src={images[3]} alt="image 4" />
                                        : <img src="/assets/image-placeHolder.jpg" alt="image placeHolder" />
                                        }

                                    </div>
                                    <div className='col-6 image-right-bottom' onClick={openPlaceImages}>
                                        {images && images[4]
                                        ? <img src={images[4]} alt="image 5" />
                                        : <img src="/assets/image-placeHolder.jpg" alt="image placeHolder" />
                                        }

                                    </div>
                                </div>
                        </div>
                        
                       
                        
                    </div>
                    </div>
                    <div className='place-main d-flex justify-content-between'>
                        <div className='place-about '>
                            <div className='place-about-heading d-flex justify-content-between'>
                                <div className='d-flex flex-column'>
                                    <div className='place-about-text'>
                                        <span className='me-1'>{privacyType}</span>hosted by<span className='ms-1'>{username}</span>
                                    </div>
                                    <div className='place-about-floor-plan d-flex'>
                                        <span className='me-1 guests'>{floorPlan?.numOfGuests}</span>
                                        guests 
                                        <span className='mx-1'>·</span>
                                        <span className='me-1 bedrooms'>{floorPlan?.numOfBedrooms}</span>
                                        bedrooms 
                                        <span className='mx-1'>·</span>
                                        <span className='me-1 beds'>{floorPlan?.numOfBeds}</span>
                                        beds
                                        <span className='mx-1'>·</span>
                                        <span className='me-1 bathrooms'>{floorPlan?.numOfBathrooms}</span>
                                        baths
                                    </div>

                                </div>
                                
                                <div  className='d-flex align-items-center'>
                                    {userData?.profilePicture
                                    ? <img className='place-profile-picture' src={userData.profilePicture} alt="profile placeholder" />

                                    : <img className='place-profile-picture' src="/assets/profile-placeholder.jpg" alt="profile placeholder" />
 


                                    }
                                </div>
                            </div>
                            <div className='form-divider-light my-4'></div>

                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-column mb-4'>
                                    <div className='fw-bold' style={{fontSize:"1.1rem"}}>
                                     {username} is a Superhost
                                    </div>
                                    <div className='place-summary-text'>
                                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                    </div>

                                </div>
                                <div className='d-flex flex-column mb-4'>
                                    <div className='fw-bold'>
                                    Great location
                                    </div>
                                    <div className='place-summary-text'>
                                    100% of recent guests gave the location a 5-star rating.
                                    </div>

                                </div>
                                <div className='d-flex flex-column'>
                                    <div className='fw-bold'>
                                    Free cancellation before Sep 2.
                                    </div>

                                </div>

                            </div>

                            <div className='form-divider-light my-4'></div>
                           
                            <div className='place-explanation'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>

                            <div className='form-divider-light my-4'></div>

                            <div className='d-flex flex-column'>
                                <div className='fw-bold place-offers-heading mb-4' style={{fontSize:"1.6rem"}}>What this place offers</div>
                                <div className='d-flex flex-column'>
                                    <div className='mb-2'>Wifi</div>
                                    <div className='mb-2'>Dedicated workspace</div>
                                    <div className='mb-2'>Pool</div>
                                    <div >Smoke alarm</div>
                                </div>

                            </div>

                            <div className='form-divider-light my-4'></div>


                        </div>

                        <div className='place-reservation flex-column form-frame-light form-shadow'>
                            <div className='d-flex align-items-center justify-content-between flex-wrap mb-2'>
                                <div className='d-flex align-items-center'>
                                    <div className='me-1 '> <b>$ {placeData?.dailyPrice} </b></div>
                                    
                                </div>
                                <div className='reservation-rating-review d-flex align-items-end'> 
                                    <div className='rating'>
                                       4.88
                                    </div>
                                    <div className='mx-1'>·</div>
                                    
                                    <div className='review me-1 '>64 </div>
                                    <div> reviews</div>
                                    
                                </div>
                            </div>
                            <div className='d-flex reservation-form flex-column form-frame my-2'>
                                <div className='d-flex check-date'>
                                    <div className='check-in d-flex flex-column'>
                                        <div>CHECK-IN</div>
                                        <div className='checkin-date'>9/16/2023</div>
                                    </div>
                                    
                                    <div className='check-out d-flex flex-column'>
                                        <div>CHECKOUT</div>
                                        <div className='checkout-date'>9/16/2023</div>
                                    </div>
                                </div>
                                <div className='form-divider'></div>
                                <div className='check-guests d-flex flex-column'>
                                    <div>GUESTS</div>
                                    <div className='guest-number'>1 Guest</div>
                                </div>
                            </div>
                            <div className='main-button d-flex justify-content-center align-items-center my-2'>Reserve</div>
                            {/* <div className='d-flex justify-content-center mx-2'>You won't be charged yet</div> */}
                            <div className='d-flex justify-content-between mt-3'>
                                <div > <u>$ {placeData?.dailyPrice} x 5 nights</u></div>
                                <div>$ {placeData?.dailyPrice * 5}</div>
                            </div>
                            <div className='form-divider-light my-4'></div>
                            <div className='d-flex justify-content-between fw-bold'>
                                <div>Total before taxes</div>
                                <div>$ {placeData?.dailyPrice * 5}</div>
                            </div>
                            
                        </div>

                    </div>
                    <div className='place-reservation-mobile flex-column form-frame-light form-shadow'>
                            <div className='d-flex align-items-center justify-content-between flex-wrap mb-2'>
                                <div className='d-flex align-items-center'>
                                    <div className='me-1 '> <b>$ {placeData?.dailyPrice} </b></div>
                                    
                                </div>
                                <div className='reservation-rating-review d-flex align-items-end'> 
                                    <div className='rating'>
                                       4.88
                                    </div>
                                    <div className='mx-1'>·</div>
                                    
                                    <div className='review me-1 '>64 </div>
                                    <div> reviews</div>
                                    
                                </div>
                            </div>
                            <div className='d-flex reservation-form flex-column form-frame my-2'>
                                <div className='d-flex check-date'>
                                    <div className='check-in d-flex flex-column'>
                                        <div>CHECK-IN</div>
                                        <div className='checkin-date'>9/16/2023</div>
                                    </div>
                                    
                                    <div className='check-out d-flex flex-column'>
                                        <div>CHECKOUT</div>
                                        <div className='checkout-date'>9/16/2023</div>
                                    </div>
                                </div>
                                <div className='form-divider'></div>
                                <div className='check-guests d-flex flex-column'>
                                    <div>GUESTS</div>
                                    <div className='guest-number'>1 Guest</div>
                                </div>
                            </div>
                            <div className='main-button d-flex justify-content-center align-items-center my-2'>Reserve</div>
                            {/* <div className='d-flex justify-content-center mx-2'>You won't be charged yet</div> */}
                            <div className='d-flex justify-content-between mt-3'>
                                <div > <u>$ {placeData?.dailyPrice} x 5 nights</u></div>
                                <div>$ {placeData?.dailyPrice * 5}</div>
                            </div>
                            <div className='form-divider-light my-4'></div>
                            <div className='d-flex justify-content-between fw-bold'>
                                <div>Total before taxes</div>
                                <div>$ {placeData?.dailyPrice * 5}</div>
                            </div>
                            
                        </div>
                </div>
                </>
                
                
                } 
                
            </>)
}

export default Places;