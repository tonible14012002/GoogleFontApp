import ReactDOM from 'react-dom'

const Modal = ({ children, className }) => {
  return ReactDOM.createPortal(
    <div className="fixed z-50 top-0 left-0 bottom-0 right-0 pointer-events-none">
      <div className={`relative h-[100vh] w-full pointer-events-none ${className}`}>
        <div className="w-fit h-fit pointer-events-auto">{children}</div>
      </div>
    </div>,
    document.querySelector('body')
  )
}

export default Modal
