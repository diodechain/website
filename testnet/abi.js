
var fleetMethods = {
    "deviceWhitelist": {
        name: "deviceWhitelist",
        type: "function",
        inputs: [{
            type: "address",
            name: "device"
        }],
        outputs: [{name: 'white', type: 'boolean' }]
    },

    "accessWhitelist": {
        name: "accessWhitelist",
        type: "function",
        inputs: [{
            type: "address",
            name: "device"
        }],
        outputs: [{name: 'access', type: 'boolean' }]
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