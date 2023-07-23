import React, { useState, createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useMetadata } from "@thirdweb-dev/react";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xdA53C47370a844d2A22a1F512921f16449Ff6Ae7"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  //function to create new campaigns
  const publishCampaign = async (form) => {
    // console.log(address);
    // console.log(form.title, form.description, form.target);
    const a=new Date(form.deadline).getTime()
    console.log(a)
    try {
      const data = await createCampaign({
        args: [
          form.name,
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image[0],
        ],
      });
      console.log("Success");
      console.log(data);
    } catch (error) {
      console.log("failure");
      console.log(error);
    }
  };

  //function to get campaigns
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      name:campaign.name,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    // console.log(parsedCampaigns);
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        name: donations[2][i],
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
