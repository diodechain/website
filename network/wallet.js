const CHAIN_ID = 15;

let Wallet = {
    account: undefined,
    balance: '0',
    enabled: false,
    error: false,
    subs: [],
    initialized: false,
    chain: {
        chainId: '0xf',
        chainName: 'Diode Prenet',
        nativeCurrency:
        {
            name: 'Diodes',
            symbol: 'DIODE',
            decimals: 18
        },
        rpcUrls: ['wss://prenet.diode.io:8443/ws', 'https://prenet.diode.io:8443/'],
        blockExplorerUrls: ['https://diode.io/prenet/#/'],
        iconUrls: ['https://diode.io/assets/favicon/android-chrome-512x512.png']
    },

    web3() {
        // Accessing the global from index.html
        return web3;
    },

    chainIdNumber() {
        return this.web3().utils.hexToNumber(this.chain.chainId);
    },

    async enable() {
        if (this.enabled) return;
        if (this.initializing) return;

        this.initializing = true;
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            this.error = "Please install <a href='https://metamask.io/'>MetaMask</a>";
            return;
        }

        let chainId = await window.ethereum.request({ method: 'eth_chainId' })
        if (chainId != this.chain.chainId) {
            try {
                await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [this.chain] })
            } catch (error) {
                this.initializing = false;
                console.log("error", error);
                return;
            }
        }

        try {
            let accounts = await window.ethereum.enable()
            // let currentChainId = null
            console.log("Accounts", accounts);
            this.account = valueToAddress(accounts[0]);
            this.update(true)

            try {
                let balance = await this.web3().eth.getBalance(this.account)
                this.balance = balance;
            } catch (error) {
                this.error = error;
            }

            if (!this.initialized) {
                this.initialized = true
                window.ethereum.on("chainChanged", (chainId) =>
                    this.handleChainChanged(chainId)
                );
                window.ethereum.on("accountsChanged", (accounts) =>
                    this.handleAccountsChanged(accounts)
                );
            }
            this.handleChainChanged(Number(window.ethereum.chainId));
            this.initializing = false;
        } catch (error) {
            this.initializing = false;
            console.log("error", error);
        }
    },

    async switchAccount() {
        await this.enable();
        return await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
        });
    },

    handleChainChanged(chainId) {
        console.log("handleChainChanged", chainId, this.chainIdNumber())
        if (chainId != this.chainIdNumber()) {
            this.error = "MetaMask is not connected to the Diode Network (" + chainId + ")";
            this.update(false);
            return;
        } else {
            this.error = false;
        }
        this.update(true);
    },

    handleAccountsChanged(accounts) {
        console.log("handleAccountsChanged", accounts);
        this.account = valueToAddress(accounts[0]);
        this.update(true)
    },

    subscribe(listener) {
        this.subs.push(listener)
        this.apply(listener)
    },

    update(enabled) {
        this.enabled = enabled
        this.subs.forEach((listener) => this.apply(listener));
    },

    apply(listener) {
        listener.account = this.account
        listener.enabled = this.enabled
        listener.balance = this.balance
        listener.error = this.error
    },

    runDNS(name, args) {
        return this.runTransaction("BNS." + name, dnsMethods[name], DNSAddr, args)
    },

    async runTransaction(name, abi, target, args, value) {
        if (!abi) {
            console.log("No ABI provided for", name)
            return [false, "No ABI provided"]
        }

        let call = this.web3().eth.abi.encodeFunctionCall(abi, args);
        this.runningTX = true;

        try {
            let tx = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    { from: this.account, to: target, data: call, gasPrice: 0, value: value },
                ],
            })
            console.log("tx", tx)
            return [true, tx];
        }
        catch (err) {
            console.log("[Transaction] error: ", name, args, err);
            return [false, err];
        }
    },

    async isTxConfirmed(txHash, max_retries) {
        if (!txHash || txHash.length != 66 || !/^0x[0-9a-f]{64}$/i.test(txHash)) {
            throw new Error("Not a valid transaction hash: " + txHash);
        }

        if (max_retries === undefined) {
            max_retries = 60;
        } else if (max_retries == 0) {
            throw new Error("Failed finding tx " + txHash);
        }

        let retry = async () => {
            return await (new Promise((resolve, reject) => {
                window.setTimeout(() => {resolve(this.isTxConfirmed(txHash, max_retries - 1));}, 1000);
            }));
        }

        try {
            let tx = await this.web3().eth.getTransactionReceipt(txHash)
            console.log("isTxConfirmed tx", tx, max_retries);
            if (!tx) {
                return await retry();
            } else if (tx.status === true) {
                return tx;
            } else {
                console.log("tx failed", txHash);
                return false;
            }
        } catch (err) {
            console.log("isTxConfirmed err", err);
            return await retry();
        }
    },
}

let MoonbeamWallet = {
    ...Wallet, 
    web3() {
        // Accessing the global from index.html
        return moonbeam;
    },
    chain: {
        chainId: '0x504',
        chainName: 'Moonbeam',
        nativeCurrency:
        {
            name: 'Glimmer',
            symbol: 'GLMR',
            decimals: 18
        },
        rpcUrls: ['wss://rpc.api.moonbeam.network', 'https://rpc.api.moonbeam.network'],
        blockExplorerUrls: ['https://moonbeam.moonscan.io'],
        iconUrls: ['https://icons.llamao.fi/icons/chains/rsz_moonbeam.jpg']
    }
}