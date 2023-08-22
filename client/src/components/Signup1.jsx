import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import axios from "axios";
import { Link } from "react-router-dom";
import  Loader  from "./Loader";
import {rotaract} from "../assets"
import { useStorageUpload } from "@thirdweb-dev/react";
import { useDropzone } from "react-dropzone";
import swal from 'sweetalert2';




import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});



const Signup1 = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  
  const [image, setImage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");


  const [file, setFile] = useState(null);
  const { mutateAsync: upload } = useStorageUpload();

  // const uploadtoipfs = async (e) => {
  //   const uploadurl = await upload({ 
  //     data: [file],
  //     options:{
  //       uploadWithGatewayUrl:true,
  //       uploadWithoutDirectory: true
  //     }
  //    });
  //   console.log(uploadurl);
  // }


  // const onDrop = useCallback(
  //   async (acceptedFiles) => {
  //     setIsLoading(true);
  //     const uris = await upload({ data: acceptedFiles });
  //     setIsLoading(false);
  //     swal.fire
  //     ({  
  //       title: 'Image Uploaded Successfully',
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //       confirmButtonColor: '#1dc071',
  //     })
  //     console.log(uris);
  //     // setForm((prevForm) => ({ ...prevForm, image: uris }));
  //     setImage(uris[0])
  //     console.log(image)
  //   },
  //   [upload]
  // );
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // const [uris, setUris] = useState([]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      console.log("signup");
      setIsLoading(true);
      if(password !== confirmPassword){
        swal.fire
        ({
          title: 'Passwords do not match',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1dc071',
        })
        setIsLoading(false);
        return;
      }
      
      if(!name|| !email || !password || !image){
        swal.fire
        ({
          title: 'Please fill all the fields',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1dc071',
        })
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        "https://prasun-btp-server.onrender.com/signup",
        {
          name,
          email,
          password,
          image
        }
      )
      setIsLoading(false);
      window.location.replace("/login");
      swal.fire
      ({
        title: 'Signed Up Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#1dc071',
      })
    } catch (err) {
      setError(true);
      console.log(err.response.data.message);
      swal.fire
      ({
        title: err.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#1dc071',
      })
      setIsLoading(false);
    }
  };

  const onChange=async(e)=>{
    const file = e.target.files[0]
    setFile(file)
    try {
      setIsLoading(true);
      const added = await ipfs.add(file)
      setIsLoading(false);
      const url = `https://skywalker.infura-ipfs.io/ipfs/${added.path}`
      console.log(url)
      // setForm({ ...form, image: url });
      setImage(url)
      swal.fire
      ({
        title: 'Image Uploaded Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#1dc071',
      })

    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

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
      style={{ "width": "40%","position":"absolute","marginBottom":"-15px" }}
    >
        {/* <p className={styles.sectionSubText}></p> */}
        <h3 className={styles.sectionHeadText}>Sign Up</h3>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-2 text-xs" >
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
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-tertiary1 py-4 px-6 placeholder:text-secondary1 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <sapn className="text-white font-medium mb-4">confirm Password</sapn>
            <input
              type="password"
              name="confirmpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Renter password"
              className="bg-tertiary1 py-4 px-6 placeholder:text-secondary1 text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          {/* <div {...getRootProps()}
            type="submit"
            className="bg-tertiary1 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary1 rounded-xl mt-3"
          >
            <input {...getInputProps()}  
         />
           Choose Profile Picture
          </div> */}

          {/* <div style={{color:"white"}}>
            <input  type="file" onChange={(e)=>{
              if(e.target.files){
                setFile(e.target.files[0])
                // console.log(e.target.files[0])
              }
            }}  />
            <button onClick={uploadtoipfs}>upload</button>
          </div> */}

          
<input
        type="file"
        onChange={onChange}
        style={{"color":"white"}}
      />






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
        "marginBottom":"10px"
            
      }}
      >
        <EarthCanvas />
      </motion.div>
    </div></div>
  );
};

export default SectionWrapper(Signup1, "signup1");
