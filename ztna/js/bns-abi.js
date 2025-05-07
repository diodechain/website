export default [
    {
        "type": "function",
        "name": "AddProperty",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_property",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "AllNames",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]",
                "internalType": "bytes32[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "AllNamesLength",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "Convert",
        "inputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "DeleteProperty",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_idx",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "GetProperties",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string[]",
                "internalType": "string[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "GetProperty",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_idx",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "GetPropertyLength",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "Register",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_destination",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "RegisterMultiple",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_destinations",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "RegisterReverse",
        "inputs": [
            {
                "name": "_address",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "Rename",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_newname",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "Resolve",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ResolveEntry",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct IBNS.BNSEntry",
                "components": [
                    {
                        "name": "destination",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "destinations",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "properties",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "lockEnd",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "leaseEnd",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ResolveOwner",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ResolveReverse",
        "inputs": [
            {
                "name": "_address",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "TransferOwner",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_newowner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "Unregister",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "UnregisterReverse",
        "inputs": [
            {
                "name": "_address",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "Version",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "int256",
                "internalType": "int256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "_reserved",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "change_tracker",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "names",
        "inputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "destination",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "lockEnd",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "leaseEnd",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "namesIndex",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "reverse",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "setter",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    }
];