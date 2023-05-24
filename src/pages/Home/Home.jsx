import Filter from "../../components/Filter/Filter";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import "./home.scss"
import Card from './../../components/Card/Card';

const Home = () => {
    return (
        <div className="home-page">
            <MainNavbar/>
            <Filter/>
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
                {/* <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Home;