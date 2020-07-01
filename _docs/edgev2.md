---
title: EdgeV2 RPC
category: Documentation
---

The Edge V2 protocol uses [Ethereums Recursive Length Prefix encoding (RLP)](https://github.com/ethereum/wiki/wiki/RLP) over secure [TLS1.3 channels](https://en.wikipedia.org/wiki/Transport_Layer_Security). Each message in the protocol prefixed with two bytes, a 16-bit length field of the RLP payload. Number encodings is always big-endian. Requests in the protocol look like this:

```
|<Two bytes of lenth>||[<Request ID>, [<RPC method>, <arg_1>, <arg_2>, ..., <arg_n>]]|
|       Length       ||                     RLP Payload                              |  
``` 

For each request the corresponding response will have the same `<Request ID>` value and it's first value will be the string `"response"`:

```
|<Two bytes of lenth>||[<Request ID>, ["response", <ret_1>, <ret_2>, ..., <ret_n>]]|
|       Length       ||                     RLP Payload                            |
``` 

For example, if we want to get block header of block nr 100, the RPC command could be `[1, ["getblockheader", 100]]` encoded into RLP. The RLP byte sequence will be of 19 bytes length. And thus the message is prefixed with the two byte (16-bit) encoding of 19 `<<0, 19>>`.

Here a transcript of encoding the sample message on an Elixir console:

```elixir
iex(0)> payload = [1, ["getblockheader", 100]]
[1, ["getblockheader", 100]]

iex(1)> rlp = Rlp.encode!(payload)
<<210, 1, 208, 142, 103, 101, 116, 98, 108, 111, 99, 107, 104, 101, 97, 100,
  101, 114, 100>>

iex(2)> size = byte_size(rlp)
19

iex(3)> message = <<size :: unsigned-size(16), rlp::binary>>
<<0, 19, 210, 1, 208, 142, 103, 101, 116, 98, 108, 111, 99, 107, 104, 101, 97,
  100, 101, 114, 100>>

```

# Client Implementation

The reference implementation used in the prenet is the open source [Diode GO Client](https://github.com/diodechain/diode_go_client).

## Data types

### Integer
Integers are big-endian encoded.

### Binary
Binaries are stored natively in RLP.

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

### Server Object v1

RPC: `["server", <host>, <edge_port>, <server_port>, <signature>]`

*   **host**: binary - name or ip address of the host
*   **edge_port**: integer - port for IoT devices to connect
*   **server_port**: integer - port for other cloud software to connect
*   **signature**: binary - Signature of the bert encoded list: `[<host>, <edge_port>, <server_port>]`

### Server Object v2

RPC: `["server", <host>, <edge_port>, <server_port>, <version>, <extra>, <signature>]`

*   **host**: binary - name or ip address of the host
*   **edge_port**: integer - port for IoT devices to connect
*   **server_port**: integer - port for other cloud software to connect
*   **version**: binary - string represnting a server version identification
*   **extra**: list - `[[<key>, <value>]]` key value list with key being a binary string and value being an integer
*   **signature**: binary - Signature of the bert encoded list: `[<host>, <edge_port>, <server_port>, <version>, <extra>]`

# Edge RPC API Reference

## getblockpeak()

Returns the current block number.

RPC call: `["getblockpeak"]`

Parameters:

*   none

Response:

*   `["response", blockNumber]`
*   blockNumber: integer - the highest valid block number

Example:

```elixir
<< ["getblockpeak"]

>> ["response", 100]
```

## getblockheader(int)

Returns block header information about a block by block index (block number).

RPC call: `["getblockheader", index]`

Parameters:

*   index: integer - block number

Response

*   `["response", block_header]`

block_header:

*   previous_block: binary - previous block hash
*   miner: binary - miner publickey
*   miner_signature: binary - miner signature of this block
*   block_hash: binary - block hash
*   state_hash: binary - state hash
*   transaction_hash: binary - transaction hash
*   timestamp: integer - timestamp

Example:

```elixir
<< ["getblockheader", 189462]

>> ["response", [
  ["transaction_hash", 0x4309bcba566dde47811c47fa17eda8251761909a39934d3ae48cb5fb2f90cb14]
  ["timestamp", 0x5d5392b4,
  ["state_hash", 0xc579e39541eb2907677384b995017c28fe3dc105ae0c3bf8476bb4bbccad7def,
  ["previous_block", 0x00005e0fbc09d917905c47a41fddfd695278b823eddf2490cf4abe8f87be2071,["miner_signature", 0x00764f10ff4365db2165a8cf4aa9dce8be67fb1f2cff43ae51cf288e6311eb9f0d3ec9a75406f9060805ed36b17720736f278300fe84fcfb9cebda78676df4d477],
  ["miner", ""],
  ["block_hash", 0x00003335f640c174ac2a04e0b8537e1adc3a9e035f5f8f4bbc6937578289c43e],
]]
```

## getblock(int)

Returns block information about a block by block index (block number).

RPC call: `["getblock", index]`

Parameters

*    index: integer - block number

Response:

*   `["response", block]`

block:

*   transactions: array of transaction
*   receipts: array of transaction receipt
*   header: block_header (see above)

Example:

```elixir
<< ["getblock", 189462]

>> ["response", [
  ["transactions", []],
  ["receipts", []],
  ["header": [
    ["transaction_hash", 0x4309bcba566dde47811c47fa17eda8251761909a39934d3ae48cb5fb2f90cb14],
    ["timestamp", 0x5d53c51d],
    ["state_hash", 0xc579e39541eb2907677384b995017c28fe3dc105ae0c3bf8476bb4bbccad7def],
    ["previous_block", 0x00004f6ca36a5d67135707b32355665976f9bdb0b57b2a8962c616f949d39363],
    ["miner_signature", 0x01e2c1afc76ea799feaf8fa3daa5317cbe9d578f27417d893358d61e64f9ec62720362894a48508fcf9a4ed9a999dadeed4ef4254e8b8fde604902436cf0c05cb0,
    ["miner", ""]
    ["block_hash", 0x00002ac3dc9997f624fa9b8c90e4375ca2be4ad8a558bc393ca9127a0915a8bd]
]]]
```

## getstateroots(int)

Returns the 16 sub-merkle roots of the state (accounts) storage. The hash of all roots together should return then block_header.state_root hash value.

RPC call, `["getstateroots", index]`

Parameters:

*   index: integer - block index

Response:

* `["response", state_roots]`

state_roots:

*    16 x binary - 16 state hashes

Example

```elixir
<< ["getstateroots", 189462]

>> ["response", [
  0xc5d026438f345b413fb7a9afe09a909fffe12adbc15d755e65872be43be5d27e,
  0xad4dc2937cba7f0380017522bf87af148eaa19787bef6a7640c64d55939f79b6,
  0x75fef175fe530fdcebfda15a85d5b5d7680758963fb986151155868c3c126845,
  0x26d8a38694a7725ef001a8f5acd292b3edbf8346a3710d44cbf4c5e56928174b,
  0x6ecacecd9f80d20087077225eb0cf313584d24eb72c5e72e09e44364638db45a,
  0x86dfae6acc66a2de136c47e6f3e93c5d1c8ca696f5e129c472a4394bfafb65e9,
  0x7f8b60aa695ba2cae9e4e421493c4ed610fd2cf56d9f173706f7439e86742147,
  0xff1a24e061a3a4d5ea9b78bd9a22aa96288d92bf9838e798c08041cb5962127c,
  0x34568925599c25225f36571daaecf73c9975d4489e95741b3ed66d0ca1e8913d,
  0xd31405fbc0dd7f202d89aa5886f9a84cea7ee64ccf93675740766d88b5cea34d,
  0xf467cf2207b25529e4e99c6d86bf1278e0a239c5a9262bae40b829d62fbe951b,
  0xbd095f49b588be346c93ff7204eed0a2591347e09b8be2e4c70152ce57ab82b9,
  0xe73817f797acfba37691287d15915064991b7d92daf198affc0ba1338e4476b7,
  0xb141df7a1857cf056d61732524e868eddc6995dd6d4e60d8dcad13b23020c56c,
  0x5009d2b4e4e2833df471f7d636b5ecee9345ce8212a09fcb81a25289cc2eae5b,
  0xec1e267dd2579ada733e8732ff164e88b20a36d82c181b2551c28279783d37ef
]]
```

## getaccount(block_index, account)

Return account and the merkle proof of account in the given index.

RPC call: `["getaccount", index, account]`

Parameters:

*   index: integer - block index
*   account: hex string- the account id

Response:

*   `["response", account, proof]`

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

```elixir
<< ["getaccount", 189462, 0xdeea0d008e4d966191fc1fd6c67272956208cf9f]

>> ["response", [
  ["storageRoot", 0x438a90405daa876539082cd0baf6cddaa3bf880f1c8af0c0381f0042db93088a],
  ["nonce", 2],
  ["code", 0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855],
  ["balance", 0x0de04867d0e8d000]
], [
  "",
  [0x0c],[
    0x3aea1b343ab62ee8b5251e71f68aaee0a951cb03,
    0xda43b2f3f9e9ef399546d08cb0fd6b8943d71a9d73e9b530ab533aec0b2be69b
  ],[
    0xdeea0d008e4d966191fc1fd6c67272956208cf9f,
    0x8812c6fbc7e39c8efe0a7e9957fb651f9b37d0cc5bc1b58a86c9633d854d5ae3
  ]
]]
```

## getaccountroots(block_nr, account)

Returns the 16 sub-merkle roots of the specified account storage. The hash of all roots together should return the account.storageRoot hash value.

RPC call: `["getaccountroots", index, account]`

Parameters:

*   index: integer - block index
*   account: binary  - account address

Response:

*   `["response", account_roots]`

account_roots:

*    16 x binary - 16 account hash

Example:

```elixir
<< ["getaccountroots", 189462, 0xdeea0d008e4d966191fc1fd6c67272956208cf9f]

>> ["response", [
  0xc5d026438f345b413fb7a9afe09a909fffe12adbc15d755e65872be43be5d27e,
  0xad4dc2937cba7f0380017522bf87af148eaa19787bef6a7640c64d55939f79b6,
  0x9af297d4b76e52fef84c9e148f60861c47bf545a2c2aee37e8cab6f470818f2c,
  0x26d8a38694a7725ef001a8f5acd292b3edbf8346a3710d44cbf4c5e56928174b,
  0x6ecacecd9f80d20087077225eb0cf313584d24eb72c5e72e09e44364638db45a,
  0xef56405dbbf82ede8346049094f3b4478339e6bc2ee3cd61b0bcee9104b6c6e0,
  0x6a041c23a8111b58863fb5ce6df220d99d2a849f5236442791f8d74603eb49d5,
  0xff1a24e061a3a4d5ea9b78bd9a22aa96288d92bf9838e798c08041cb5962127c,
  0x6e62238f4dd5fa16e25f9a52e02aaf538f7238371eeea3de67b6d9d05454cdb2,
  0xd31405fbc0dd7f202d89aa5886f9a84cea7ee64ccf93675740766d88b5cea34d,
  0xf467cf2207b25529e4e99c6d86bf1278e0a239c5a9262bae40b829d62fbe951b,
  0x0105d4c20f91bb426cf43eef8bc6b69fad00d279dd97c5d78f960f381105d8cc,
  0x5580868f156ec53c7abb35d2aa7a9fbd67db2b4cde3bfa1c8859cce2b11fcaad,
  0xb141df7a1857cf056d61732524e868eddc6995dd6d4e60d8dcad13b23020c56c,
  0xc21848713073e2d3df4b4d6109d91f8ac252c670eea1d7c3815ae16f1ac4c435,
  0xec1e267dd2579ada733e8732ff164e88b20a36d82c181b2551c28279783d37ef
]]

```

## getaccountvalue(block_index, account, key)

Returns account (contract) storage data by account (contract) id and storage key and block index.

RPC call: `["getaccountvalue", index, account, key]`

Parameters:

*   index: integer - block index
*   account: binary - account address
*   key: binary **OR** integer - the key that should be retrieved, if an integer is specified it is first converted to a hex string

Response:

*   `["response", proof]`

proof:

*   `<proof>` := `[<prefix>, <modulo>, <values>] | {<proof>, <proof>} | <hash>`
*   `<hash>` := binary
*   `<prefix>` := binary[0-32] - the prefix of the HASH(account)
*   `<modulo>` := integer 0-15 - modulo 16 of the last byte of HASH(account)
*   `<values>` := `[ account, <accountHash>, …]`
*   `<accountHash>` := HASH(RLP(`[nonce, balance, storageRoot, code]`))

Example:

```elixir
<< ["getaccountvalue", 189462, 0xdeea0d008e4d966191fc1fd6c67272956208cf9f,0x0000000000000000000000000000000000000000000000000000000000000000]

>> ["response", [
  "",0x05
]]

```

## getnode(key)

Retrieves the object of the server  from the kademlia network.

RPC call: `["getnode", key]`

Parameters:

*   key: binary - address of the node that shall be retrieved

Response

*   `["response", <server_object>]`

Example:

```elixir
<< ["getnode", 0x36c1031e7b38593bbd48943fe8c82f557017fac5]

>> ["response", [
  "server",
  "ipv4 address",
  0xa053,
  0xc76d,
  0x013edfd174175cc1b127deedcf5837415a4a9a4cacae7642b8671ec1286b797391541d2a6721c64889d7b9c9e132ac59d3003abc940a03ecbe735a01862919843a
]]
```

## getobject(key)

Retrieves an object of device from the kademlia network.

RPC call: `["getobject", key | device_id]`

Parameters:

*   key: binary - address of the object that should be fetched

Response

*   `["response", <location_object>]`

Example:

```elixir
<< ["getobject", 0x0808db74162847051c30084f316ef482954ec224]

>> ["response", [
  "location",
  0x36c1031e7b38593bbd48943fe8c82f557017fac5,
  0x00000a78cea0d1c7730ed747436c28ea450ed34cd4cc4b47104c25d243d661d4,
  0x0121e822492399ff06fa8855b249747c306e38b7d81205a8c1d223bb29f03697c064315b69af7c836fdf3875e1d389d04c63b871fdbb5cdde11bd62bda7cd3b1df,
  0x0017f28e0e4a881fea9c29da99a62f5d29f8b0919dad75bf09a94b44cad4f27f74560a37a4ec3badb3c09efd7c508e2fdc430225c93cf6ab1c20447fb587e640f6
]]
```

## sendtransaction(tx)

Submit a transaction to the network.

RPC call: `["sendtransaction", tx]`

Parameters:

*   tx: binary - RLP encoded signed transactions that is to be submitted

Response

*   `["response", "ok"]`

Example:

```elixir
<< ["sendtransaction", 0x0808db74162847051c30084f316ef482954ec224]

>> ["response", "ok"]
```



## portopen(device, port, flags = "rw")

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

`["response", "error", reason]`

*   Reason: string - Description of the error

	`["response", "ok", ref]`

*   ref: binary - Unique identifier of the creating port connection

Example:

```elixir
<< ["portopen", 0x0808db74162847051c30084f316ef482954ec224, 80, "rw"]

>> ["response", "ok", 0x86f0]

```

## portsend(ref, data)

Sends a chunk of data to the destination.

RPC call: `["portsend", ref, data]`

Parameters:

*   ref: binary - unique identifier of the creating port connection
*   data: binary - the payload

Response:

	["response", "ok"]

	["response", "error", reason]

*   reason: string - description of the error

Example:

```elixir
<< ["portsend", 34544, "hexdata"]

>> ["response", "ok"]
```

## portclose(ref)

Closes an open port.

RPC call: ["portclose", ref]

Parameters:

*   ref: binary - unique identifier of the creating port connection

Response:

*   ["response", "ok"]

Example:

```elixir
<< ["portclose",34544]

>> ["response", "ok"]
```

# DEVICE RPC

These are calls that can be made from the server down to the edge.

## << portopen(port, ref, access_id)

Requests to open a port on the given port number using the unique identifier <ref> for access by the provided <access_id>.

RPC Call: ["portopen", port, ref, access_id]

Parameters:

*   port - integer the target port
*   ref: binary - unique identifier of the creating port connection

Response:

* Success:
    ["response", ref, "ok"]

    *   ref: binary - the same unique identifier of the port connection

* Error:
    ["response", ref, "error", reason]

    *   ref: binary - the same unique identifier of the port connection
    *   reason: string - description of the error

## << portsend(ref, data)

Sends a chunk of data to the destination.

RPC Call: ["portsend", ref, data]

Parameters:

*   ref: binary - unique identifier of the creating port connection
*   data: binary - the payload

Response:

* Success:

    ["response", "ok"]
    
* Error:

    ["response", "error", reason]

    *   reason: string - Description of the error

## << portclose(ref)

Closes an open port.

RPC Call: ["portclose", ref]

Parameters:

*   ref: binary - unique identifier of the creating port connection

Response:

["response", "ok"]

## << goodbye(reason, ...)

Server disconnect. This is the only command that does not expect a response, since the connection is closed immediately after it.

RPC Call: ["goodbye",reasons...]

Parameters:

*   reasons: array of binary - reason why server disconnect to device

Example:

["goodbye","ticket expected","you might get blacklisted"]

