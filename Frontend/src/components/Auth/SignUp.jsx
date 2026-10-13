import React, { useState } from "react";
import background from '../../assets/bg.png';
import { Link, useNavigate } from "react-router-dom";
import { backendConfigurationError, backendUrl } from '../../config/backend';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Email and password are required.");
            return;
        }

        if (!backendUrl) {
            setError(backendConfigurationError);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${backendUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    password,
                    phone: phone.trim(),
                    weight,
                    height,
                    age,
                    gender,
                    activityLevel
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.userId));
                localStorage.setItem('token', data.token);
                navigate("/");
            } else {
                setError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error('Error registering user:', err);
            setError(`Cannot connect to server at ${backendUrl}. Please ensure backend is running.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center"
                style={{
                    backgroundImage: `url(${background}),
          -webkit-linear-gradient(bottom, #98c642, #227022)` }}>
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div>
                            <h1 className="text-center text-3xl font-bold">Signup Form</h1>
                        </div>
                        {error && (
                            <p className="mt-4 mb-2 text-center text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200" role="alert">
                                {error}
                            </p>
                        )}
                        <div className="mb-4 mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email *
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password *
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                    Age
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="age" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                                    Weight (kg)
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="weight" type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                                    Height (cm)
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="height" type="number" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username (Login ID)
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                Gender
                            </label>
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activityLevel">
                                Activity Level
                            </label>
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                                <option value="">Select Activity Level</option>
                                <option value="Sedentary">Sedentary</option>
                                <option value="Lightly active">Lightly active</option>
                                <option value="Moderately active">Moderately active</option>
                                <option value="Very active">Very active</option>
                                <option value="Super active">Super active</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-[#70c55f] hover:bg-[#227022] text-white font-bold py-2 text-center w-full rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="/login" className="text-blue-600 hover:underline">Already have an account? Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
