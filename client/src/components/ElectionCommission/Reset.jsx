import { useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

const ResetVotingSystem = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const [loading, setLoading] = useState(false);

  const handleResetVoting = async () => {
    setLoading(true);

    try {
      if (!contractInstance) throw new Error("Contract instance not available");

      const confirmation = window.confirm(
        "Are you sure you want to reset the voting system?"
      );
      if (!confirmation) {
        setLoading(false);
        return;
      }

      const tx = await contractInstance.resetVotingSystem();
      toast.success(`Transaction Sent! Tx Hash: ${tx.hash}`);

      await tx.wait();
      toast.success("Voting system reset successfully!");
    } catch (error) {
      toast.error(error.message || "Error: Resetting Voting System");
      console.error("Transaction error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleResetVoting}
      className={`w-full px-4 py-2 ${loading ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"} text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition`}
      disabled={loading}
    >
      {loading ? "Resetting..." : "Reset Voting System"}
    </button>
  );
};

export default ResetVotingSystem;
