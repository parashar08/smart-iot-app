import { useState } from 'react';   
import { FaGoogle } from 'react-icons/fa';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const SignupOrLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [message, setMessage] = useState(null);

    const { signupUserWithEmailAndPassword, loginWithEmailAndPassword, signupWithGoogle } = useFirebase();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                await loginWithEmailAndPassword(email, password);
                setMessage('Login successful');
                navigate('/home');
            } catch (error) {
                setMessage('Login failed');
            }
        } else {
            try {
                await signupUserWithEmailAndPassword(email, password);
                setMessage('Signup successful');
                navigate('/home');
            } catch (error) {
                setMessage('Signup failed');
            }
        }
        setEmail('');
        setPassword('');
        setMessage(null);
    }

    const handleGoogleSignIn = async () => {
        await signupWithGoogle();
        navigate('/home');
        setMessage(null);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center px-6 py-16">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 text-center">
                <h1 className="text-3xl font-bold text-green-700">{isLogin ? 'Welcome Back!' : 'Create new account'}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} placeholder='example@gamil.com' 
                        required 
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                        required
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button 
                        type='submit'
                        className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >{isLogin ? 'Login' : 'Signup'}</button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-2 text-gray-400">or</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                <button
                onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer"
                    >
                    <FaGoogle className="text-red-500" />
                    <span className="font-medium">Continue with Google</span>
                </button>
                <p className="text-gray-600 mt-4">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="text-green-600 font-semibold hover:underline ml-1 cursor-pointer"
                    >
                        {isLogin ? 'Signup' : 'Login'}
                    </button>
                </p>
                {message ? <p className='text-red-400'>{message}</p> : ''}
            </div>
        </div>
    )
}

export default SignupOrLogin;
