import EButton from '../EButton'

const SelectorOption = ({ value, index, onSelect, isSelected, children, className, ...props }) => {
  const handleButtonPress = () => {
    onSelect(value, index)
  }

  return (
    <EButton
      {...props}
      className={`px-4 py-2 text-left overflow-hidden transition-all active:opacity-70
                    ${isSelected ? 'bg-slate-200 hover:bg-slate-100' : 'hover:bg-slate-50'} 
                    ${className}`}
      onClick={handleButtonPress}
    >
      {children}
    </EButton>
  )
}

export default SelectorOption
