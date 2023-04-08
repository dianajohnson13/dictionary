import { useState, useEffect } from 'react';

import '../styles/FontSelector.css';
import DownChevron from '../assets/down-chevron.svg';

export default function FontSelector({
    selected,
    options,
    onSelect
}) {
    const [ open, setOpen ] = useState();
    const fontOptions = Object.keys(options);

    useEffect(() => {
        document.getElementById("font-options").addEventListener("click", onSelectFont, true);
      })


    const toggleOpen = () => {
        setOpen(!open);
    }

    const onSelectFont = (event) => {
        const newSelection = event.target.getAttribute('data-value');
        toggleOpen();
        onSelect(newSelection);
    }

    return (
        <div className='custom-select-container'>
            <select
                name="font"
                onChange={onSelect}
                defaultValue={selected}
            >
                {fontOptions.map((option, idx) => (
                    <option key={idx} value={option} style={{fontFamily: option}}>
                        {option}
                    </option>
                ))}
            </select>
            <div className="select-selected" onClick={toggleOpen}>
                {selected}
                {/* TO DO: add arrow*/}
                <img src={DownChevron} className='selected-arrow'/>
            </div>
            <ul id="font-options" className={`select-items${!open ? ' select-hide' : ''}`}>
                {fontOptions.map((option, idx) => (
                    <li key={idx} data-value={option} style={{fontFamily: options[option]}}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}