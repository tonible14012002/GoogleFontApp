import EButton from "../EButton"

const SelectorOption = ({value, onSelect, isSelected, children, className,...props}) => {

    const handleButtonPress = () => {
        onSelect(value)
    }

    return (
        <EButton {...props}
            className={`px-4 py-2 text-left overflow-hidden hover:bg-slate-50 transition-all active:opacity-70 ${isSelected && "bg-slate-100"} ${className}`}
            onClick={handleButtonPress}
        >
            {children}
        </EButton>
    )
}

export default SelectorOption