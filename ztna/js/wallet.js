import { wrapEthereumProvider } from 'https://cdn.jsdelivr.net/npm/@oasisprotocol/sapphire-paratime@2.1.0/+esm'
import { showToastMessage, lockUI, unlockUI } from './utils.js';
import { SiweMessage } from './siwe.js'
import walletAbi from './wallet-abi.js';

// Initialize MetaMask SDK
let ethereum;

export const initializeMetaMask = async () => {
  if (ethereum) {
    return ethereum;
  }

  try {
    const sdk = new MetaMaskSDK.MetaMaskSDK({
      dappMetadata: {
        name: "ZTNA Perimeter Manager",
        url: window.location.href,
      },
      logging: {
        sdk: false
      },
      // checkInstallationImmediately: true,
    });

    // Check if the SDK has initialization method
    console.log('Using SDK connect method');
    await sdk.connect();
    
    // Check which provider accessor method is available
    console.log('Using getProvider method');
    ethereum = sdk.getProvider();
    return ethereum;
  } catch (error) {
    console.error('Error initializing MetaMask:', error);
    throw error;
  }
}; 

let web3;
let account;
let accounts;

/**
 * Initialize Web3 and connect to the wallet
 * @returns {Object} Web3 instance and account
 */
async function initWeb3() {
  if (web3 && accounts) {
    return { web3, account: accounts[0] };
  } else if (ethereum) {
    try {
      // Request account access
      console.log("Requesting account access");
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(ethereum);
      window.web3 = web3;
      
      // Check if this is a mock provider (for development/testing)
      if (ethereum.isMock) {
        console.warn('Using mock provider for Web3. Limited functionality available.');
      }
      
      return { web3, account: accounts[0] };
    } catch (error) {
      console.error("User denied account access");
      throw error;
    }
  } else {
    throw new Error("No Ethereum browser extension detected. Please install MetaMask.");
  }
}

export async function getAccount() {
  let response = await ethereum.request({ method: 'wallet_getPermissions', params: [] });
  console.log("wallet_getPermissions ", response);
  let account_permission = response.find(permission => permission.parentCapability === "eth_accounts");
  if (!account_permission) return null;
  let accounts = account_permission.caveats.find(caveat => caveat.type === "restrictReturnedAccounts");
  if (!accounts || accounts.value.length === 0) return null;
  console.log("return wallet_getPermissions = ", accounts.value[0]);
  return accounts.value[0];
}


/**
 * Connect to wallet and return web3 instance and account
 * @returns {Promise<Object>} Object containing web3 instance and account
 */
export async function connectWallet() {
  if (web3 && account && ethereum) {
    return { web3, account, ethereum };
  }

  try {
    await initializeMetaMask();
    let ret = await initWeb3();
    web3 = ret.web3;
    account = ret.account;
    
    // Setup event listeners for account changes
    ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        window.app.isConnected = false;
        window.app.account = null;
        showToastMessage('Wallet disconnected.');
      } else if (accounts[0] !== window.account) {
        // User switched accounts
        window.app.account = accounts[0];
        showToastMessage('Account changed to ' + accounts[0]);
        
        // Reload data with new account
        if (typeof window.loadUserData === 'function') {
          window.loadUserData();
        }
      }
    });
    
    // Handle chain changes
    let lastChainId = null;
    ethereum.on('chainChanged', (newChainId) => {
      if (newChainId != lastChainId && networks.find(network => network.chainId === lastChainId) != null) {
        showToastMessage('Network changed from ' + lastChainId + ' to ' + newChainId + '. Reloading...');
        lastChainId = newChainId;
        //window.location.reload();
        // Reload data with new account
        if (typeof window.connectWallet === 'function') {
          window.connectWallet();
        }
      }
    });
    
    return { web3, account, ethereum };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    showToastMessage('Failed to connect wallet: ' + error.message);
    throw error;
  }
}

/**
 * Switch to a different account
 */
