import { useRef, useState } from "react";
import { links } from "../../assets/images-links.js"
import "./filter.scss"

const Filter = () => {
    const ref = useRef(null);
    const [scrollX, setScrollX] = useState(0); // For detecting start scroll postion
    const [scrollEnd, setScrollEnd] = useState(false); // For detecting end of scrollin

    const windowSize = useRef([window.innerWidth, window.innerHeight])

    const slide = (shift) => {
        ref.current.scrollLeft += shift - 55;
        setScrollX(scrollX + shift);

         //For checking if the scroll has ended
        if (
            Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
            ref.current.offsetWidth
        ) {
            setScrollEnd(true);
        } else {
            setScrollEnd(false);
        }
    }
    
    return (
        <div className="filter-div d-flex align-items-center">
            {scrollX > 0 && (
                <div className="left-arrow" onClick={() => slide(-ref.current.offsetWidth)}>
                    <img src="assets/left-arrow.png" alt="left arrow" />
                </div>
            )}
            <div className="filter-categories d-flex "  ref={ref}>
                {links.map((filter, i) => (
                    <div key={i} className="links-box d-flex flex-column align-items-center justify-content-center">
                        <img src={filter.imgSrc} alt={filter.label} />
                        <div>{filter.label}</div>
                        <div className="selected-filter-line"></div>
                    </div>
                ))}
            </div>
            {!scrollEnd && (
                <div className="right-arrow d-flex align-items-center justify-content-center" onClick={() => slide(+ref.current.offsetWidth)} >
                    <img src="assets/right-arrow.png" alt="right arrow" />
                </div>
            )}
            
            <div className="filters-button d-flex align-items-center justify-content-center">
                <img className="d-flex align-items-center" src="assets/filter-icon.png" alt="" />
                <div className="d-flex align-items-center">Filters</div>
               
            </div>
            
        </div>
    )
}

export default Filter;