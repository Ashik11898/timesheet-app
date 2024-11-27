import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon } from 'lucide-react'
import { axiosRequest } from '@/service/axiosHelper'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'
import { LoginResponse } from '@/types/user'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {setUser}=useUserContext()
  const navigate =useNavigate()


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await axiosRequest<LoginResponse>({
      method: 'POST',
      url: '/login',
      data:{email:email,password:password} // API endpoint
    });
    setUser(response && response.accessToken)
    navigate("/timesheetPage")
  }
  

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#257180]">
      <div className="w-full max-w-md bg-[#F2E5BF] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-[#257180] text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-left text-[#257180] text-lg font-medium">Email</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CB6040]" size={20} />
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-[#FD8B51] focus:border-[#CB6040] focus:ring-[#CB6040] bg-[#F2E5BF] text-[#257180] placeholder-[#CB6040]/50"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-left text-[#257180] text-lg font-medium">Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CB6040]" size={20} />
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border-2 border-[#FD8B51] focus:border-[#CB6040] focus:ring-[#CB6040] bg-[#F2E5BF] text-[#257180] placeholder-[#CB6040]/50"
                placeholder="••••••••"
              />
              <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center justify-center bg-transparent text-[#CB6040] hover:text-[#FD8B51] focus:outline-none focus:ring-2 focus:ring-[#CB6040] focus:ring-offset-1 focus:ring-offset-[#F2E5BF] rounded-md transition-colors duration-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                    {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#FD8B51] text-[#F2E5BF] hover:bg-[#CB6040] transition-colors duration-300 text-lg py-3">Sign In</Button>
          <div className="text-sm flex justify-between">
              <a href="#" className="font-medium text-[#CB6040] hover:text-[#FD8B51]">Forgot your password?</a>
          </div>
        </form>
        
      </div>
    </div>
  )
}

