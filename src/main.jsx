
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PlayerContextProvider } from './context/PlayerContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { PlaylistContextProvider } from './context/PlaylistContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
    <PlayerContextProvider>
        <SearchProvider>
<PlaylistContextProvider>
  <App />
</PlaylistContextProvider>
        </SearchProvider>
      </PlayerContextProvider>
    </AuthProvider>
  </BrowserRouter>

)
