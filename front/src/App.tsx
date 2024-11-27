import { Route, Routes } from 'react-router-dom'
import './App.css'
import { DarkModeProvider } from './interfaces/DarkMode'
import Home from './pages/Home'
import Notas from './pages/Notas'
import Perfil from './pages/Perfil'
import CrearNota from './pages/CrearNota'
import EditarNota from './pages/EditarNota'
import AuthSlider from './pages/AuthSlider'

function App() {
  


  return (
    <>
   <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<AuthSlider/>} />
        <Route path="/notas/crearNota" element={<CrearNota />} />
        <Route path="/notas/editarNota" element={<EditarNota id={0} />} />
      </Routes>
    </DarkModeProvider>
      
    </>
  )
}

export default App
