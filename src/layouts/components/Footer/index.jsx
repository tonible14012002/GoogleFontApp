import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

import EButton from "../../../components/EButton"


const Footer = () => {
    return (
        <footer className="bg-slate-100 h-[120px] text-slate-500 font-medium mt-10 text-sm">
            <div className="w-full max-w-[1800px] h-full px-2 laptop:px-16 tablet:px-4 m-auto flex items-center justify-between">
                <section>
                © 2023 Bui Ngoc Nam Anh. All rights reserved.
                </section>
                <section className="text-lg flex gap-4">
                    <EButton href="https://www.facebook.com/namanh.bui.549/">
                        <FontAwesomeIcon icon={faFacebook} />
                    </EButton>
                    <EButton href="https://github.com/tonible14012002">
                        <FontAwesomeIcon icon={faGithub}/>
                    </EButton>
                    <EButton href="https://www.instagram.com/14maroon/">
                        <FontAwesomeIcon icon={faInstagram} />
                    </EButton>
                    <EButton>
                        <FontAwesomeIcon icon={faDiscord}/>
                    </EButton>
                </section>
            </div>
        </footer>
    )
}

export default Footer