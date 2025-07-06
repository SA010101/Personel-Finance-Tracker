import Navbar from '../LandingPage/Navbar'
import LandingBanner from '../LandingPage/LandingBanner'
import BenifitList from '../LandingPage/BenifitList'
import UserInfo from '../LandingPage/UserInfo'
import HowItWork from '../LandingPage/HowItWork'
import Feedback from '../LandingPage/Feedback'
import Footer from '../LandingPage/Footer'

function Landing() {
  return (
    <div>
        <Navbar/>
        <LandingBanner/>
        <BenifitList/>
        <UserInfo/>
        <HowItWork/>
        <Feedback/>
        <Footer/>
    </div>
  )
}

export default Landing
