import { useState } from "react"
import { Link } from "react-router-dom"
import Exclude from "../assets/exclude.svg"
import { useDarkMode } from "../interfaces/DarkMode"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="px-4 shadow">
            <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 md:flex-row md:items-center md:justify-between ">
                <Link to="/home" className="flex items-center gap-5">
                    <img src={Exclude} alt="Exclude Icon" className="w-6" />
                    <h2 className={`mr-2 text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Magus Notes</h2>
                </Link>

                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="absolute right-0 top-4 md:hidden"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
                    <ul className="flex flex-col md:flex-row gap-4 md:items-center">
                        <li>
                            <Link to="/" className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} hover:text-cyan-500 transition-colors`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} hover:text-cyan-500 transition-colors`}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} hover:text-cyan-500 transition-colors`}>
                                        Notas
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link to="/notas">Mis Notas</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to="/crear-nota">Crear Nota</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>
                            <Link to="/login" className="rounded-xl border-2 border-cyan-600 px-6 py-2 font-medium text-cyan-500 hover:bg-cyan-600 hover:text-white transition-colors">
                                LogIn
                            </Link>
                        </li>
                        <li>
                            <button onClick={toggleDarkMode} className="bg-gray-500 box-border p-[10px] rounded-full cursor-pointer hover:bg-gray-600 transition-colors">
                                {isDarkMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun motion-preset-shake"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" className="bi bi-moon-stars-fill motion-preset-shake" viewBox="0 0 16 16">
                                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                                        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                                    </svg>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header

