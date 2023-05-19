import { links } from "../../assets/images-links.js"
import "./filter.scss"

const Filter = () => {
    
    return (
        <div className="filter-div d-flex align-items-center">
            <div className="left-arrow">
                <img src="assets/left-arrow.png" alt="left arrow" />
            </div>
            <div className="filter-categories d-flex">
                {links.map((filter, i) => (
                    <div key={i} className="links-box d-flex flex-column align-items-center">
                        <img src={filter.imgSrc} alt={filter.label} />
                        <div>{filter.label}</div>
                        <div className="selected-filter-line"></div>
                    </div>
                ))}

            </div>
            <div className="right-arrow d-flex align-items-center justify-content-center">
                <img src="assets/right-arrow.png" alt="right arrow" />
            </div>
            <div className="filters-button d-flex align-items-center justify-content-center">
                <img className="d-flex align-items-center" src="assets/filter-icon.png" alt="" />
                <div className="d-flex align-items-center">Filters</div>
               
            </div>
            
        </div>
    )
}

export default Filter;