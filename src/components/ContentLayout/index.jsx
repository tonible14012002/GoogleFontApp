

const ContentLayout = ({children, className}) => {
    return (
        <div className={`max-w-[1800px] px-2 laptop:px-16 tablet:px-4 m-auto ${className}`}>
            {children}
        </div>
    )
}

export default ContentLayout