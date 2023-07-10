import "./card.scss";
import {cards} from "../../assets/cards-list.js";
import { Carousel } from "react-bootstrap";

const Card = () => {
    const slideImages = [
        "https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=960",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
      ];
      
    return (
        <div className="place-card d-flex flex-column">
            {/* <div className="card-img">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=960" alt="" />

            </div> */}
            <div className="position-relative">
                <div className="favourite-icon-div position-absolute">
                    <img className="favourite-icon" src="/assets/heart-icon.svg" alt="favourite-icon" />
                </div>

                <Carousel interval={null}>
                    {
                        slideImages.map((img, index) => (
                            <Carousel.Item key={index}>
                                <div className="card-img">
                                    <img
                                    className="d-block w-100"
                                    src={img}
                                    alt="First slide"
                                    />
                                </div>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </div>
            
            <div className="card-info d-flex flex-column">
                <div className="d-flex justify-content-between">
                    <div className="card-info-location">
                        <span className="card-info-city">Nantes</span>, <span className="country">France</span>
                    </div>
                    <div className=" d-flex justify-content-center">
                        <div className="star-icon d-flex align-items-center me-1 "> <img src="assets/star-icon.png" alt="star icon" /> </div>
                        <div className="card-info-rating d-flex align-items-center">4.95</div>
                    </div>
                </div>
                <div className="card-info-middle d-flex flex-column align-items-start">
                    <div>Stay with <span className="card-info-user">Golwen</span> · <span className="card-info-user-job">Artist</span> </div>
                    <div><span className="card-info-start-date">Apr 30</span> - <span className="card-info-end-date">May 5</span></div>
                </div>
                <div className="card-info-bottom d-flex align-items-start mt-2">
                     <span className="card-info-price me-1">$ 260</span> night
                </div>
            </div>
        </div>
    )
}

export default Card;