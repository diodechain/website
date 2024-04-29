const DNSAddr = "0xaf60faa5cd840b724742f1af116168276112d6a6"
const Registry = "0x5000000000000000000000000000000000000000"
let DNSActive = {};
let DNSCache = {}
let DNSAlias = {
    "0x937c492a77ae90de971986d003ffbc5f8bb2232c": "EU1",
    "0xae699211c62156b8f29ce17be47d2f069a27f2a6": "EU2",
    "0xceca2f8cf1983b4cf0c1ba51fd382c2bc37aba58": "US1",
    "0x7e4cd38d266902444dc9c8f7c0aa716a32497d0b": "US2",
    "0x68e0bafdda9ef323f692fc080d612718c941d120": "AS1",
    "0x1350d3b501d6842ed881b59de4b95b27372bfae8": "AS2",
    Registry: "Registry",
    DNSAddr: "BNS",
    "0xbada81fae68925fec725790c34b68b5faca90d45": "Faucet 1",
    "0x34e3961098de3348b465cc82791bd0f7ebce3ecd": "Faucet 2",
    "0xc0c416b326133d74335e6828d558efe315bd597e": "Faucet 3",
    "0x58cc80f5526594f07f33fd4be4aef153bab602b2": "Faucet 4",
    "0x45aa0730cf4216f7195fc1f5903a171a1faa5209": "Faucet 5"
}

const PredefinedGraphicColors = ['#F15C2E', '#0272FF', "#38AB66", "#161C2A", "#969FA8",
    '#D15B2E', '#9279FF', "#88AA76", "#1952AA", "#00445B"];
const FleetHash = "0x7e9d94e966d33cff302ef86e2337df8eaf9a6388d45e4744321240599d428343"
const NullHash = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
const NullValue = "0x0000000000000000000000000000000000000000000000000000000000000000"
const NullAddr = "0x0000000000000000000000000000000000000000"
const NOT_FOUND_INDEX = -1

const ACCOUNTS_FILTER_MAP = {
    "fleets": "Fleet",
    "contracts": "Contract",
    "wallets": "Wallet"
}

const ACCOUNTS_ALL_FILTER = "All"

var fleetMethods = {
    "deviceWhitelist": {
        name: "deviceWhitelist",
        type: "function",
        inputs: [{
            type: "address",
            name: "device"
        }],
    },

    "accessWhitelist": {
        name: "accessWhitelist",
        type: "function",
        inputs: [{
            type: "address",
            name: "device"
        }, {
            type: "address",
            name: "client"
        }],
    },

    "SetAccessWhitelist": {
        name: "SetAccessWhitelist",
        type: "function",
        inputs: [{
            type: "address",
            name: "device"
        },
        {
            type: "address",
            name: "device2"
        },
        {
            type: "bool",
            name: "allowed"
        }]
    },
    "SetDeviceWhitelist": {
        name: "SetDeviceWhitelist",
        type: "function",
        inputs: [{
            type: "address",
            name: "device"
        },
        {
            type: "bool",
            name: "allowed"
        }]
    },

}
var registryMethods = {
    "MinerValue": {
        name: 'MinerValue',
        type: 'function',
        inputs: [{
            type: 'uint8',
            name: 'mode'
        }, {
            type: 'address',
            name: 'miner'
        }]
    }
}

