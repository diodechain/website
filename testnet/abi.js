let DNSCache = {}
const DNSAddr = "0xAF60FAA5CD840B724742F1AF116168276112D6A6"
const Registry = "0x5000000000000000000000000000000000000000"
const FleetHash = "0x7e9d94e966d33cff302ef86e2337df8eaf9a6388d45e4744321240599d428343"
const NullHash = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
const NullValue = "0x0000000000000000000000000000000000000000000000000000000000000000"
const NullAddr = "0x0000000000000000000000000000000000000000"

var fleetMethods = {
    "deviceWhitelist": {
        name: "deviceWhitelist",
        type: "function",
        inputs: [{
            type: "address",
            name: "device"
        }],
        outputs: [{ name: 'white', type: 'boolean' }]
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
        outputs: [{ name: 'access', type: 'boolean' }]
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
    "names": {
        name: 'names',
        type: 'function',
        inputs: [{
            type: 'string',
            name: 'name'
        }]
    }
}

function call(abi, to, args, callback) {
    let call = web3.eth.abi.encodeFunctionCall(abi, args)
    web3.eth.call({
        to: to,
        data: call,
        gasPrice: 0
    }).then(callback)
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
        },
        {
            name: 'codeCount',
            call: 'dio_codeCount',
            params: 1,
            // inputFormatter: [obj.extend.formatters.inputAddressFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        },
        {
            name: 'codeGroups',
            call: 'dio_codeGroups',
            params: 0,
            // inputFormatter: [obj.extend.formatters.inputAddressFormatter]
            // outputFormatter: obj.utils.hexToNumberString
        },
        {
            name: 'totalSupply',
            call: 'dio_supply',
            params: 0,
            // inputFormatter: [obj.extend.formatters.inputAddressFormatter]
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