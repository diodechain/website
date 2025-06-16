const zac_idlFactory = ({ IDL }) => {
    const Result_1 = IDL.Variant({ 'ok' : IDL.Nat32, 'err' : IDL.Text });
    const Result = IDL.Variant({ 'ok' : IDL.Vec(IDL.Nat32), 'err' : IDL.Text });
    const DataEntry = IDL.Record({
      'data' : IDL.Vec(IDL.Nat8),
      'timestamp' : IDL.Int,
    });
    const Message = IDL.Record({
      'id' : IDL.Nat32,
      'prev_msg_id' : IDL.Nat32,
      'ciphertext' : IDL.Vec(IDL.Nat8),
      'key_id' : IDL.Vec(IDL.Nat8),
      'hash' : IDL.Vec(IDL.Nat8),
      'next_msg_id' : IDL.Nat32,
      'timestamp' : IDL.Nat32,
    });
    const MetaDataInfo = IDL.Record({
      'public_key' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'timestamp' : IDL.Int,
      'manifest' : IDL.Nat,
      'vet_protected_key' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const DirectoryEntry = IDL.Record({
      'key' : IDL.Nat8,
      'timestamp' : IDL.Int,
    });
    const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
    const HttpResponsePayload = IDL.Record({
      'status' : IDL.Nat,
      'body' : IDL.Vec(IDL.Nat8),
      'headers' : IDL.Vec(HttpHeader),
    });
    const TransformArgs = IDL.Record({
      'context' : IDL.Vec(IDL.Nat8),
      'response' : HttpResponsePayload,
    });
    const TransferCyclesError = IDL.Variant({
      'too_few_cycles_requested' : IDL.Null,
      'canister_quota_reached' : IDL.Null,
      'other' : IDL.Text,
      'insufficient_cycles_available' : IDL.Null,
      'aggregate_quota_reached' : IDL.Null,
    });
    const TransferCyclesResult = IDL.Variant({
      'ok' : IDL.Nat,
      'err' : TransferCyclesError,
    });
    const ZoneAvailabilityCanister = IDL.Service({
      'add_message' : IDL.Func(
          [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
          [Result_1],
          [],
        ),
      'add_messages' : IDL.Func(
          [IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)))],
          [Result],
          [],
        ),
      'delete_data_entry' : IDL.Func([IDL.Nat8], [], ['oneway']),
      'derive_vet_protector_key' : IDL.Func(
          [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
          [IDL.Opt(IDL.Vec(IDL.Nat8))],
          [],
        ),
      'get_cycles_balance' : IDL.Func([], [IDL.Nat], ['query']),
      'get_data_entry' : IDL.Func([IDL.Nat8], [IDL.Opt(DataEntry)], ['query']),
      'get_installation_id' : IDL.Func([], [IDL.Int], ['query']),
      'get_logical_stable_storage_size' : IDL.Func([], [IDL.Nat], ['query']),
      'get_max_message_id' : IDL.Func([], [IDL.Nat32], ['query']),
      'get_max_message_id_by_key' : IDL.Func(
          [IDL.Vec(IDL.Nat8)],
          [IDL.Opt(IDL.Nat32)],
          ['query'],
        ),
      'get_message_by_hash' : IDL.Func(
          [IDL.Vec(IDL.Nat8)],
          [IDL.Opt(Message)],
          ['query'],
        ),
      'get_message_by_id' : IDL.Func([IDL.Nat32], [Message], ['query']),
      'get_messages_by_range' : IDL.Func(
          [IDL.Nat32, IDL.Nat32],
          [IDL.Vec(Message)],
          ['query'],
        ),
      'get_messages_by_range_for_key' : IDL.Func(
          [IDL.Vec(IDL.Nat8), IDL.Nat32, IDL.Nat32],
          [IDL.Vec(Message)],
          ['query'],
        ),
      'get_meta_data_info' : IDL.Func([], [MetaDataInfo], ['query']),
      'get_min_message_id' : IDL.Func([], [IDL.Nat32], ['query']),
      'get_min_message_id_by_key' : IDL.Func(
          [IDL.Vec(IDL.Nat8)],
          [IDL.Opt(IDL.Nat32)],
          ['query'],
        ),
      'get_role' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
      'get_stable_storage_size' : IDL.Func([], [IDL.Nat], ['query']),
      'get_timestamps' : IDL.Func([], [IDL.Vec(DirectoryEntry)], ['query']),
      'get_version' : IDL.Func([], [IDL.Nat], ['query']),
      'get_zone_id' : IDL.Func([], [IDL.Text], ['query']),
      'my_role' : IDL.Func([], [IDL.Nat], ['query']),
      'oracle_transform_function' : IDL.Func(
          [TransformArgs],
          [HttpResponsePayload],
          ['query'],
        ),
      'request_topup_if_low' : IDL.Func([], [TransferCyclesResult], []),
      'set_data_entry' : IDL.Func([IDL.Nat8, IDL.Vec(IDL.Nat8)], [], ['oneway']),
      'set_public_and_protected_key' : IDL.Func(
          [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
          [],
          ['oneway'],
        ),
      'test_record_input' : IDL.Func(
          [IDL.Tuple(IDL.Nat32, IDL.Nat32)],
          [IDL.Nat32],
          [],
        ),
      'test_record_output' : IDL.Func([], [IDL.Tuple(IDL.Nat32, IDL.Nat32)], []),
      'update_identity_role' : IDL.Func(
          [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
          [IDL.Nat],
          [],
        ),
      'update_role' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat], []),
    });
    return ZoneAvailabilityCanister;
  };
  const zac_init = ({ IDL }) => {
    return [
      IDL.Record({
        'rpc_host' : IDL.Text,
        'rpc_path' : IDL.Text,
        'zone_id' : IDL.Text,
        'cycles_requester_id' : IDL.Principal,
      }),
    ];
  };
  

  const ZoneAvailabilityCanister = (canisterId, options = {}) => {
    const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  
    if (options.agent && options.agentOptions) {
      console.warn(
        "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
      );
    }
  
    // Creates an actor with using the candid interface and the HttpAgent
    return Actor.createActor(zac_idlFactory, {
      agent,
      canisterId,
      ...options.actorOptions,
    });
  };
  