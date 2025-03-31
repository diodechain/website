#! /usr/bin/env elixir
Mix.install([:jason])

contract_root = Path.absname("../../poc-contract")
{_, 0} = System.cmd("forge", ["compile"], cd: contract_root)

defmodule Abi do
  def update(contract_root, source, destination) do
    abi =
      Path.join(contract_root, "out/#{source}.sol/#{source}.json")
      |> File.read!()
      |> Jason.decode!()
      |> Map.get("abi")
      |> Jason.encode!(pretty: true)


    File.write!("./#{destination}-abi.js", "var #{destination}Abi = #{abi};")
  end
end


Abi.update(contract_root, "TokenVesting", "vesting")
Abi.update(contract_root, "YieldVault", "yieldvault")
Abi.update(contract_root, "ERC20", "erc20")
