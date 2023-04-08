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
    });

    useEffect(() => {
        if (open) {
            const onClickOutsideSelect = (event) => {
                const customSelect = document.getElementById('custom-select');
                const didClickedOutside = !customSelect.contains(event.target);
                if (didClickedOutside) toggleOpen();
            }

            document.addEventListener("click", onClickOutsideSelect);
            return () => window.removeEventListener('click', onClickOutsideSelect);
        }
    }, [open]);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const onSelectFont = (event) => {
        const newSelection = event.target.getAttribute('data-value');
        toggleOpen();
        onSelect(newSelection);
    }

    return (
        <div id="custom-select" className='custom-select-container'>
            <div role="combobox" aria-label="Choose a font" className="select-selected" onClick={toggleOpen}>
                {selected}
                <img src={DownChevron} className='selected-arrow'/>
            </div>
            <ul role="listbox" id="font-options" className={`select-items${!open ? ' select-hide' : ''}`}>
                {fontOptions.map((option, idx) => (
                    <li
                        role="option"
                        aria-selected={option === selected}
                        key={idx}
                        data-value={option}
                        style={{fontFamily: options[option]}}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}