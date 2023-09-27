import { useState } from "react";
import { Button, Form } from "react-bootstrap"

const Prices = (props) => {
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(price !== "" && !isNaN(+price) && price > 0) {
            props.price(price)
            props.isFormSubmit(true)
        } else {
            console.log("invalid input!")
        }
    }

    return (
        <div className="container">
            <div className="d-flex row g-3">
                <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                    What is the daily price for airbnb?
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-frame px-2" >
                        <div className="input-price-header form-header d-flex justify-content-start">Price</div>
                        <Form.Control className="input-additional form-input shadow-none" type="string" placeholder="Daily price ($)" onChange={(e) => setPrice(e.target.value)} required/>
                    </Form.Group>
                    <div style={{textAlign:"right"}}>
                    <button className="become-host-next-button" type="submit">Next</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Prices;