import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { signup } from '../../firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {refreshUserData} = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (!email || !password || !name) {
          setError("Enter All The Credential");
          return;
        }
        if (password.length < 6) {
          setError("Password Must Have At least 6 Charector");
          return;
        }
        setLoading(true)
        setError("");
        const user = await signup(name, email, password);
        
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email,
          })
        );
        await refreshUserData(user.uid)
        alert("SignUp Successfuly")
        navigate('/dashboard', { replace: true })
    }catch(err){
       setError(err.message);
    }finally{
      setLoading(false)
    }
  };


  return (
    <>
    <div className='flex relative w-md'>
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">SignUp Here</h1>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="name"
        >
        Name
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="name"
          type="name"
          placeholder="Enter your name"
          autoComplete="name"
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        {error && (
          <p className="text-red-500 text-sm hover:underline">{error}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
         {loading ? "Signing up..." : "Signup"}
      </button>

      <p className="mt-4 text-center text-gray-600 text-sm">
        Already have an account {" "}
        <Link to='/login' className="text-blue-500 hover:underline">
          login
        </Link>
      </p>
    </form>
    <div className='absolute top-1 right-1 cursor-pointer font-bold text-xl'>
            <Link to={"/"}><RxCross2 /></Link>
        </div>
        </div>
    </>
  )
}