var dnsMethods = {
    "Resolve": {
        name: 'Resolve',
        type: 'function',
        inputs: [{
            type: 'string',
            name: 'name'
        }]
    },
    "ResolveEntry": {
        name: 'ResolveEntry',
        type: 'function',
        inputs: [{
            type: 'string',
            name: 'name'
        }],
        outputs: [{
            components: [
                {
                    internalType: "address",
                    name: "destination",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "owner",
                    type: "address"
                },
                {
                    internalType: "string",
                    name: "name",
                    type: "string"
                },
                {
                    internalType: "address[]",
                    name: "destinations",
                    type: "address[]"
                },
                {
                    internalType: "string[]",
                    name: "properties",
                    type: "string[]"
                },
                {
                    internalType: "uint256",
                    name: "lockEnd",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "leaseEnd",
                    type: "uint256"
                }
            ],
            internalType: "struct IBNS.BNSEntry",
            name: "",
            type: "tuple"
        }],
    },
    "Register": {
        name: 'Register',
        type: 'function',
        inputs: [{
            type: 'string',
            name: 'name'
        }, {
            type: 'address',
            name: 'destination'
        }]
    },
    "Unregister": {
        name: 'Unregister',
        type: 'function',
        inputs: [{
            type: 'string',
            name: 'name'
        }]
    },
    "TransferOwner": {
        name: 'TransferOwner',
        type: 'function',
        inputs: [{
            type: 'string',
            name: 'name'
        }, {
            type: 'address',
            name: 'new_owner'
        }]
    },
    "Version": {
        name: 'Version',
        type: 'function',
        inputs: []
    },
    "names": {
        name: 'names',
        type: 'function',
        inputs: [{
            type: 'bytes32',
            name: 'hash'
        }],
        outputs: [{
            components: [
                {
                    internalType: "address",
                    name: "destination",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "owner",
                    type: "address"
                },
                {
                    internalType: "string",
                    name: "name",
                    type: "string"
                },
                {
                    internalType: "uint256",
                    name: "lockEnd",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "leaseEnd",
                    type: "uint256"
                }
            ],
            internalType: "struct IBNS.BNSEntry",
            name: "",
            type: "tuple"
        }],
    },
    "namesIndex": {
        name: 'namesIndex',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: 'index'
        }],
        outputs: [{
            type: 'bytes32',
            name: 'hash'
        }]
    },
    "AllNames": {
        name: 'AllNames',
        type: 'function',
        inputs: [],
        outputs: [{
            type: 'bytes32[]',
            name: 'hashes'
        }]
    },
    "AllNamesLength": {
        name: 'AllNamesLength',
        type: 'function',
        inputs: [],
        outputs: [{
            type: 'uint256',
            name: 'length'
        }]
    }
}

function call(abi, to, args, callback) {
    let call = web3.eth.abi.encodeFunctionCall(abi, args)
    web3.eth.call({
        to: to,
        data: call,
        gasPrice: 0
    }).then((data) => {
        if (abi.outputs) {
            data = web3.eth.abi.decodeParameter(abi.outputs[0], data)
        }
        callback(data)
    })
}

function CallDNS(name, args, callback) {
    call(dnsMethods[name], DNSAddr, args, callback)
}

function CallRegistry(name, args, callback) {
    call(registryMethods[name], Registry, args, callback)
}

function CallFleet(name, to, args, callback) {
    call(fleetMethods[name], to, args, callback)
}

function NewWeb3(url) {
    let obj = new Web3(url)
    obj.extend({
        property: 'eth',
        methods: [{
            name: 'getNode',
            call: 'dio_getNode',
            params: 1,
            inputFormatter: [obj.extend.formatters.inputAddressFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        },
        {
            name: 'getPool',
            call: 'dio_getPool',
            params: 0,
            // inputFormatter: [obj.extend.formatters.inputAddressFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        },
        {
            name: 'network',
            call: 'dio_network',
            params: 0,
            // inputFormatter: [obj.extend.formatters.inputAddressFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        },
        {
            name: 'getObject',
            call: 'dio_getObject',
            params: 1,
            inputFormatter: [obj.extend.formatters.inputAddressFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        }]
    })
    obj.extend({
        property: 'eth',
        methods: [{
            name: 'getCodeHash',
            call: 'eth_getCodeHash',
            params: 2,
            inputFormatter: [obj.extend.formatters.inputAddressFormatter, obj.extend.formatters.inputDefaultBlockNumberFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        },
        {
            name: 'getStorage',
            call: 'eth_getStorage',
            params: 2,
            inputFormatter: [obj.extend.formatters.inputAddressFormatter, obj.extend.formatters.inputDefaultBlockNumberFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        }]
    });
    return obj;
}