export async function switchAccount() {
  try {
    if (ethereum) {
      await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      });
      
      // The user will be prompted to select an account
      // After selection, the accountsChanged event will fire
    }
  } catch (error) {
    console.error('Error switching account:', error);
    showToastMessage('Failed to switch account: ' + error.message);
    throw error;
  }
} 

// Network configurations
export var networks = [
  {
    index: 0,
    chainId: "0x5afe",
    name: "Oasis Sapphire",
    rpcUrls: ["https://sapphire.oasis.io"],
    nativeCurrency: {
      name: "ROSE",
      symbol: "ROSE",
      decimals: 18
    },
    blockExplorerUrls: ["https://explorer.oasis.io/mainnet/sapphire"],
    registry: '0xf90314E31D34C7ad82382f1a9dCB5Fc0FDA71ACe',
    bns: '0xBC7a66a80E760dD0D84f6e39Df6cfD937C6c94F6'
  },
  {
    index: 1,
    chainId: "0x5aff",
    name: "Oasis Sapphire Testnet",
    rpcUrls: ["https://testnet.sapphire.oasis.io"],
    nativeCurrency: {
      name: "TEST",
      symbol: "TEST",
      decimals: 18
    },
    blockExplorerUrls: ["https://explorer.oasis.io/testnet/sapphire"],
    registry: '0x18D1c56474505893082e1B50A7c5a7cdc7854Eca'
  }
];

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  networks.push({
    index: 2,
    chainId: "0x539",
    name: "Anvil",
    rpcUrls: ["http://localhost:8545"],
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["http://localhost:8545"],
    registry: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  });
}

export async function getCurrentChain() {
  try {
    const chainId = await ethereum.request({ 
      method: "eth_chainId" 
    });
    console.log("Current chain ID:", chainId);
    let network = networks.find(network => network.chainId === chainId);
    if (network) {
      return network;
    }
    await switchNetwork(0);
    return await getCurrentChain();
    // return chainId;
  } catch (err) {
    console.error("Error getting chain:", err);
  }
}

export async function switchNetwork(networkKey) {
  const network = networks[networkKey];
  console.log("switching to ", network);
  await connectWallet();
  
  try {
    // Try to switch to the network
    console.log("req ");
    let ret = await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: network.chainId }]
    });
    console.log("req ret ", ret);
    let networkId = await ethereum.request({
      method: "eth_chainId"
    });
    console.log("networkId ", networkId);
    console.log("req ok");

  } catch (err) {
    // If the error code is 4902, the network needs to be added
    console.log("err ", err);
    if (err.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: network.chainId,
            chainName: network.name,
            rpcUrls: network.rpcUrls,
            nativeCurrency: network.nativeCurrency,
            blockExplorerUrls: network.blockExplorerUrls
          }]
        });
      } catch (addError) {
        console.error("Error adding network:", addError);
      }
    } else {
      console.error("Error switching network:", err);
    }
  }
}

import registryAbi from './registry-abi.js';

