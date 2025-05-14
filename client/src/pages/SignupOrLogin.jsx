import { useFirebase } from "../context/Firebase";

const SignupOrLogin = () => {   
    const { signupWithGoolge } = useFirebase();

    const handleGoogleSignup = () => {
        signupWithGoolge();
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Signup or Login</h1>
            <button
                onClick={handleGoogleSignup}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Sign up with Google
            </button>
        </div>
    )
}

export default SignupOrLogin;