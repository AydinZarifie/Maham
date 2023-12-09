import { Signer, ethers } from "ethers"
import MHM2023 from "../../abis/MHM2023.json";

const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');
const contractAddress =  MHM2023.networks['5777'].address;

export async function mint(mintId , signer){

    const ABI = [
        'function mint(uint256 mintId) public returns (bool)'
    ]
    const contract = new ethers.Contract(contractAddress,ABI,signer);
    const txRes = await contract.mint(mintId); 

    return txRes;
}

export async function burn(mintId , signer){

    const ABI = [
        'function burn(uint256 mintId) public returns (bool)'
    ]
    const contract = new ethers.Contract(contractAddress,ABI,signer);
    const txRes = await contract.burn(mintId);
    const txRec = await txRes.wait();

    return txRec;
}

export async function transferFrom(from , to , mintId , signer){

    const ABI = [
        ' function transferFrom(address from , address to , uint256 mintId) public'
    ]
    const contract = new ethers.Contract(contractAddress,ABI,signer);
    const txRes = await contract.transferFrom(from, to , mintId);
    const texRec = await txRes.wait();
    return texRec;
}

export async function transfer(to , mintId , signer) {
    const ABI = [
        'function transfer(uint256 mintId, address to) public'
    ]
    const contract = new ethers.Contract(contractAddress,ABI,signer);

    const txRes = await contract.transfer(to,mintId);
    const texRec = await txRes.wait();
    return texRec;
}

export async function lock(mintId , signer) {
    const ABI = [
        'function lock(uint256 mintId) public returns (bool)'
    ]
    const contract = new ethers.Contract(contractAddress,ABI,signer);
    const txRes = await contract.lock(mintId);
    const txRec = await txRes.wait();

    return txRec;
} 

export async function unlock(mintId , signer){
    const ABI = [
        'function unlock(uint256 mintId) public returns (bool)'
    ]

    const contract = new ethers.Contract(contractAddress,ABI,signer);

    const txRes = await contract.unlock(mintId);
    const txRec = await txRes.wait();

    return txRec;
}

export async function ownerOf(mintId){

    const ABI = [
        'function ownerOf(uint256 mintId) public view returns(address)'
    ]

    const contract = new ethers.Contract(contractAddress,ABI,provider);
    const owner = await contract.ownerOf(mintId);
    return owner
}   

export async function landlorOf(mintId){
    const ABI = [
        'function landlorOf(uint256 mintId) public view returns (address)'
    ]

    const contract = new ethers.Contract(contractAddress,ABI,provider);
    const landlor = await contract.landlorOf(mintId);

    return landlor;
}

export async function addAdmin(walletAddress,signer){
    const ABI = [
        'function addAdmin(address walletAddress) public onlyAdmin()'
    ]

    const contract = new ethers.Contract(contractAddress,ABI,signer);
    const txAddAdmin = await contract.addAdmin(walletAddress);
    const txRec = await txAddAdmin.wait();

    return txRec;

}