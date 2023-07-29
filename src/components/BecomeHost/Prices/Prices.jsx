import { Button, Form } from "react-bootstrap"

const Prices = () => {

    const submitFormAndNext = () => {
        //TODO: create the place & save db. Redirect to place page.
    }
    return (
        <div className="container">
            <div className="d-flex row g-3">
                <div className="place-question col-12 d-flex justify-content-left align-items-left mb-3"> 
                    What is the daily price for airbnb?
                </div>
                <Form className="form-frame">
                    <Form.Group>
                        <div className="input-price-header form-header d-flex justify-content-start">Price</div>
                        <Form.Control className="input-additional form-input shadow-none" type="string" placeholder="Daily price"/>
                    </Form.Group>
                </Form>
            </div>
            <Button onClick={() => {submitFormAndNext()}}>Next</Button>
        </div>
    )
}

export default Prices;