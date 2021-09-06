import React, { FC, useState } from "react";
import { ethers, Contract } from "ethers";
import Erc20__factory from "../../../../../contracts/types.json";
import { TOKEN_ADDR } from "../../../../constants/contract";

const Index: FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [account, setAccount] = useState<string>();
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>();

  const getContract = (): Contract | null => {
    if (!provider) return null;
    else {
      const signer = provider.getSigner();
      const contract = new Contract(TOKEN_ADDR, Erc20__factory, provider);
      return contract;
    }
  };

  const connect = async () => {
    if (!window.ethereum?.request) {
      alert("MetaMask is not installed!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setProvider(provider);
    setAccount(accounts[0]);
  };

  const getTokenBalance = async (): Promise<void> => {
    const contract = getContract();
    if (provider && account && contract) {
      const rawBalance = await contract.balanceOf(account);
      const totalSupply = await contract.totalSupply();
      const decimals = await contract.decimals();

      const balance = ethers.utils.formatUnits(rawBalance, decimals);

      console.error(balance, totalSupply, account);
      setTokenBalance(balance);
      setTotalSupply(totalSupply);
    }
  };

  const mint = () => {
    const contract = getContract();
    if (contract) {
      contract.mint(20);
    }
  };

  return (
    <>
      <button onClick={connect}>Connect</button>
      <p>Account: {account}</p>
      <button onClick={getTokenBalance}>Get Token Balance</button>
      <p>Token Balance: {tokenBalance}</p>
      <p>Total supply: {totalSupply.toString()}</p>
      <button onClick={mint}>Mint account</button>
    </>
  );
};

export default Index;
