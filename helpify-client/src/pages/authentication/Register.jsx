import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registerLottie from '../../assets/register.json'
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import Lottie from "lottie-react";


const Register = () => {
    const { createUser,googleLogIn } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        if (!password.match(/[a-z]/)) {
            return 'Password must contain a lowercase letter.';
        }
        if (!password.match(/[A-Z]/)) {
            return 'Password must contain an uppercase letter.';
        }
        return '';
    };


    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        const passwordValidationError = validatePassword(password);
        setPasswordError(passwordValidationError);

        if (passwordValidationError) {
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                });


            })

            .then(() => {

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                });
                navigate(location.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGoogleLogIn = () => {
            googleLogIn()
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Google Login Successful!',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                    navigate(location?.state || '/');
                })
                .catch(error => {
                    console.error("Google Login Error:", error);
                    const errorMessage = "Google login failed. Please try again.";
                    Swal.fire({
                        icon: 'error',
                        title: 'Google Login Error!',
                        text: errorMessage
                    });
                })
        }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="flex-1 p-8 rounded-xl  shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Registetion Now !</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <label className="block mb-1  font-medium">Name :</label>
                    <input
                        type="text"
                        placeholder="Name"
                        name='name'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <label className="block mb-1  font-medium">Email :</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <label className="block mb-1  font-medium">Photo URL :</label>
                    <input
                        type="text"
                        placeholder="Photo Url"
                        name='photo'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <label className="block mb-1  font-medium">Password :</label>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            name='password'
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute top-3 right-4 text-xl'

                        >{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
                    </div>
                    <span className="text-red-500 text-sm">{passwordError}</span>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                    >
                        Register
                    </button>
                </form>

                <div className="my-4 text-center text-gray-500">OR</div>

                <div className=" mb-4">
                    <button onClick={()=>handleGoogleLogIn()}  className="btn w-full bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/SignIn" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
            <div className="flex-1 md:block   hidden">
                <Lottie style={{ width: "320px", height: "400px" }} animationData={registerLottie} />
            </div>
        </div>
    );
};

export default Register;