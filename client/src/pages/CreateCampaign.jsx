import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
// import { checkIfImage } from "../utils";
import { useStateContext } from "../context";
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

const CreateCampaign = () => {
  const history = useHistory();
  const { mutateAsync: upload } = useStorageUpload();
  const [uris, setUris] = useState([]);

  
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  
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
  //     setForm((prevForm) => ({ ...prevForm, image: uris }));
  //     // setUris(uris);
  //   },
  //   [upload]
  // );
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // // console.log( "deadline"+new Date(form.deadline).getTime())
    // console.log(form);

    // const uploadData = () => {
    //   // Get any data that you want to upload
    //   const dataToUpload = [...];

    //   // And upload the data with the upload function
    //   const uris = await upload({ data: dataToUpload });
    // }



    e.preventDefault();

    // Check if an image file has been selected
    if (!form.image) {
      alert("Please select an image.");
      return;
    }

    console.log("form image" +form.image)

    // if(form.image){
    //   console.log("inside if of image")
    //   console.log(form.image)
    //   return;
    // }

    setIsLoading(true);

    try {
   
  
      // Create the campaign with the image IPFS hash
      await createCampaign({
        ...form,
        target: ethers.utils.parseUnits(form.target, 18),
      });
  
      setIsLoading(false);
      history.push("/home");
    } catch (error) {
      console.error("Error uploading image to IPFS:", error);
      setIsLoading(false);
      alert("An error occurred while uploading the image. Please try again.");
    }



    // setIsLoading(true);
    // await createCampaign({
    //   ...form,
    //   target: ethers.utils.parseUnits(form.target, 18),
    // });
    // setIsLoading(false);
    // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    // history.push("/home");






    // checkIfImage(form.image, async (exists) => {
    //   if (exists) {
    //     setIsLoading(true);
    //     await createCampaign({
    //       ...form,
    //       target: ethers.utils.parseUnits(form.target, 18),
    //     });
    //     setIsLoading(false);
    //     history.push("/home");
    //   } else {
    //     alert("Provide valid image Url");
    //     setForm({ ...form, image: "" });
    //   }
    // });

    // console.log(form);
  };

  const onChange=async(e)=>{
    const file = e.target.files[0]
    try {
      setIsLoading(true);
      const added = await ipfs.add(file)
      setIsLoading(false);
      const url = `https://skywalker.infura-ipfs.io/ipfs/${added.path}`
      console.log(url)
      setForm({ ...form, image: url });
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
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your name*"
            placeholder="John doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign title*"
            placeholder="write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story*"
          placeholder="write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal*"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date*"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        {/* <FormField
          labelName="Campaign image*"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        /> */}
        {/* <div {...getRootProps()}>
          
          <div
            className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white  text-center min-h-[52px]  rounded-[10px] bg-[#a883ff] w-24`}
            // styles={{"width":"700px"}}
            // handleChange={(e) => handleFormFieldChange("image", e)}
          ><input {...getInputProps()}  
          //  handleChange={(e) => handleFormFieldChange("image", e)}
            />Choose Image</div>
        </div> */}


           

<input
        type="file"
        onChange={onChange}
        style={{"color":"white"}}
      />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
            // onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
