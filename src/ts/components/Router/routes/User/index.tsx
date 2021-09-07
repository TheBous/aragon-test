import React, { FC, useEffect, useState } from "react";
import { ethers, Contract, providers } from "ethers";
import abi from "../../../../../contracts/types.json";
import { TOKEN_ADDR } from "../../../../constants/contract";
import Input from "../../routes/Login/atoms/Input";
import Coins from "./atoms/Coins";

const User: FC = () => {
  const [contract, setContract] = useState<Contract>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.Signer>();
  const [account, setAccount] = useState<string>();
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>();
  const [addressToSend, setAddressToSend] = useState<string>("");
  const [amountToSend, setAmountToSend] = useState<string>("");

  useEffect(() => {
    if (provider && account) {
      provider.on("block", async () => {
        const balance = await provider.getBalance(account);
        const balanceInEth = ethers.utils.formatEther(balance);
        setTokenBalance(balanceInEth);
      });
    }
  }, [provider, account]);

  const connect = async () => {
    if (window.ethereum) {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(TOKEN_ADDR, abi, provider);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);

      getAccount(contract, signer);
    }
  };

  const getAccount = async (contract: Contract, signer: ethers.Signer) => {
    if (contract && signer) {
      const [personalAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(personalAccount);
    }
  };

  const getTokenBalance = async (): Promise<void> => {
    if (provider && account && contract) {
      const totalSupply = await contract.totalSupply();
      const rawBalance = await contract.balanceOf(ethers.utils.formatEther(account));

      setTokenBalance(rawBalance);
      setTotalSupply(totalSupply);
    }
  };

  const mint = () => {
    if (contract && signer) {
      const contractSigner = contract.connect(signer);
      contractSigner.mint(123456789);
    }
  };

  const send = async () => {
    if (contract && signer) {
      const constractSigner = contract.connect(signer);
      const transition = await constractSigner.transfer(
        addressToSend,
        ethers.utils.parseUnits(amountToSend, 6)
      );
    }
  };

  return (
    <>
      <button onClick={connect}>Connect 🦊</button>
      <p>Account: {account}</p>
      <button onClick={getTokenBalance}>Get Token Balance</button>
      <p>Token Balance: {tokenBalance}</p>
      <p>Total supply: {totalSupply.toString()}</p>
      <p>
        <button onClick={mint}>Mint account</button>
      </p>
      <p>
        <Input
          id="address"
          hasError={false}
          placeholder="Address to send"
          type="text"
          onInputChange={(e) => setAddressToSend(e.currentTarget.value)}
        />
        <Input
          id="amount"
          hasError={false}
          placeholder="Amount"
          type="text"
          onInputChange={(e) => setAmountToSend(e.currentTarget.value)}
        />
        <button onClick={send}>Send</button>
      </p>
      <Coins />
    </>
  );
};

export default User;
