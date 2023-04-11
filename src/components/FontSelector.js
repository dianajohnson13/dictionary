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
        document.getElementById("font-options").addEventListener("keydown", onKeyDownInMenu);

        return () => {
            window.removeEventListener("click", onSelectFont);
            window.removeEventListener("keydown", onKeyDownInMenu);
        }
    }, []);

    useEffect(() => {
        if (open) {
            document.getElementById('font-options').focus();
            document.addEventListener("click", onClickOutsideSelect);

            return () => window.removeEventListener('click', onClickOutsideSelect);
        }
    }, [open]);

    const onKeyDownInMenu = (event) => {
        console.log('down', event)
    }

    const onClickOutsideSelect = (event) => {
        const customSelect = document.getElementById('custom-select');
        const didClickedOutside = !customSelect.contains(event.target);
        if (didClickedOutside) toggleOpen();
    }

    const toggleOpen = () => {
        const openSesame = !open;
        setOpen(openSesame);
    }

    const onSelectFont = (event) => {
        const newSelection = event.target.getAttribute('data-value');
        toggleOpen();
        onSelect(newSelection);
    }

    return (
        <div id="custom-select" className='custom-select-container'>
            <div
                role="combobox"
                aria-label="Choose a font"
                aria-haspopup="true"
                aria-expanded={open}
                className="select-selected"
                onClick={toggleOpen}
                tabIndex={0}
            >
                {selected}
                <img src={DownChevron} className='selected-arrow' alt=""/>
            </div>
            <ul role="listbox" tabIndex="-1" id="font-options" className={`select-items${!open ? ' select-hide' : ''}`}>
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