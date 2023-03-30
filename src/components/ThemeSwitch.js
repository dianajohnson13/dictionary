import '../styles/ThemeSwitch.css';

function ThemeSwitch({
    checked,
    onToggle
}) {
    return (
        <label className="switch">
            <input
                type="checkbox"
                aria-label="dark mode"
                checked={checked}
                onClick={onToggle}
            />
            <span className="slider" />
        </label>
    );
}

export default ThemeSwitch;