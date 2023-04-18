import { Address, bigInt, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer
} from "../generated/Babyboss/Babyboss"
import { NFT, Claim } from "../generated/schema"
import { StakingAddress, ZeroAddress } from "./common"

export function handleApproval(event: Approval): void {
  const nftId = event.address.toHex() + "-" + event.params.tokenId.toString()
  let nft = NFT.load(nftId)
  if(!nft) {
    nft = new NFT(nftId)
    nft.tokenId = event.params.tokenId
    nft.owner = ZeroAddress
    nft.approved = ZeroAddress
    nft.stake = false
    nft.startTime = BigInt.fromString("0")
  }
  nft.approved = event.params.approved
  nft.save()
  
  // - contract.MAX_NFT_SUPPLY(...)
  // - contract.balanceOf(...)
  // - contract.getApproved(...)
  // - contract.getOwnershipData(...)
  // - contract.isApprovedForAll(...)
  // - contract.mintLimitPerWallet(...)
  // - contract.mintPrice(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerEarning(...)
  // - contract.ownerOf(...)
  // - contract.pauseMint(...)
  // - contract.referrerEarning(...)
  // - contract.reveal(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)
  // - contract.unrevealURI(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {
  const nftId = event.address.toHex() + "-" + event.params.tokenId.toString()
  let nft = NFT.load(nftId)
  if(!nft) {
    nft = new NFT(nftId)
    nft.tokenId = event.params.tokenId
    nft.owner = ZeroAddress
    nft.approved = ZeroAddress
    nft.stake = false
    nft.startTime = BigInt.fromString("0")
  }
  if(event.params.to.toHex() != StakingAddress.toLowerCase()) {
    nft.owner = event.params.to
  }
  nft.save()
}
