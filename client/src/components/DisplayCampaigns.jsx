import React from "react";
import { useHistory } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "../components/FundCard";
const DisplayCampaigns = ({ title, isLoading, campaigns,result,searchfield }) => {
  const history = useHistory();
  if(result===undefined){
    result=[]
  }
  if(searchfield===undefined){
    searchfield=""
  }
  const filteredCampaigns = result.length > 0 ? result : searchfield.length>0? ["No result found"]:campaigns;
  console.log(filteredCampaigns)
  let count=0
  for(let i=0;i<campaigns.length;i++){
    if(campaigns[i].deadline>=new Date().getTime()){
      count++;
    }
  }

  const handleNavigate = (campaign) => {
    history.push(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  if(filteredCampaigns[0]==='No result found'){
    return (
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({count})
        <h2>No mataching Results</h2>
      </h1>
      </div>
    )
  }

  if(filteredCampaigns!=campaigns){
    return (
      <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({count})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && filteredCampaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}
        {!isLoading &&
          filteredCampaigns.length > 0 &&
          filteredCampaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
    )
  }
 return (
    
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({count})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
