 // Registry operations for the Perimeter Manager application
import * as wallet from './wallet.js';
import bnsContractAbi from './bns-abi.js';

async function call(method, args) {
    let bnsAddress = (await wallet.getCurrentChain()).bns;
    return await wallet.call(bnsContractAbi, bnsAddress, method, args);
}

// async function send(method, args) {
//     let bnsAddress = (await wallet.getCurrentChain()).bns;
//     return await wallet.send(bnsContractAbi, bnsAddress, method, args);
// }

export async function getBnsVersion() {
  return await call('Version', []);
}

export async function resolveName(name) {
  // Check if the name is valid
  // Only characters a-z, 0-9, and - are allowed
  if (!/^[a-z0-9-]+$/.test(name)) {
    return null;
  }
  if (name.length <= 7 || name.length > 32 || name.startsWith('-') || name.endsWith('-')) {
    return null;
  }
  let result = await call('Resolve', [name]);
  if (result == "0x0000000000000000000000000000000000000000") {
    return null;
  }
  return result;
}
