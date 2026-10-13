import { useState } from "react";
import background from '../../assets/bg.png'
import { Link, useNavigate } from "react-router-dom";
import { backendConfigurationError, backendUrl } from '../../config/backend';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!backendUrl) {
            setError(backendConfigurationError);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${backendUrl}/login`, {
                method: 'POST',
                body: JSON.stringify({ email: email.trim(), password }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.userId));
                localStorage.setItem('token', data.token);
                setEmail("");
                setPassword("");
                navigate('/');
            }
            else {
                setError(
                    data.message ||
                    (response.status === 401 || response.status === 400
                        ? "Invalid email/username or password."
                        : `Login failed (HTTP ${response.status}).`)
                );
            }
        } catch (error) {
            console.error("Login request failed:", error);
            setError(`Could not reach the login service at ${backendUrl}. Make sure the backend is running.`);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center"
                style={{
                    backgroundImage: `url(${background}),
          -webkit-linear-gradient(bottom, #98c642, #227022)` }}>
                <div className="w-full max-w-sm">
                    <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div>
                            <h1 className="text-center text-3xl font-bold">Login Form</h1>
                        </div>
                        <div className="mb-4 mt-7">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email or Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email or Username" autoComplete="username" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" autoComplete="current-password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="bg-[#70c55f] hover:bg-[#227022] text-white font-bold py-2 text-center w-full rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </div>
                        {error && <p className="mt-3 text-center text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200" role="alert">{error}</p>}
                        <div className="mt-3 text-center">
                            <Link to="/signup" className="text-blue-600 hover:underline">Don't have an account? Sign Up</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
