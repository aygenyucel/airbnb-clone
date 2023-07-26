import { useLocation } from "react-router-dom";
import BecomeHostNavbar from "../../components/BecomeHostNavbar/BecomeHostNavbar";
import PlaceStructure from "../../components/PlaceStructure/PlaceStructure";
import { useEffect } from "react";

const BecomeHost = () => {

    const location = useLocation()
    const path = location.pathname.slice(location.pathname.lastIndexOf("/"))

    useEffect(() => {
        console.log(path)
    }, [])

    return <div className="become-host">
        <BecomeHostNavbar/>
        <div>fjksdfk</div>
        <div className="d-flex justify-content-center">
            { (path === "/structure") &&
            <div>
                <PlaceStructure/>
            </div> 
            
            }
            { (path === "/privacy-type") &&
            <div>
                privacy typee
            </div> 
            
            }
        </div>
    </div>
}

export default BecomeHost;
