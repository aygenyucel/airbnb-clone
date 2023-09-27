import Filter from "../../components/Filter/Filter";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import "./home.scss"
import Card from './../../components/Card/Card';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { isAuthorizedAction } from "../../redux/actions";
import CustomTooltip from "../../components/CustomTooltip/CustomTooltip";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const userData = useSelector(state => state.userReducer?.data);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const dispatch = useDispatch();
    const [allPlaces, setAllPlaces] = useState(null)
    const BE_DEV_URL = process.env.REACT_APP_BE_DEV_URL;

    const navigate = useNavigate();

   


    useEffect(() => {

        fetchPlaces().then((places) => {console.log("xxxx", places); setAllPlaces(places)});

        //checking if user authorized on first render
        isAuthorizedAction(userData, dispatch)
        .then((boolean) => {
            if(boolean === true) {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        })
        .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const fetchPlaces =  () => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                      },
                    
                }
                const response = await fetch(`${BE_DEV_URL}/places`, options)
                if(response.ok) {
                    const places = await response.json();
                    console.log("ppplaces:", places);
                    setAllPlaces(places);
                    resolve(places)
                }
                else {
                    console.log("error when fetching!")
                }

                
            } catch (error) {
                console.log("oppps, error when fetching places! ", error);
                reject(error)
            }
        })
    }

    return (
        <div className="home-page">
                <MainNavbar isHomePage= {true}/>
            
            <Filter/>
            {/* {isAuthorized && <div>Authorized!!!!!!!!!!!!!!!!! {userData?.email}</div>} */}
            <div className="home-page-cards d-flex flex-row">
                    <div className="row justify-content-center">
                        {allPlaces?.reverse().map((place) => 
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" onClick={() => navigate(`/places/${place._id}`)}>
                             <Card place= {place}/>
                         </div>
                        )}
                        {/* <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <Card/>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <Card/>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <Card/>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <Card/>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <Card/>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <Card/>
                        </div> */}
                        
                        
                    </div>
            </div>
        </div>
    )
}

export default Home;