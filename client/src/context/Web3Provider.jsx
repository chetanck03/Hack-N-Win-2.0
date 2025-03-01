import { useEffect, useState } from "react"; 
import { Web3Context } from "./Web3Context"; 
import { getWeb3State } from "../utils/getWeb3State"; 
import { handleAccountChange } from "../utils/handleAccountChange"; 
import { handleChainChange } from "../utils/handleChainChange"; 

const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    contractInstance: null,
    selectedAccount: null,
    chainId: null,
    networkName: null,
    signer: null,
    provider: null
  });

  const handleWallet = async () => {
    try {
      const { contractInstance, selectedAccount, chainId, networkName, signer, provider } = await getWeb3State();
      setWeb3State({ contractInstance, selectedAccount, chainId, networkName, signer, provider });

      // Persist entire web3State in localStorage
      localStorage.setItem('web3State', JSON.stringify({ selectedAccount, chainId, networkName }));
    } catch (error) {
      console.log(error); 
    }
  };

  const disconnectWallet = () => {
    setWeb3State({
      contractInstance: null,
      selectedAccount: null,
      chainId: null,
      networkName: null,
      signer: null,
      provider: null
    });
    localStorage.removeItem('web3State'); // Clear from localStorage
  };

  useEffect(() => {
    const initWeb3State = async () => {
      const storedWeb3State = JSON.parse(localStorage.getItem('web3State'));

      if (storedWeb3State?.selectedAccount) {
        setWeb3State(prevState => ({
          ...prevState,
          selectedAccount: storedWeb3State.selectedAccount,
          chainId: storedWeb3State.chainId,
          networkName: storedWeb3State.networkName
        }));
        await handleWallet(); // Restore full state
      }
    };

    initWeb3State();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => handleAccountChange(setWeb3State));
      window.ethereum.on('chainChanged', () => handleChainChange(setWeb3State));
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => handleAccountChange(setWeb3State));
        window.ethereum.removeListener('chainChanged', () => handleChainChange(setWeb3State));
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{ web3State, handleWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
