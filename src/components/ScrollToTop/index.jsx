import { useEffect } from "react";

const ScrollToTop = ({children}) => {
    
    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    return (
        <>{children}</>
    )
}

export default ScrollToTop  