'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

interface AuthSliderProps {
  initialMode?: 'login' | 'register'
}

export default function AuthSlider({ initialMode = 'login' }: AuthSliderProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/
    return re.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      if (!validateEmail(email)) {
        toast({
          title: "Error de inicio de sesión",
          description: "Por favor, ingrese un correo electrónico válido",
          variant: "destructive",
        })
        return
      }
      if (!validatePassword(password)) {
        toast({
          title: "Error de inicio de sesión",
          description: "La contraseña debe tener al menos 8 caracteres",
          variant: "destructive",
        })
        return
      }
      try {
        const response = await axios.post('http://localhost:4000/api/auth/login', {
          username: email,
          password
        })
        localStorage.setItem('token', response.data.body)
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de vuelta!",
        })
        navigate('/home')
      } catch (error) {
        toast({
          title: "Error de inicio de sesión",
          description: "Email o contraseña incorrectos",
          variant: "destructive",
        })
      }
    } else {
      if (!username || !name || !lastName || !email || !phone || !password) {
        toast({
          title: "Error de registro",
          description: "Por favor, complete todos los campos",
          variant: "destructive",
        })
        return
      }
      if (!validateEmail(email)) {
        toast({
          title: "Error de registro",
          description: "Por favor, ingrese un correo electrónico válido",
          variant: "destructive",
        })
        return
      }
      if (!validatePassword(password)) {
        toast({
          title: "Error de registro",
          description: "La contraseña debe tener al menos 8 caracteres",
          variant: "destructive",
        })
        return
      }
      if (!validatePhone(phone)) {
        toast({
          title: "Error de registro",
          description: "Por favor, ingrese un número de teléfono válido (10 dígitos)",
          variant: "destructive",
        })
        return
      }
      try {
        await axios.post('http://localhost:4000/api/usuarios', {
          nombre: name,
          apellido: lastName,
          correo: email,
          telefono: phone,
          activo: 1,
          username,
          password
        })
        toast({
          title: "Registro exitoso",
          description: "Ahora puedes iniciar sesión con tu nueva cuenta.",
        })
        setIsLogin(true)
      } catch (error: any) {
        toast({
          title: "Error de registro",
          description: error.response?.data?.body || "No se pudo completar el registro. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    }
  }

  const handleGoogleLogin = async () => {
    toast({
      title: "Inicio de sesión con Google",
      description: "Funcionalidad en desarrollo",
    })
  }

  const toggleMode = () => {
    setIsLogin(prev => !prev)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-8 bg-opacity-50 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className='w-full max-w-screen-xl mx-auto px-2 flex justify-center'> 
        <div className="w-full min-w-[50vw] max-w-[90vw] h-[650px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex relative mx-auto"> 
          <Button
            variant="outline"
            size="icon"
            className="absolute top-5 right-5 z-10"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="relative w-full h-full flex overflow-hidden">
            {/* Panel de formulario */}
            <div className="w-full h-full flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${isLogin ? '0%' : '-50%'})` }}>
              {/* Formulario de Inicio de Sesión */}
              <div className="w-1/2 min-w-[50%] p-12 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                  <div>
                    <Label htmlFor="login-email" className="text-left block mb-1">Correo electrónico</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password" className="text-left block mb-1">Contraseña</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                    Iniciar Sesión
                  </Button>
                </form>
                <Button onClick={handleGoogleLogin} className="mt-4 w-full max-w-md bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                  Iniciar sesión con Google
                </Button>
              </div>

              {/* Formulario de Registro */}
              <div className="w-1/2 min-w-[50%] p-12 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Registrarse</h2>
                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                  <div>
                    <Label htmlFor="register-username" className="text-left block mb-1">Nombre de usuario</Label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Tu nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-name" className="text-left block mb-1">Nombre</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-lastname" className="text-left block mb-1">Apellido</Label>
                    <Input
                      id="register-lastname"
                      type="text"
                      placeholder="Tu apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-email" className="text-left block mb-1">Correo electrónico</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-phone" className="text-left block mb-1">Teléfono</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="Tu número de teléfono"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password" className="text-left block mb-1">Contraseña</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                    Registrarse
                  </Button>
                </form>
              </div>
            </div>

            {/* Panel lateral de cambio de modo */}
            <div 
              className={`absolute top-0 bottom-0 w-1/2 bg-cyan-500 text-white p-12 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${
                isLogin ? 'right-0' : 'translate-x-full'
              }`}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                {isLogin ? '¿Nuevo aquí?' : '¿Ya tienes una cuenta?'}
              </h2>
              <p className="text-lg mb-8 text-center">
                {isLogin ? 'Regístrate y comienza tu viaje con nosotros' : 'Inicia sesión para continuar tu experiencia'}
              </p>
              <Button
                onClick={toggleMode}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-500 font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

