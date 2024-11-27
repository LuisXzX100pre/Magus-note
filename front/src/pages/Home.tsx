import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer"
import Header from "../components/Header"
import Quotes from "../components/Quotes"
import SearchBar from "../components/SearchBar"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast'

function Home() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const handleLogout = () => {
        localStorage.removeItem('token')
        toast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión exitosamente.",
        })
        navigate('/')
    }

    const handleCreateNotes = () => {
        navigate('/notes')
    }

    return (
        <>
            <Header />
            
            <div className="max-w-screen-lg mx-auto px-2 h-[530px] flex flex-col justify-center items-center gap-8 box-border">
                <h1 className="text-7xl font-bold text-center motion-preset-flomoji-🚀 ">Magus Notes</h1>
                <p className="text-2xl font-light text-center">"Toma notas, crea ideas, y nunca dejes de aprender."</p>
                <Button onClick={handleCreateNotes} className="px-3 py-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 transition-colors motion-preset-shake">Crear Notas</Button>
                <Button onClick={handleLogout} className="mt-4">Cerrar sesión</Button>
            </div>

            <SearchBar/>
            <Quotes/>
            <Footer/>
        </>
    )
}

export default Home