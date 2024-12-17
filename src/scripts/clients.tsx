import { createPublicClient, http, parseEther, formatEther } from "viem";
import { chains } from "@lens-network/sdk/viem";

// Create a public client for the Lens testnet
const publicClient = createPublicClient({
  chain: chains.testnet,
  transport: http(),
});

async function main() {
  try {
    // Fetch the chain ID to verify connection
    const chainId = await publicClient.getChainId();
    console.log(`Connected to chain ID: ${chainId}`);

    // Retrieve wallet clients (implement actual logic here)
    const [bobWalletClient, aliceWalletClient] = await getWalletClients();

    // Fetch balance for Bob's wallet
    const bobBalance = await publicClient.getBalance({
      address: bobWalletClient.account.address,
    });

    console.log(
      `Balance of ${bobWalletClient.account.address}: ${formatEther(
        bobBalance
      )} ETH`
    );

    // Send a transaction from Bob to Alice
    const hash = await bobWalletClient.sendTransaction({
      to: aliceWalletClient.account.address,
      value: parseEther("1"),
    });
    await publicClient.waitForTransactionReceipt({ hash });

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Mock function to simulate wallet client retrieval
async function getWalletClients() {
  // Implement actual logic to get wallet clients
  return [
    {
      account: { address: "0xBobAddress" }, // Replace with actual address
      sendTransaction: async ({ to, value }: { to: string; value: any }) => {
        console.log(`Sending ${formatEther(value)} ETH to ${to}`);
        // Simulate transaction hash
        return "0xTransactionHash"; // Replace with actual transaction logic
      },
    },
    {
      account: { address: "0xAliceAddress" }, // Replace with actual address
    },
  ];
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
  });
