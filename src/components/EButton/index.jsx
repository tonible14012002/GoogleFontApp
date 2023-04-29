import { Link } from "react-router-dom"

const EButton = ({
    onClick,
    href,
    children,
    disabled=false,
    to,
    className,
    ...passProps
}) => {

    var Com = 'button'
    const props = {onClick, disabled, ...passProps}

    // clear listener if disabled
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function')
                delete props[key]
        })
    }

    if (to) {
        props.to = to;
        Com = Link
    } else if (href) {
        props.href = href
        props.target = "_blank"
        Com = 'a'
    }

    return (
        <Com
            className={` ${className} ${disabled && 'opacity-[80%]'}`}
            {...props}
        >
        {children}
        </Com>
    )
}

export default EButton