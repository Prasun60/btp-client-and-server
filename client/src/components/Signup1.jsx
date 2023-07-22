import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import axios from "axios";
import { Link } from "react-router-dom";
import  Loader  from "./Loader";
import {rotaract} from "../assets"

const Signup1 = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      console.log("signup");
      setIsLoading(true);
      const response = await axios.post(
        "https://btp-server.onrender.com/signup",
        {
          name,
          email,
          password,
        }
      );
      setIsLoading(false);
      response.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div>
    <nav className="p-4 text-white" style={{"width":"100%","marginTop":"-100px","marginBottom":"400px","position":"absolute", "marginLeft":"-230px"}}>
      <div className="container mx-auto">
        <Link to="/" className="text-white font-bold text-xl" style={{"width":"50%","float":"left","height":"500px","width":"100px"}}>
        <img
          src={rotaract}
          alt="tag"
          className="w-[50px] h-[70px] object-contain"
          style={{"height":"100px","width":"100px"}}
        />
        </Link>
        {/* You can add other navbar links here */}
      </div>
      
    </nav>
  <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden parent"  style={{"display":"flex","height":"600px"}}>
 
    {isLoading && <Loader name="Signing up"/>}
    <motion.dev
      variants={slideIn("left", "tween", 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl form"
      style={{ "width": "40%","marginTop":"500px" }}
    >
        {/* <p className={styles.sectionSubText}></p> */}
        <h3 className={styles.sectionHeadText}>Sign Up</h3>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-6" >
          <label className="flex flex-col">
            <sapn className="text-white font-medium mb-4">Name</sapn>
            <input
              type="string"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-tertiary1 py-4 px-6 placeholder:text-secondary1 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <sapn className="text-white font-medium mb-4">Email</sapn>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-tertiary1 py-4 px-6 placeholder:text-secondary1 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <sapn className="text-white font-medium mb-4">Password</sapn>
            <input
              type="string"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-tertiary1 py-4 px-6 placeholder:text-secondary1 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary1 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary1 rounded-xl"
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="bg-tertiary1 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary1 rounded-xl"
          >
            <Link to="/login">Already, have an account Login instead</Link>
          </button>
        </form>
        </motion.dev>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] earth"
        style={{ "width": "50%" ,
        // "float":"right",
        "position":"absolute",
        "right":"0",   
            
      }}
      >
        <EarthCanvas />
      </motion.div>
    </div></div>
  );
};

export default SectionWrapper(Signup1, "signup1");