export async function ensureUserWallet() {
  let chain = await getCurrentChain();
  if (!chain) { return null; }
  let { web3, account, ethereum } = await connectWallet();
  let storageKey = "siwe_token_" + account + "_" + chain.chainId;

  let registryContract = new web3.eth.Contract(registryAbi, chain.registry);
  let userWallet = await registryContract.methods.UserWallet(account).call();
  userWallet = userWallet.toLowerCase();
  console.log('User wallet:', userWallet);

  let siweToken = localStorage.getItem(storageKey);

  if (siweToken) {
    console.log("Using cached SIWE token");
    return {address: userWallet, token: siweToken};
   }

  if (userWallet == '0x0000000000000000000000000000000000000000') {
    try {
      lockUI();
      await registryContract.methods.CreateUserWallet().send({ from: account });
      userWallet = await registryContract.methods.UserWallet(account).call();
      console.log('User wallet:', userWallet);
      if (userWallet == '0x0000000000000000000000000000000000000000') {
        throw new Error('Failed to create user wallet');
      }  
    } catch (error) {
      console.error('Error creating user wallet:', error);
      showToastMessage('Failed to create user wallet: ' + error.message);
      throw error;
    } finally {
      unlockUI();
    }
  }

  let walletContract = new web3.eth.Contract(walletAbi, userWallet);
  console.log("Siwe version:", await walletContract.methods.Version().call());

  const domain = "ZTNAWallet"
  const siweMsg = new SiweMessage({
    domain,
    address: account, // User's selected account address.
    uri: `http://${domain}`,
    version: "1",
    chainId: web3.utils.hexToNumber(chain.chainId),
    expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 3).toISOString(),
  }).toMessage();

  const sig = await ethereum.request({
      method: "personal_sign",
      params: [web3.utils.toHex(siweMsg), account],
    })

  const sigObj = splitSignature(sig);
  console.log('Signature:', sig, sigObj);
  console.log('Siwe message:', siweMsg);
  console.log("Siwe test", await walletContract.methods.login_test(siweMsg, sigObj).call());
  siweToken = await walletContract.methods.login(siweMsg, sigObj).call();
  console.log('Auth token:', siweToken);
  localStorage.setItem(storageKey, siweToken);
  return {address: userWallet, token: siweToken};
}

function splitSignature(sig) {
  let v = web3.utils.hexToNumber('0x' + sig.slice(130, 132))

  return {
    r: '0x' + sig.slice(2, 66),
    s: '0x' + sig.slice(66, 130),
    v: v
  }
}

// Helper function for sending transactions
export async function send(abi, address, method, args, successMessage) {
  try {
    lockUI();
    const { account, ethereum } = await connectWallet();
    let web3 = new Web3(wrapEthereumProvider(ethereum));
    let contract = new web3.eth.Contract(abi, address);
    let result;

    // Only wallet-abi calls are direct calls to the contract,
    // all other are going through the ZTNAWallet contract as meta-transactions / meta-calls
    // and are either:
    // - view calls (no gas) via submit(address destination, bytes token, bytes data)
    // - transaction sends (gas) via submit(address destination, bytes data)
    if (abi == walletAbi) {
      result = await contract.methods[method](...args).send({ from: account });
    } else {
      let data = contract.methods[method](...args).encodeABI();
      let {address: userWallet} = await ensureUserWallet();
      result = await send(walletAbi, userWallet, 'submit', [address, data]);
    }

    if (successMessage) {
      showToastMessage(successMessage);
    }

    return result;
  } catch (error) {
    console.error(`Error in ${method}:`, error);
    showToastMessage(`Failed to ${method}: ${error.message}`);
    throw error;
  } finally {
    unlockUI();
  }
}

// Helper function for calling view methods
export async function call(abi, address, method, args) {
  try {
    const { ethereum } = await connectWallet();
    let web3 = new Web3(wrapEthereumProvider(ethereum));
    let {address: userWallet, token: token} = await ensureUserWallet();

    let methodAbi = abi.find(item => item.name === method && item.inputs.length === args.length);
    if (!methodAbi) {
      throw new Error(`Method ${method} not found in ABI`);
    }

    let targetContract = new web3.eth.Contract([methodAbi], address);
    let data = targetContract.methods[method](...args).encodeABI();

    let submitAbi = walletAbi.find(item => item.name === 'submit' && item.inputs.length === 3);
    if (!submitAbi) {
      throw new Error(`Submit method not found in wallet ABI`);
    }

    // Constructing meta transaction ABI
    submitAbi.outputs = methodAbi.outputs;
    let metaContract = new web3.eth.Contract([submitAbi], userWallet);
    return await metaContract.methods.submit(address, token, data).call();
  } catch (error) {
    console.error(`Error in ${method}:`, error);
    showToastMessage(`Failed to ${method}: ${error.message}`);
    throw error;
  }
}
