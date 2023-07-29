import { useLocation, useNavigate } from "react-router-dom";
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

const BecomeHost = () => {

    const location = useLocation()
    const path = location.pathname.slice(location.pathname.lastIndexOf("/"))
    const navigate = useNavigate();

    const [structure, setStructure] = useState(null);
    const [privacyType, setPrivacyType] = useState(null)

    useEffect(() => {
        console.log("hdskjsladhj", privacyType)
    }, [privacyType])

    const startForm = () => {
        navigate("structure")
    }
   
    return <div>
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
                <Location/>
                }
                { 
                (path === "/floor-plan") &&
                <FloorPlan/>
                }
                { 
                (path === "/photos") &&
                <Photos />
                }
                { 
                (path === "/prices") &&
                <Prices />
                }
                
                </div>
            </div>
        </div>
}

export default BecomeHost;
