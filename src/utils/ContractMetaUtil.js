/**
 * token contract info
 * when use first load from local, if local is null load from server, server load success save to local
 */

import { storeData, retrieveByKey } from '../utils/StorageUtil';
import { alchemy } from './AlchemyUtil';

// erc20 合约信息结构
const ContractMeta = (address, symbol, decimals, logo) => ({
  address: address,
  symbol: symbol,
  decimals: decimals,
  logo: logo,
});

// erc20
async function loadContractMetaByAddress(address) {
  let info = await loadLocalContractMeta(address);
  if (info === undefined) {
    info = loadServerContractMeta(address);
  }
  return info;
}

function saveContractMeat(address, info) {
  storeData(address, info);
}

async function loadLocalContractMeta(address) {
  let info = undefined;
  try {
    const localInfo = await retrieveByKey(address);
    if (localInfo !== undefined) {
      info = JSON.parse(localInfo);
    }
  } catch (e) {
    info = undefined;
  }
  return info;
}

async function loadServerContractMeta(address) {
  let info = undefined;
  try {
    const response = await alchemy.core.getTokenMetadata(address);
    info = ContractMeta(address, response.symbol, response.decimals, response.logo);
    saveContractMeat(address, info);
  } catch (e) {
  }
  return info;
}

// erc721 and erc1155
async function loadNftMeta(address, tokenId) {
  let info = undefined;
  try {
    let localStr = await loadLocalNftMeta(address, tokenId);
    if (localStr === undefined) {
      info = loadServerNftMeta(address, tokenId);
    } else {
      info = localStr;
    }
  } catch(e) {
    info = e;
  }
  return info;
}

async function loadLocalNftMeta(address, tokenId) {
  let info = undefined;
  try {
    const key = (tokenId === undefined) ? address : (address + '_' + tokenId);
    const localInfo = await retrieveByKey(key);
    if (localInfo !== undefined) {
      info = JSON.parse(localInfo);
    }
  } catch (e) {
    info = undefined;
  }
  return info;
}

async function loadServerNftMeta(address, tokenId) {
  let info = undefined;
  try {
    const response = (tokenId === undefined) ? (await alchemy.nft.getNftMetadata(address)) : (await alchemy.nft.getNftMetadata(address, tokenId));
    info = response;
    const key = (tokenId === undefined) ? address : (address + '_' + tokenId);
    saveContractMeat(key, info);
  } catch (e) {
    info = undefined;
  }
  return info;
}

export {
  loadContractMetaByAddress,
  loadNftMeta,
  loadLocalContractMeta,
}