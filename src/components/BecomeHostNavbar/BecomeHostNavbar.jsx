import "./becomeHostNavbar.scss";
const BecomeHostNavbar = () => {
    return (
        <div className="becomeHostNavbar">
            <div className='row d-flex align-items-center justify-content-between'>
                <div className='col-1 col-lg-4 d-flex align-items-center justify-content-start'>
                    <a href="/" className="logo">
                        <div className='d-flex align-items-center'>
                            <img className="airbnb-logo" src="/assets/airbnb-logo-black.png" alt="airbnb logo" />
                        </div>
                    </a>
                </div>
                <div className="becomeHostNavbar-right">
                    

                </div>
            </div>
        </div>
    )
}

export default BecomeHostNavbar;