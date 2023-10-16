import {Logo} from '../components'
import main from '../assets/images/main-alternative.svg'
import Wrapper from '../assets/wrappers/LandingPage'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
<Logo/>
            </nav>
            <div className="container page">
                {/* info */}
                <div className='info'>
                    <h1>
                         job <span>tracking</span> app
                    </h1>
                    <p>
                        paragraph paragraph paragraph paragraph paragraph paragraph
                        paragraph paragraph paragraph paragraph paragraph paragraph

                    </p>
                    <button className='btn-hero'> login/register</button>
                </div>
                <img src={main} alt='job hunt' className='img main-img'/>
            </div>
        </Wrapper>
    )
}


export default Landing