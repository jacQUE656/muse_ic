import { Toaster } from "react-hot-toast";
import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import SideBar from "./components/SideBar.jsx";
import Player from "./components/Player.jsx";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext.jsx";
import MaximizePlayerOverlay from "./components/MaximizePlayerOverlay.jsx";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword.jsx";
import EmailVerification from "./components/EmailVerifiation.jsx";
import PasswordUpdate from "./components/PasswordUpdate.jsx";
import MuseLandingPage from "./components/MuseLandingPage.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.jsx";
import MobileNav from "./components/MobileNav.jsx";
const App = () => {

  const {audioRef , next ,track ,isMaximized, toggleMaximize} = useContext(PlayerContext);
  return (

    <>
      <Toaster />
<Routes>
  <Route path="/" element={<MuseLandingPage />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/verify-email" element={<EmailVerification />} />
  <Route path="/update-password" element={<PasswordUpdate />} />
  <Route path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

<Route path="*" element={
  <AuthWrapper>
        {isMaximized && <MaximizePlayerOverlay/>}
        <div className="h-screen bg-black">
          <div className="h-[90%] flex">
            <SideBar/>
            <Display />
            
          </div>
          {/* PLAYER COMPONENT */}
       <footer className="flex-shrink-0 z-50">
                {/* Bottom padding on mobile to prevent the player hiding behind the Nav */}
                <div className="pb-[75px] md:pb-0">
                  <Player />
                </div>
                <MobileNav />
              </footer>
          <audio
          ref={audioRef}
          src={track ? track.file : null}
          preload="auto"
          onEnded={next}
          ></audio>
        </div>
      </AuthWrapper>
} />

</Routes>

   
    </>

 
  )
}
export default App;