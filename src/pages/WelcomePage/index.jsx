import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WelcomePage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[100vh] gap-2">
      <h3 className="text-5xl bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 font-medium text-transparent bg-clip-text">
        WELCOME TO GOOGLE FONT - clone
      </h3>
      <span className="animate-spin mt-10 text-3xl text-blue-400">
        <FontAwesomeIcon icon={faSpinner} />
      </span>
    </div>
  )
}

export default WelcomePage
