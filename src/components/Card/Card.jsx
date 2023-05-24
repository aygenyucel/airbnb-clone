import "./card.scss";
import {cards} from "../../assets/cards-list.js";

const Card = () => {

    return (
        <div className="place-card d-flex flex-column">
            <div className="card-img">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=960" alt="" />
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