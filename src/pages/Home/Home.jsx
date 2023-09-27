/* eslint-disable react-hooks/exhaustive-deps */
import Filter from "../../components/Filter/Filter";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import "./home.scss"
import Card from './../../components/Card/Card';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { isAuthorizedAction } from "../../redux/actions";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
    const userData = useSelector(state => state.userReducer?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [allPlaces, setAllPlaces] = useState(null)
    const [filteredStructure, setFilteredStructure] = useState(null)
    const BE_DEV_URL = process.env.REACT_APP_BE_DEV_URL

    //fetch all places and check if user authorized
    useEffect(() => {
        fetchPlaces().then((places) => {setAllPlaces(places)});

        isAuthorizedAction(userData, dispatch)
        .then((boolean) => {
            if(boolean === true) {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        })
        .catch(err => console.log(err))
    }, [])

    //whenever filtered structure changes, navigate the url with search query in it
    useEffect(() => {
        if(filteredStructure){
            navigate(`/?structure=${filteredStructure}`)
            fetchPlaces()
        } else {
            fetchPlaces()
        }
    }, [filteredStructure])

    //whenever searchparams in the url changes, update the values 
    useEffect(() => {
        // let params = new URLSearchParams(document.location.search);
        const newStructure = searchParams.get("structure");
        setFilteredStructure(newStructure)
    }, [searchParams])

    const fetchPlaces =  () => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                      },
                }
                if(filteredStructure) {
                    const response = await fetch(`${BE_DEV_URL}/places?structure=${filteredStructure}`, options)
                    if(response.ok) {
                        const places = await response.json();
                        setAllPlaces(places);
                        resolve(places)
                    }
                    else {
                        console.log("error when fetching!")
                    }
    
                } else {
                    const response = await fetch(`${BE_DEV_URL}/places`, options)
                    if(response.ok) {
                        const places = await response.json();
                        setAllPlaces(places);
                        resolve(places)
                    }
                    else {
                        console.log("error when fetching!")
                    }
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
            <Filter structure = {(selectedStructure) => setFilteredStructure(selectedStructure)} />
            <div className="home-page-cards d-flex flex-row">
                <div className="row justify-content-center">
                    {allPlaces?.reverse().map((place) => 
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" onClick={() => navigate(`/places/${place._id}`)}>
                            <Card place= {place}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;