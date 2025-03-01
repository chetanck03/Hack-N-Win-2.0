import { useEffect} from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { handleWallet, disconnectWallet, web3State } = useWeb3Context();
  const { selectedAccount, networkName } = web3State;
 
  const navigateTo = useNavigate();

  // Redirect to home after connecting wallet
  useEffect(() => {
    if (selectedAccount) navigateTo('/');
  }, [selectedAccount, navigateTo]);

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mt-4 mb-4">Welcome to Voting DApp</h1>
        <p className="text-lg mb-6">
          Participate in a transparent and secure voting process powered by blockchain technology. Connect your wallet to get started!
        </p>
        
        {/* Show Connect or Disconnect button based on wallet connection state */}
        <button
          onClick={selectedAccount ? disconnectWallet : handleWallet}
          className={`bg-${selectedAccount ? 'red' : 'blue'}-600 hover:bg-${selectedAccount ? 'red' : 'blue'}-600 text-white font-semibold py-3 px-6 rounded transition duration-300 shadow-lg`}
        >
          {selectedAccount ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      </div>

      {/* Display connected wallet information if an account is connected */}
      {selectedAccount && (
        <div className="bg-gray-800 p-6 rounded-md shadow-lg text-center transition transform hover:scale-105">
          <p className="mt-2 text-xl font-semibold text-blue-400 ">Account Address:</p>
          <p className="mt-1 text-lg font-mono text-white break-all">{selectedAccount}</p>
          <p className="mt-4 text-xl font-semibold text-blue-400 ">Blockchain:</p>
          <p className="mt-1 text-lg font-mono text-white">{networkName}</p>

          <div className="mt-6">
            {/* <h3 className="text-xl font-semibold text-blue-400 "> Token Balance:</h3> */}
            <p className="mt-2 text-lg font-mono text-white">
              {/* {userTokenBalance !== null ? `${userTokenBalance} Ck Token` : "Loading..."} */}
            </p>
          </div>
        </div>
      )}


      {/* Security Information Box */}
      <div >
        <h2 className="text-3xl text-blue-400 mt-4 font-bold text-center ">Security & Safety</h2>
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg text-white mt-8 mx-auto">
        <p className="text-lg mb-4">
          Your wallet connection is secure and safe. Here are some important points to ensure your safety:
        </p>
        <ul className="space-y-2">
          <li className="text-lg">✅ All transactions are processed on the Ethereum blockchain, ensuring transparency and security.</li>
          <li className="text-lg">✅ We do not store your private keys or sensitive information.</li>
          <li className="text-lg">✅ Ensure you're using a trusted wallet and always verify the website URL.</li>
          <li className="text-lg">✅ Keep your wallet recovery phrases and private keys safe and private.</li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
