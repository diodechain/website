---
title: Edge RPC
category: References
---

For diodechain binaries data are encoded with hex within json arrays. Each RPC call should begin with the two bytes of the length of the RPC payload. The RPC payload should be json array, first element is RPC method:

```
[<Two bytes of lenth>][<RPC method>, <value_1>, <value_2>, …, <value_n>]
|       Length       ||                     RPC Payload                    |  
``` 

For example, if I want to get block header of 0x0123456789, the RPC should be `"["getblockheader", "0x0123456789"]`. Because the length of RPC payload `["getblockheader", "0x0123456789"]` is 34 (in ascii code 34 is "), you should send `"["getblockheader", "0x0123456789"]` to diodechain.

# Client Implementation

[Diode GO Client](https://github.com/diodechain/diode_go_client)

## Data types

### Integer
Integer is hex encoding or integer, the hex encoding should be prefixed with "0x", eg 0xab, 171.

### Binary
Binary is hex encoding of byte of arrays (address, block hash, signature…), the hex encoding should be prefixed with "0x".

### Data Objects

All data objects follow the general structure:

```
[<type>, <value_1>, <value_2>, …, <value_n>, <signature>]
```

Where signature is a signature on the Bert encoded list [<value_1>, <value_2>, …, <value_n>]

#### Location object

RPC: `["location", <s>, <peak_block>, <device_signature>, <server_signature>]`

*   **server_id**: binary - server address
*   **peak_block**: binary - block hash
*   **device_signature**: binary - Bert encoded list: `[<server_id>, <peak_block>]`
*   **server_signature**: binary - Bert encoded list: `[<server_id>, <peak_block>, <device_signature>]` 

### Server Object

RPC: `["server", <host>, <edge_port>, <server_port>, <signature>]`

*   **host**: binary - name or ip address of the host
*   **edge_port**: integer - port for IoT devices to connect
*   **server_port**: integer - port for other cloud software to connect
*   **signature**: binary - Bert encoded list: `[<host>, <edge_port>, <server_port>]`

# Edge RPC API Reference

## getblockpeak

Returns the current block number.

RPC call: `["getblockpeak"]`

Parameters:

*   none

Response:

*   `["response", "getblockpeak", blockNumber]`
*   blockNumber: integer - the highest valid block number

Example:

```
["getblockpeak"]
>> ["response","getblockpeak","0X02da76"]
```

## getblockheader

Returns block header information about a block by block index (block number).

RPC call: `["getblockheader", index]`

Parameters:

*   index: integer - block number

Response

*   `["response", "getblockheader", block_header]`

block_header:

*   previous_block: binary - previous block hash
*   miner: binary - miner publickey
*   miner_signature: binary - miner signature of this block
*   block_hash: binary - block hash
*   state_hash: binary - state hash
*   transaction_hash: binary - transaction hash
*   timestamp: integer - timestamp

Example:

```
["getblockheader", 189462]
>> ["response","getblockheader",{
"transaction_hash":"0x4309bcba566dde47811c47fa17eda8251761909a39934d3ae48cb5fb2f90cb14",
"timestamp":"0X5d5392b4",
"state_hash":"0xc579e39541eb2907677384b995017c28fe3dc105ae0c3bf8476bb4bbccad7def",
"previous_block":"0x00005e0fbc09d917905c47a41fddfd695278b823eddf2490cf4abe8f87be2071","miner_signature":"0x00764f10ff4365db2165a8cf4aa9dce8be67fb1f2cff43ae51cf288e6311eb9f0d3ec9a75406f9060805ed36b17720736f278300fe84fcfb9cebda78676df4d477",
"miner":null,
"block_hash":"0x00003335f640c174ac2a04e0b8537e1adc3a9e035f5f8f4bbc6937578289c43e"
}]
```

## getblock

Returns block information about a block by block index (block number).

RPC call: `["getblock", index]`

Parameters

*    index: integer - block number

Response:

*   `["response", "getblock", block]`

block:

*   transactions: array of transaction
*   receipts: array of transaction receipt
*   header: block_header (see above)

Example:

```
["getblock", 189462]
>>["response","getblock",{
"transactions":[],
"receipts":[],
"header":{
"transaction_hash":"0x4309bcba566dde47811c47fa17eda8251761909a39934d3ae48cb5fb2f90cb14",
"timestamp":"0X5d53c51d",
"state_hash":"0xc579e39541eb2907677384b995017c28fe3dc105ae0c3bf8476bb4bbccad7def"
,"previous_block":"0x00004f6ca36a5d67135707b32355665976f9bdb0b57b2a8962c616f949d39363",
"miner_signature":"0x01e2c1afc76ea799feaf8fa3daa5317cbe9d578f27417d893358d61e64f9ec62720362894a48508fcf9a4ed9a999dadeed4ef4254e8b8fde604902436cf0c05cb0",
"miner":null,
"block_hash":"0x00002ac3dc9997f624fa9b8c90e4375ca2be4ad8a558bc393ca9127a0915a8bd"
}}]
```

## getstateroots

Returns the 16 sub-merkle roots of the state (accounts) storage. The hash of all roots together should return then block_header.state_root hash value.

RPC call: `["getstateroots", index]`

Parameters:

*   index: integer - block index

Response:

*   `["response", "getstateroots", state_roots]`

state_roots:

*    16 x binary - 16 state hash

Example

```
["getstateroots", 189462]
>>["response","getstateroots",
["0xc5d026438f345b413fb7a9afe09a909fffe12adbc15d755e65872be43be5d27e","0xad4dc2937cba7f0380017522bf87af148eaa19787bef6a7640c64d55939f79b6",
"0x75fef175fe530fdcebfda15a85d5b5d7680758963fb986151155868c3c126845",
"0x26d8a38694a7725ef001a8f5acd292b3edbf8346a3710d44cbf4c5e56928174b",
"0x6ecacecd9f80d20087077225eb0cf313584d24eb72c5e72e09e44364638db45a",
"0x86dfae6acc66a2de136c47e6f3e93c5d1c8ca696f5e129c472a4394bfafb65e9",
"0x7f8b60aa695ba2cae9e4e421493c4ed610fd2cf56d9f173706f7439e86742147",
"0xff1a24e061a3a4d5ea9b78bd9a22aa96288d92bf9838e798c08041cb5962127c",
"0x34568925599c25225f36571daaecf73c9975d4489e95741b3ed66d0ca1e8913d",
"0xd31405fbc0dd7f202d89aa5886f9a84cea7ee64ccf93675740766d88b5cea34d",
"0xf467cf2207b25529e4e99c6d86bf1278e0a239c5a9262bae40b829d62fbe951b",
"0xbd095f49b588be346c93ff7204eed0a2591347e09b8be2e4c70152ce57ab82b9",
"0xe73817f797acfba37691287d15915064991b7d92daf198affc0ba1338e4476b7",
"0xb141df7a1857cf056d61732524e868eddc6995dd6d4e60d8dcad13b23020c56c",
"0x5009d2b4e4e2833df471f7d636b5ecee9345ce8212a09fcb81a25289cc2eae5b",
"0xec1e267dd2579ada733e8732ff164e88b20a36d82c181b2551c28279783d37ef"
]]
```

## getaccount

Return account and the merkle proof of account in the given index.

RPC call: `["getaccount", index, account]`

Parameters:

*   index: integer - block index
*   account: hex string- the account id

Response:

*   `["response", "getaccount", account, proof]`

account:

*   nonce: integer - the current account nonce, starting at 1
*   balance: integer - the balance of the account
*   storageRoot: binary - the merkle root of the account storage
*   code: binary - the hash of the account code

proof:

*   `<proof>` := `[<prefix>, <modulo>, <values>] | {<proof>, <proof>} | <hash>`
*   `<hash>` := binary
*   `<prefix>` := binary[0-32] - the prefix of the HASH(account)
*   `<modulo>` := integer 0-15 - modulo 16 of the last byte of HASH(account)
*   `<values>` := `[ account, <accountHash>, …]`
*   `<accountHash>` := HASH(RLP(`[nonce, balance, storageRoot, code]`))

Example:

```
["getaccount", 189462, "0xdeea0d008e4d966191fc1fd6c67272956208cf9f"]
>>["response","getaccount",{
"storageRoot":"0x438a90405daa876539082cd0baf6cddaa3bf880f1c8af0c0381f0042db93088a",
"nonce":"0X02",
"Code":"0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
"balance":"0X0de04867d0e8d000"
},[
"",
"0X0c",[
"0x3aea1b343ab62ee8b5251e71f68aaee0a951cb03",
"0xda43b2f3f9e9ef399546d08cb0fd6b8943d71a9d73e9b530ab533aec0b2be69b"],[
"0xdeea0d008e4d966191fc1fd6c67272956208cf9f",
"0x8812c6fbc7e39c8efe0a7e9957fb651f9b37d0cc5bc1b58a86c9633d854d5ae3"
]]]
```

## getaccountroots

Returns the 16 sub-merkle roots of the specified account storage. The hash of all roots together should return the account.storageRoot hash value.

RPC call: `["getaccountroots", index, account]`

Parameters:

*   index: integer - block index
*   account: binary  - account address

Response:

*   `["response", "getstateroots", account_roots]`

account_roots:

*    16 x binary - 16 account hash

Example:

```
["getaccountroots", 189462, "0xdeea0d008e4d966191fc1fd6c67272956208cf9f"]
>> ["response","getaccountroots",[
"0xc5d026438f345b413fb7a9afe09a909fffe12adbc15d755e65872be43be5d27e",
"0xad4dc2937cba7f0380017522bf87af148eaa19787bef6a7640c64d55939f79b6",
"0x9af297d4b76e52fef84c9e148f60861c47bf545a2c2aee37e8cab6f470818f2c",
"0x26d8a38694a7725ef001a8f5acd292b3edbf8346a3710d44cbf4c5e56928174b",
"0x6ecacecd9f80d20087077225eb0cf313584d24eb72c5e72e09e44364638db45a",
"0xef56405dbbf82ede8346049094f3b4478339e6bc2ee3cd61b0bcee9104b6c6e0",
"0x6a041c23a8111b58863fb5ce6df220d99d2a849f5236442791f8d74603eb49d5",
"0xff1a24e061a3a4d5ea9b78bd9a22aa96288d92bf9838e798c08041cb5962127c",
"0x6e62238f4dd5fa16e25f9a52e02aaf538f7238371eeea3de67b6d9d05454cdb2",
"0xd31405fbc0dd7f202d89aa5886f9a84cea7ee64ccf93675740766d88b5cea34d",
"0xf467cf2207b25529e4e99c6d86bf1278e0a239c5a9262bae40b829d62fbe951b",
"0x0105d4c20f91bb426cf43eef8bc6b69fad00d279dd97c5d78f960f381105d8cc",
"0x5580868f156ec53c7abb35d2aa7a9fbd67db2b4cde3bfa1c8859cce2b11fcaad",
"0xb141df7a1857cf056d61732524e868eddc6995dd6d4e60d8dcad13b23020c56c",
"0xc21848713073e2d3df4b4d6109d91f8ac252c670eea1d7c3815ae16f1ac4c435",
"0xec1e267dd2579ada733e8732ff164e88b20a36d82c181b2551c28279783d37ef"
]]

```

## getaccountvalue

Returns account (contract) storage data by account (contract) id and storage key and block index.

RPC call: `["getaccountvalue", index, account, key]`

Parameters:

*   index: integer - block index
*   account: binary - account address
*   key: binary **OR** integer - the key that should be retrieved, if an integer is specified it is first converted to a hex string

Response:

*   `["response", "getaccountvalue", proof]`

proof:

*   `<proof>` := `[<prefix>, <modulo>, <values>] | {<proof>, <proof>} | <hash>`
*   `<hash>` := binary
*   `<prefix>` := binary[0-32] - the prefix of the HASH(account)
*   `<modulo>` := integer 0-15 - modulo 16 of the last byte of HASH(account)
*   `<values>` := `[ account, <accountHash>, …]`
*   `<accountHash>` := HASH(RLP(`[nonce, balance, storageRoot, code]`))

Example:

```
["getaccountvalue", 189462, "0xdeea0d008e4d966191fc1fd6c67272956208cf9f","0x0000000000000000000000000000000000000000000000000000000000000000"]
>> ["response","getaccountvalue",[
"","0X05"
]]

```

## getnode

Retrieves the object of the server  from the kademlia network.

RPC call: `["getnode", key]`

Parameters:

*   key: binary - address of the node that shall be retrieved

Response

*   `["response", "getnode", <server_object>]`

Example:

```
["getnode","0x36c1031e7b38593bbd48943fe8c82f557017fac5"]
>>["response","getnode",[
"server",
"ipv4 address",
"0Xa053",
"0Xc76d",
"0x013edfd174175cc1b127deedcf5837415a4a9a4cacae7642b8671ec1286b797391541d2a6721c64889d7b9c9e132ac59d3003abc940a03ecbe735a01862919843a"
]]

```

## getobject

Retrieves an object of device from the kademlia network.

RPC call: `["getobject", key | device_id]`

Parameters:

*   key: binary- address of the object that should be fetched

Response

*   `["response", "getobject", <location_object>]`

Example:

```
["getobject","0x0808db74162847051c30084f316ef482954ec224"]
>> ["response","getobject",[
"location",
"0x36c1031e7b38593bbd48943fe8c82f557017fac5",
"0x00000a78cea0d1c7730ed747436c28ea450ed34cd4cc4b47104c25d243d661d4",
"0x0121e822492399ff06fa8855b249747c306e38b7d81205a8c1d223bb29f03697c064315b69af7c836fdf3875e1d389d04c63b871fdbb5cdde11bd62bda7cd3b1df","0x0017f28e0e4a881fea9c29da99a62f5d29f8b0919dad75bf09a94b44cad4f27f74560a37a4ec3badb3c09efd7c508e2fdc430225c93cf6ab1c20447fb587e640f6"
]]

```

## portopen

Requests to open a port on the target device. Ports can only be opened on nodes holding the actual device connection.

RPC call: `["portopen", device_id, port, (flags)]`

Parameters:

*   device_id: binary - public key of a target device
*   port: integer - port number
*   flags: binary[1-3] - defaults to "rw" can be any one of:
    *   "r" -> read only port
    *   "w" -> write only port
    *   "rw" -> read/write port
    *   "rs" -> shared read only port
    *   "ws" -> shared write only port
    *   "rws" -> shared read/write port

Response:

`["response", "portopen", "error", reason]`

*   Reason: string - Description of the error

	`["response", "portopen", "ok", ref]`

*   ref: binary - Unique identifier of the creating port connection

Example:

```
["portopen","0x0808db74162847051c30084f316ef482954ec224",80,"rw"]
>> ["response","portopen","ok","0X86f0"]

```

## portsend

Sends a chunk of data to the destination.

RPC call: `["portsend", ref, data]`

Parameters:

*   ref: binary - unique identifier of the creating port connection
*   data: binary - the payload

Response:

	["response", "portsend", "ok"]

	["response", "portsend", "error", reason]

*   reason: string - description of the error

Example:

```
["portsend",34544,"hexdata"]
>> ["response","portsend","ok"]

```

## portclose

Closes an open port.

RPC call: ["portclose", ref]

Parameters:

*   ref: binary - unique identifier of the creating port connection

Response:

*   ["response", "portclose", "ok"]

Example:

```
["portclose",34544]
>> ["response","portclose","ok"]

```

# DEVICE RPC

## portopen

Requests to open a port on the given port number using the unique identifier <ref> for access by the provided <access_id>.

RPC Call: ["portopen", port, ref, access_id]

Parameters:

*   port - integer the target port
*   ref: binary - unique identifier of the creating port connection

Response:

* Success:
    ["response", "portopen", ref, "ok"]

    *   ref: binary - the same unique identifier of the port connection

* Error:
    ["response", "portopen", ref, "error", reason]

    *   ref: binary - the same unique identifier of the port connection
    *   reason: string - description of the error

## portsend

Sends a chunk of data to the destination.

RPC Call: ["portsend", ref, data]

Parameters:

*   ref: binary - unique identifier of the creating port connection
*   data: binary - the payload

Response:

* Success:

    ["response", "portsend", "ok"]
    
* Error:

    ["response", "portsend", "error", reason]

    *   reason: string - Description of the error

## portclose

Closes an open port.

RPC Call: ["portclose", ref]

Parameters:

*   ref: binary - unique identifier of the creating port connection

Response:

["response", "portclose", "ok"]

## goodbye

Server disconnect.

RPC Call: ["goodbye",reasons…...]

Parameters:

*   reasons: array of binary - reason why server disconnect to device

Example:

["goodbye","ticket expected","you might get blacklisted"]

