export async function connectWallet() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const currentAccount = accounts[0];

    return { currentAccount };
  } else {
    console.log("ethereum not detected");
  }
}
