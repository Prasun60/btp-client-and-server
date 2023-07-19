import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
// import { useState } from "react";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/Context";
import { Link, useHistory } from "react-router-dom";
import  Loader  from "./Loader";

const Login1 = () => {
  // const userRef = useRef();
  // const passwordRef = useRef();

  const [email, setemail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setpass] = useState("");
  const { dispatch, isFetching } = useContext(Context);
  const history = useHistory();
  // console.log(userRef.current.value,passwordRef.current.value)
  console.log(email, pass);
  // const handleSubmit = async (e) => {
  //   // console.log(email, pass);
  //   e.preventDefault();
  //   dispatch({ type: "LOGIN_START" });
  //   try {
  //     const config = { headers: { type: "application/json" } };
  //     const { res } = await axios
  //       .post(
  //         "http://localhost:5000/login",
  //         {
  //           email: email,
  //           password: pass,
  //         },
  //         config
  //       )
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     console.log(res);
  //     dispatch({ type: "LOGIN_SUCCESS", payload: res.data }).then(
  //       history.push("http://localhost:3000/home")
  //     );
  //     console.log(res.data);
  //   } catch (err) {
  //     dispatch({ type: "LOGIN_FAILURE" });
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const config = {
        headers: {
          type: "application/json",
          //Access-Control-Allow-Origin: "*",
        },
      };
      // const response = await axios("https://btp-server.onrender.com/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     //"Access-Control-Allow-Origin": "http://localhost:3000",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password: pass,
      //   }),
      // });
      setIsLoading(true);
      const response = await axios.post(
        "https://btp-server.onrender.com/login",
        {
          email: email,
          password: pass,
        }
        // config
      );
      setIsLoading(false);
      console.log(response);
      const { data } = response; // Destructure 'data' property from response
      console.log(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      history.push("/home");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(err);
    }
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden"  style={{"display":"flex","height":"600px"}}>
   
      {isLoading && <Loader name="Loggin in"/>}
      <motion.dev
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl "
        style={{ "width": "40%" }}
      >
        {/* <p className={styles.sectionSubText}></p> */}
        <h3 className={styles.sectionHeadText}>Login</h3>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              className="bg-tertiary1 py-4 px-6 placeholder:text-secondary1 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              type="string"
              name="password"
              onChange={(e) => setpass(e.target.value)}
              placeholder="Password"
              className="bg-tertiary1 py-4 px-6 placeholder:text-secondary1 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            disabled={isFetching}
            className="bg-tertiary1 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary1 rounded-xl"
          >
            Login
          </button>
          <button
            type="submit"
            disabled={isFetching}
            className="bg-tertiary1 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary1 rounded-xl"
          >
            <Link to="/signup">Don't have an account signup instead</Link>
          </button>
        </form>
      </motion.dev>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] "
        style={{ "width": "50%" ,
        // "float":"right",
        "position":"absolute",
        "right":"0",        
      }}
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Login1, "login1");
