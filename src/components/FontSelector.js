import { useState, useEffect, useCallback } from 'react';

import '../styles/FontSelector.css';
import DownChevron from '../assets/down-chevron.svg';

export default function FontSelector({
    selected,
    options,
    onSelect
}) {
    const [ open, setOpen ] = useState();
    const fontOptions = Object.keys(options);

    const onKeyDownInMenu = useCallback((event) => {
        console.log('down', event)
    }, [])

    const toggleOpen = useCallback(() => {
        const openSesame = !open;
        setOpen(openSesame);
    }, [open])

    const onClickOutsideSelect = useCallback((event) => {
        const customSelect = document.getElementById('custom-select');
        const didClickedOutside = !customSelect.contains(event.target);
        if (didClickedOutside) toggleOpen();
    }, [toggleOpen])

    const onSelectFont = useCallback((event) => {
        const newSelection = event.target.getAttribute('data-value');
        toggleOpen();
        onSelect(newSelection);
    }, [toggleOpen, onSelect])

    useEffect(() => {
        document.getElementById("font-options").addEventListener("click", onSelectFont, true);
        document.getElementById("font-options").addEventListener("keydown", onKeyDownInMenu);

        return () => {
            window.removeEventListener("click", onSelectFont);
            window.removeEventListener("keydown", onKeyDownInMenu);
        }
    }, [onSelectFont, onKeyDownInMenu]);

    useEffect(() => {
        if (open) {
            document.getElementById('font-options').focus();
            document.addEventListener("click", onClickOutsideSelect);

            return () => window.removeEventListener('click', onClickOutsideSelect);
        }
    }, [open, onClickOutsideSelect]);

    return (
        <div id="custom-select" className='custom-select-container'>
            <div
                role="combobox"
                aria-label="Choose a font"
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls="font-options"
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