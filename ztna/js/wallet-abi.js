export default [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Version",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "domain",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "siweMsg",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "v",
            "type": "uint256"
          }
        ],
        "internalType": "struct SignatureRSV",
        "name": "sig",
        "type": "tuple"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "siweMsg",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "v",
            "type": "uint256"
          }
        ],
        "internalType": "struct SignatureRSV",
        "name": "sig",
        "type": "tuple"
      }
    ],
    "name": "login_test",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "domain",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "userAddr",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "validUntil",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "statement",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "resources",
            "type": "string[]"
          }
        ],
        "internalType": "struct AuthToken",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "inDomain",
        "type": "string"
      }
    ],
    "name": "siwe_initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "destination",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "submit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "destination",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "token",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "submit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "A13e_RevokedAuthToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SiweAuth_AddressMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SiweAuth_ChainIdMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SiweAuth_DomainMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SiweAuth_Expired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SiweAuth_NotBeforeInFuture",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SiweParser_InvalidAddressLength",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SiweParser_InvalidNonce",
    "type": "error"
  }
];