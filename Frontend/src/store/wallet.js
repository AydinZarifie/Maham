let signer={}

let wallet={}

let third={}

export const setSigner=(meta)=>{
    signer=meta
}

export const setWallet=(meta)=>{
    wallet=meta
}

export const setThird=(meta)=>{
    third=meta
}

export function getSigner(){
    return signer;
}

export function getWallet(){
    return wallet;
}

export function getThird(){
    return third;
}