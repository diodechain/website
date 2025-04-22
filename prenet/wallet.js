const CHAIN_ID = 15
let Wallet = {
    account: undefined,
    balance: '0',
    enabled: false,
    error: false,
    subs: [],
    initialized: false,
    initializing: false
};

Wallet.enable = async () => {
    if (Wallet.enabled) return;
    if (Wallet.initializing) return;
    Wallet.initializing = true;
    
    try {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            Wallet.error = "Please install <a href='https://metamask.io/'>MetaMask</a>";
            Wallet.initializing = false;
            return;
        }

        const data = [{
            chainId: '0xf',
            chainName: 'Diode Prenet',
            nativeCurrency: {
                name: 'Diodes',
                symbol: 'DIODE',
                decimals: 18
            },
            rpcUrls: ['wss://prenet.diode.io:8443/ws', 'https://prenet.diode.io:8443/'],
            blockExplorerUrls: ['https://diode.io/prenet/#/'],
            iconUrls: ['https://diode.io/assets/favicon/android-chrome-512x512.png']
        }];

        let chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== data[0].chainId) {
            try {
                await window.ethereum.request({ 
                    method: 'wallet_addEthereumChain', 
                    params: data 
                });
            } catch (error) {
                console.error("Error adding chain:", error);
            }
        }
        
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts'
        });
        
        if (!accounts || accounts.length === 0) {
            Wallet.error = "No accounts found or access denied";
            Wallet.initializing = false;
            return;
        }
        
        Wallet.account = valueToAddress(accounts[0]);
        Wallet.update(true);

        try {
            const balance = await web3.eth.getBalance(Wallet.account);
            Wallet.balance = balance;
        } catch (error) {
            Wallet.error = error.message || error;
        }

        if (!Wallet.initialized) {
            Wallet.initialized = true;
            window.ethereum.on("chainChanged", (chainId) => {
                Wallet.handleChainChanged(parseInt(chainId, 16));
            });
            
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    Wallet.account = valueToAddress(accounts[0]);
                    Wallet.update(true);
                } else {
                    Wallet.update(false);
                }
            });
        }
        
        chainId = await window.ethereum.request({ method: 'eth_chainId' });
        Wallet.handleChainChanged(parseInt(chainId, 16));
    } catch (error) {
        Wallet.error = error.message || "Failed to connect to MetaMask";
        console.error("MetaMask connection error:", error);
    } finally {
        Wallet.initializing = false;
    }
}

Wallet.handleChainChanged = (chainId) => {
    if (chainId != CHAIN_ID) {
        Wallet.error = "MetaMask is not connected to the Diode Network (" + chainId + ")";
        Wallet.update(false);
        return;
    }
    Wallet.update(true);
}

Wallet.subscribe = (listener) => {
    Wallet.subs.push(listener)
    Wallet.apply(listener)
    // listener.$set(listener.account, Wallet.account)
    // listener.$set(listener.enabled, Wallet.enabled)
    // listener.$set(listener.balance, Wallet.balance)
    // listener.$set(listener.error, Wallet.error)
    // console.log(listener)
}

Wallet.update = (enabled) => {
    Wallet.enabled = enabled
    Wallet.subs.forEach(Wallet.apply);
}
Wallet.apply = (listener) => {
    listener.account = Wallet.account
    listener.enabled = Wallet.enabled
    listener.balance = Wallet.balance
    listener.error = Wallet.error
    // console.log(listener)
}

Wallet.runDNS = (name, args) => {
    return Wallet.runTransaction("BNS." + name, dnsMethods[name], DNSAddr, args)
}

Wallet.runTransaction = async function (name, abi, target, args) {
    let call = web3.eth.abi.encodeFunctionCall(abi, args);
    Wallet.runningTX = true;

    let confirmation;
    try {
        let tx = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [
                { from: Wallet.account, to: target, data: call, gasPrice: 0 },
            ],
            from: Wallet.account,
        })
        console.log("tx", tx)

        confirmation = await Wallet.isTxConfirmed(tx)
        console.log("confirmation", confirmation)
    }
    catch (err) {
        console.log("[Transaction] error: ", name, args, err);
    }
    Wallet.runningTX = false;
    return confirmation;
}

Wallet.isTxConfirmed = (txHash) => {
    let delay = (callback, time) => {
        return new Promise(function (resolve, reject) {
            window.setTimeout(() => {
                resolve(callback());
            }, time);
        });
    }

    return new Promise(
        function (resolve, reject) {
            if (
                !txHash ||
                txHash.length != 66 ||
                !/^0x[0-9a-f]{64}$/i.test(txHash)
            ) {
                reject("Not a valid transaction hash");
            }
            web3.eth
                .getTransactionReceipt(txHash)
                .then(
                    function (tx) {
                        if (tx) {
                            if (tx.status === true) {
                                return resolve(tx);
                            }
                            return reject(new Error("tx was failed"));
                        }
                        resolve(
                            delay(Wallet.isTxConfirmed.bind(this, txHash), 1000)
                        );
                    }
                )
                .catch(
                    function (err) {
                        resolve(
                            delay(Wallet.isTxConfirmed.bind(this, txHash), 1000)
                        );
                    }
                );
        }
    );
},

    setInterval(() => {
        if (
            !Wallet.enabled &&
            window.ethereum &&
            window.ethereum.selectedAddress != null &&
            Wallet
        ) {
            Wallet.enable();
        }
    }, 1000);
