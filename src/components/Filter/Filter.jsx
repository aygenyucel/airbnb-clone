import { useRef, useState } from "react";
import { links } from "../../assets/images-links.js"
import "./filter.scss"
import { useEffect } from "react";

const Filter = (props) => {
    const ref = useRef(null);
    const [scrollX, setScrollX] = useState(0); // For detecting start scroll postion
    const [scrollEnd, setScrollEnd] = useState(false); // For detecting end of scrollin

    const [selectedStructure, setSelectedStructure] = useState(null)

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

    const selectStructure = (e) => {
        if(e.target.innerText !== ""){
            setSelectedStructure(e.target.innerText )
        } else {
            setSelectedStructure(e.target.alt)
        }
        console.log(e)
    }

    useEffect(() => {
        props.structure(selectedStructure)
    }, [selectedStructure])
    
    return (
        <>
        <div className="filter-div d-flex align-items-center">
            {scrollX > 0 && (
                <div className="left-arrow" onClick={() => slide(-ref.current.offsetWidth)}>
                    <img src="assets/left-arrow.png" alt="left arrow" />
                </div>
            )}
            <div className="filter-categories d-flex "  ref={ref}>
                {links.map((filter, i) => (
                    
                    <div key={i} className={` links-box d-flex flex-column align-items-center justify-content-center `} defaultValue={filter.label} onClick={selectStructure}>
                        <img src={filter.imgSrc} alt={filter.label} defaultValue={filter.label} /> 
                        <div  defaultValue={filter.label}>{filter.label}</div>
                        <div className={`selected-filter-line`}  defaultValue={filter.label}></div>
                    </div>
                ))}
            </div>
            {!scrollEnd && (
                <div className="right-arrow align-items-center justify-content-center" onClick={() => slide(+ref.current.offsetWidth)} >
                    <img src="assets/right-arrow.png" alt="right arrow" />
                </div>
            )}
            
            <div className="filters-button d-flex align-items-center justify-content-center">
                <img className="d-flex align-items-center" src="assets/filter-icon.png" alt="" />
                <div className="d-flex align-items-center">Filters</div>
               
            </div>
            
        </div>
        <div className="filler"></div>
        </>
    )
}

export default Filter;