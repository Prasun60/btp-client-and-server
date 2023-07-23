import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import Navbar1 from "../components/Navbar1";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  const [result, setResult] = useState([]);
  const [searchfield, setsearchfield] = useState("");

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    console.log(campaigns)
    // console.log("today"+ new Date(form.deadline).getTime())
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <>
    <Navbar1 setResult={setResult} setsearchfield={setsearchfield}/>
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
      result={result}
      searchfield={searchfield}
    />
    </>
  );
};

export default Home;
