import Filter from "../../components/Filter/Filter";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import "./home.scss"
import Card from './../../components/Card/Card';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { isAuthorizedAction } from "../../redux/actions";

const Home = () => {
    const dispatch = useDispatch();
    const JWTToken = localStorage.getItem("JWTToken");
    const userData = useSelector(state => state.userReducer?.data);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        //checking if user authorized on first render
        isAuthorizedAction(userData, JWTToken, dispatch)
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

    return (
        <div className="home-page">
            <MainNavbar/>
            <Filter/>
            {isAuthorized && <div>Authorized!!!!!!!!!!!!!!!!! {userData?.email}</div>}
            <div className="home-page-cards d-flex flex-row">
                    <div className="row justify-content-center">
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
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <Card/>
                        </div>
                        
                        
                    </div>
            </div>
        </div>
    )
}

export default Home;