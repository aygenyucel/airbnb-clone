import MainNavbar from './../../components/MainNavbar/MainNavbar';
import "./places.scss"
const Places = () => {
    return (<>
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
                               <u> Town, City, Country </u>
                            </div>

                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='me-2'>Share</div>
                            <div>Save</div>
                        </div>
                    </div>
                    <div className='place-images d-flex'>
                        <div className='image-left me-2'>
                            <img src="/assets/image-placeHolder.jpg" alt="image placeHolder" />
                        </div>
                        <div className='image-right d-flex flex-column'>
                            <div className='d-flex mb-2' >
                                
                                <div  className='me-2'><img src="/assets/image-placeHolder.jpg" alt="" /></div>
                                <div ><img src="/assets/image-placeHolder.jpg" alt="" /></div>
                                
                                {/* <img src="/assets/image-placeHolder.jpg" alt="" /> */}
                            </div>
                            <div className='d-flex' >
                                 <div className='me-2'><img src="/assets/image-placeHolder.jpg" alt="" /></div>
                                <div ><img src="/assets/image-placeHolder.jpg" alt="" /></div>
                                
                                {/* <img src="/assets/image-placeHolder.jpg" alt="" />
                                <img src="/assets/image-placeHolder.jpg" alt="" /> */}
                            </div>
                        </div>
                    </div>
                    <div className='place-main d-flex'>
                        <div className='place-about '>
                            <div className='place-about-heading d-flex justify-content-between'>
                                <div className='d-flex flex-column'>
                                    <div className='place-about-text d-flex'>
                                        <span className='me-1'>Entire Home </span> hosted by <span className='ms-1'>Username</span>
                                    </div>
                                    <div className='place-about-floor-plan d-flex'>
                                        <span className='me-1'>8</span> guests <span className='me-1 ms-1'>4</span> bedrooms <span className='me-1 ms-1'>4</span> beds <span className='me-1 ms-1'>3</span> baths
                                    </div>

                                </div>
                                <div  className='d-flex align-items-center'>
                                    fdsfsdf
                                </div>
                            </div>
                            <div className='form-divider-light my-3'></div>

                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-column mb-3'>
                                    <div className='fw-bold'>
                                     Username is a Superhost
                                    </div>
                                    <div>
                                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                    </div>

                                </div>
                                <div className='d-flex flex-column mb-3'>
                                    <div className='fw-bold'>
                                    Great location
                                    </div>
                                    <div>
                                    100% of recent guests gave the location a 5-star rating.
                                    </div>

                                </div>
                                <div className='d-flex flex-column'>
                                    <div className='fw-bold'>
                                    Free cancellation before Sep 2.
                                    </div>

                                </div>

                            </div>

                            <div className='form-divider-light my-3'></div>
                           
                            <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>

                            <div className='form-divider-light my-3'></div>

                            <div className='d-flex flex-column'>
                                <div className='fw-bold'>What this place offers</div>
                                <div className='d-flex flex-column'>
                                    <div>Wifi</div>
                                    <div>Dedicated workspace</div>
                                    <div>Pool</div>
                                    <div>Smoke alarm</div>
                                </div>

                            </div>

                            <div className='form-divider-light my-3'></div>


                        </div>

                        <div className='place-reservation d-flex flex-column form-frame-light form-shadow'>
                            <div className='d-flex align-items-center justify-content-between flex-wrap mb-2'>
                                <div className='d-flex align-items-center'>
                                    <div className='me-1 '> <b>$ 400</b></div>
                                    <div>night </div>
                                </div>
                                <div className='reservation-rating-review d-flex align-items-end'> 
                                    <div className='rating'>
                                       4.88
                                    </div>
                                    <div className='mx-1'>·</div>
                                    
                                    <div className='review '>64 </div>
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
                                <div > <u>$ 400 ₺ x 5 nights</u></div>
                                <div>$ 2,000</div>
                            </div>
                            <div className='form-divider-light my-3'></div>
                            <div className='d-flex justify-content-between fw-bold'>
                                <div>Total before taxes</div>
                                <div>$ 2,000 </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </>)
}

export default Places;