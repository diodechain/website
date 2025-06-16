const { Actor, HttpAgent } = Agent;

// Imports and re-exports candid interface
const factory_idlFactory = ({ IDL }) => {
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
    const Timestamp = IDL.Nat64;
    const TransferError = IDL.Variant({
      'GenericError' : IDL.Record({
        'message' : IDL.Text,
        'error_code' : IDL.Nat,
      }),
      'TemporarilyUnavailable' : IDL.Null,
      'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
      'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
      'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
      'CreatedInFuture' : IDL.Record({ 'ledger_time' : Timestamp }),
      'TooOld' : IDL.Null,
      'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
    });
    const TransferResult = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TransferError });
    return IDL.Service({
      'create_zone_availability_canister' : IDL.Func(
          [IDL.Text, IDL.Text, IDL.Text],
          [IDL.Principal],
          [],
        ),
      'cycles_manager_transferCycles' : IDL.Func(
          [IDL.Nat],
          [TransferCyclesResult],
          [],
        ),
      'get_cycles_balance' : IDL.Func([], [IDL.Nat], ['query']),
      'get_cycles_manager_children' : IDL.Func(
          [],
          [IDL.Vec(IDL.Principal)],
          ['query'],
        ),
      'get_cycles_manager_children_count' : IDL.Func([], [IDL.Nat], ['query']),
      'get_cycles_manager_info' : IDL.Func([], [IDL.Text], ['query']),
      'get_stable64_size' : IDL.Func([], [IDL.Nat64], []),
      'get_stable_size' : IDL.Func([], [IDL.Nat32], []),
      'get_version' : IDL.Func([], [IDL.Nat], ['query']),
      'install_code' : IDL.Func(
          [IDL.Principal, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
          [],
          [],
        ),
      'refund' : IDL.Func([], [IDL.Opt(TransferResult)], []),
    });
};

const CanisterFactory = ((canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(factory_idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
})("dgnum-qiaaa-aaaao-qj3ta-cai");
