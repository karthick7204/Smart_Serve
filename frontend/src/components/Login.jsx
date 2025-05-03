import React from "react";
import landingbg from '../images/landingbg.jpg';
import {motion} from 'framer-motion';
export function Login(){
    return(
      
        <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${landingbg})` }}>
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <motion.div
           initial={{ opacity: 0, y: -30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 2, ease: 'easeOut' }}
          
          className=" bg-opacity-90 p-8 rounded-2xl shadow-xl w-80"  style={{ backgroundColor: '#826802' }}>
            <h2 className="text-black text-2xl text-center font-bold">Login</h2>
            <form className="space-y-4">
                
                <input
                   type="text"
                   placeholder="Enter Your name"
                   className="mt-3 px-4 py-2 w-full border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />  
                <input
                   type="text"
                   placeholder="Enter your restaurant"
                   className="mt-2 px-4 py-2 w-full border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />  
                <button type="submit" className="w-full text-black py-2 rounded-lg hover:bg-blue-700 transition" style={{ backgroundColor: '#fcdb59' }}>Signup</button>
                <button type="submit" className="w-full text-black py-2 rounded-lg">new restaurant?<span className="hover:text-blue-400 ml-1">Register</span></button>

            </form>
            </motion.div>  
      </div>
        </motion.div>
    )
}