import { Address, bigInt, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Stake,
  UnStake,
  ClaimRewards,
} from "../generated/StakingContract/StakingContract"
import { NFT, Claim } from "../generated/schema"
import { NFTAddress, ZeroAddress } from "./common"

export function handleStake(event: Stake): void {
  const nftId = NFTAddress.toHex() + "-" + event.params.tokenId.toString()
  let nft = NFT.load(nftId)
  if(!nft) {
    nft = new NFT(nftId)
    nft.tokenId = event.params.tokenId
    nft.owner = ZeroAddress
    nft.approved = ZeroAddress
    nft.stake = false
    nft.startTime = BigInt.fromString("0")
  }
  nft.stake = true
  nft.startTime = event.block.timestamp
  nft.save()
}

export function handleUnStake(event: UnStake): void {
  const nftId = NFTAddress.toHex() + "-" + event.params.tokenId.toString()
  let nft = NFT.load(nftId)
  if(!nft) {
    nft = new NFT(nftId)
    nft.tokenId = event.params.tokenId
    nft.owner = ZeroAddress
    nft.approved = ZeroAddress
    nft.stake = false
    nft.startTime = BigInt.fromString("0")
  }
  nft.startTime = BigInt.fromString("0")
  nft.stake = false
  nft.save()
}

export function handleClaimRewards(event: ClaimRewards): void {
  const claimId = event.transaction.hash.toHex()
  let claim = Claim.load(claimId)
  if(!claim) {
    claim = new Claim(claimId)
    claim.address = ZeroAddress
    claim.amount = BigInt.fromString("0")
    claim.createdAt = event.block.timestamp
  }
  claim.address = event.params.user
  claim.amount = event.params.amount
  claim.save()
}