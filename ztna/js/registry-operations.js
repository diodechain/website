 // Registry operations for the Perimeter Manager application
import * as wallet from './wallet.js';
import registryContractAbi from './registry-abi.js  ';

async function call(method, args) {
    let registryAddress = (await wallet.getCurrentChain()).registry;
    return await wallet.call(registryContractAbi, registryAddress, method, args);
}

async function send(method, args) {
    let registryAddress = (await wallet.getCurrentChain()).registry;
    return await wallet.send(registryContractAbi, registryAddress, method, args);
}

export async function getRegistryVersion() {
  return await call('Version', []);
}

export async function getOwnFleetCount() {
  return await call('GetOwnFleetCount', []);
}

export async function getOwnFleet(index) {
  return await call('GetOwnFleet', [index]);
}

export async function getSharedFleetCount(sharingUser) {
  return await call('GetSharedFleetCount', [sharingUser]);
}

export async function getSharedFleet(sharingUser, index) {
  return await call('GetSharedFleet', [sharingUser, index]);
}

export async function getSharingUserCount() {
  return await call('GetSharingUserCount', []);
}

export async function getSharingUser(index) {
  return await call('GetSharingUser', [index]);
}

export async function getFleetUserCount(fleetAddress) {
  return await call('GetFleetUserCount', []);
}

export async function getFleetUser(fleetAddress, index) {
  return await call('GetFleetUser', [fleetAddress, index]);
}

export async function createFleet(label) {
  return await send('CreateFleet', [label]);
}

export async function addFleetUser(fleetAddress, userAddress) {
  return await send('AddFleetUser', [fleetAddress, userAddress]);
}

export async function removeFleetUser(fleetAddress, userAddress) {
  return await send('RemoveFleetUser', [fleetAddress, userAddress]);
}

