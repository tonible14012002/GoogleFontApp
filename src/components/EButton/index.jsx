import { Link } from 'react-router-dom'

const EButton = ({ onClick, href, children, disabled = false, to, className, ...passProps }) => {
  var Com = 'button'
  const props = { onClick, disabled, ...passProps }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') delete props[key]
    })
  }

  if (to) {
    props.to = to
    Com = Link
  } else if (href) {
    props.href = href
    props.target = '_blank'
    Com = 'a'
  }

  return (
    <Com className={`${disabled && 'opacity-[80%]'} ${className}`} {...props}>
      {children}
    </Com>
  )
}

export default EButton
