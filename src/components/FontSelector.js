import { useState, useEffect, useCallback } from 'react';

import '../styles/FontSelector.css';
import DownChevron from '../assets/down-chevron.svg';

export default function FontSelector({
    selected,
    options,
    onSelect
}) {
    const [ open, setOpen ] = useState(false);
    const fontOptions = Object.keys(options);

    const getNext = (key) => {
        const activeOption = document.activeElement.getAttribute('data-value');
        const activeIdx = activeOption ? fontOptions.indexOf(activeOption) : undefined;
        let nextIdx;
        if (key === "ArrowDown"){
            // if none active OR  is last in list, go to top of list
            if (activeIdx === undefined || activeIdx === fontOptions.length - 1) {
                nextIdx = 0;
            } else {
                nextIdx = activeIdx ? activeIdx + 1 : 1;
            }
        } else {
            // if none active OR is first in list, go to bottm of list
            if (activeIdx === undefined || activeIdx === 0) {
                nextIdx = fontOptions.length - 1;
            } else {
                nextIdx = activeIdx ? activeIdx - 1 : -1;
            }
        }
        return fontOptions[nextIdx];
    }

    const handleKeyDown = useCallback((event) => {
        const { key } = event;

       if (key !== "Tab") event.preventDefault();

        // open if closed
        const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; 
        if (!open && openKeys.includes(key)) {
            toggleOpen();
            return;
        }

        if (open) {
            if (key === 'ArrowDown' || key === 'ArrowUp') {
                const next = getNext(key);
                const nextOption = document.getElementById(next);
                if (nextOption) nextOption.focus();
            } else if (key === 'Escape' || key === 'Tab') {
                toggleOpen();
            } else if (key === 'Enter' || key === ' ') {
                const activeOption = document.activeElement.getAttribute('data-value');
                if (activeOption) onSelect(activeOption);
                toggleOpen();
            }
        }

       // TO-DO: "Home" and "End" move the selected option when open or closed
    }, [open])

    const toggleOpen = useCallback(() => {
        setOpen(!open);
    }, [open])

    const onClickOutsideSelect = useCallback((event) => {
        const customSelect = document.getElementById('custom-select');
        const didClickedOutside = !customSelect.contains(event.target);
        if (didClickedOutside) {
            toggleOpen();
            document.removeEventListener("click", onClickOutsideSelect, true);
        }
    }, [toggleOpen])

    const selectFont = (event) => {
        const newSelection = event.target.getAttribute('data-value');
        toggleOpen();
        onSelect(newSelection);
    }

    const switchFocusWithHover = (event) => {
        event.target.focus();
    }

    useEffect(() => {
        if (open) {
            document.getElementById('font-options').focus();
            document.addEventListener("click", onClickOutsideSelect, true);

            return () => window.removeEventListener('click', onClickOutsideSelect);
        }
    }, [open, onClickOutsideSelect]);

    return (
        <div id="custom-select" className='custom-select-container' onKeyDown={handleKeyDown}>
            <div
                id="select-selected"
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
            <ul
                role="listbox"
                tabIndex="-1"
                id="font-options"
                className={`select-items${!open ? ' select-hide' : ''}`}
            >
                {fontOptions.map((option) => (
                    <li
                        id={option}
                        tabIndex="-1"
                        role="option"
                        aria-selected={option === selected}
                        key={option}
                        data-value={option}
                        style={{fontFamily: options[option]}}
                        onClick={selectFont}
                        onMouseEnter={switchFocusWithHover}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}