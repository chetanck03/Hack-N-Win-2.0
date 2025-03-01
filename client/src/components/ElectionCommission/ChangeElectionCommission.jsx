import { useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

const ChangeElectionCommission = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const [newCommission, setNewCommission] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeElectionCommission = async () => {
    if (!newCommission) {
      toast.error("Please enter a valid Ethereum address!");
      return;
    }

    setLoading(true);

    try {
      if (!contractInstance) throw new Error("Contract instance not available");

      const confirmation = window.confirm(
        `Are you sure you want to change the election commission to: ${newCommission}?`
      );
      if (!confirmation) {
        setLoading(false);
        return;
      }

      const tx = await contractInstance.changeElectionComission(newCommission);
      toast.success(`Transaction Sent! Tx Hash: ${tx.hash}`);

      await tx.wait();
      toast.success("Election commission changed successfully!");
    } catch (error) {
      toast.error(error.message || "Error: Changing Election Commission");
      console.error("Transaction error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter new commission address"
        value={newCommission}
        onChange={(e) => setNewCommission(e.target.value)}
        className="p-3 w-full bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        onClick={handleChangeElectionCommission}
        className={`w-full px-4 py-2 ${loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"} text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition`}
        disabled={loading}
      >
        {loading ? "Changing..." : "Change Election Commission"}
      </button>
    </div>
  );
};

export default ChangeElectionCommission;
