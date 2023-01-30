import React, { useState, useEffect, useRef } from "react";
import { FlatList, View, Text, Image, Button, ActivityIndicator, TouchableOpacity, } from "react-native";
import { alchemy } from '../utils/AlchemyUtil';
import { Utils } from "alchemy-sdk";
import { loadContractMetaByAddress } from "../utils/ContractMetaUtil";
import { SCREEN_INFO } from "../../App";

const TokenList = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    tokensBalance();
  }, []);

  const TokenInfo = (symbol, balance, logo) => (
    {
      symbol: symbol,
      balance: balance,
      logo: logo,
    }
  );

  async function tokensBalance() {
    const address = global.currentAddress;
    try {
      let ethBalance = await alchemy.core.getBalance(address, 'latest');
      ethBalance = Utils.formatEther(ethBalance);
      const ethInfo = TokenInfo('ETH', ethBalance, 'https://assets.coingecko.com/coins/images/279/small/ethereum.png');
      const ethList = [ethInfo];

      const balances = await alchemy.core.getTokenBalances(address);
      const nonZeroBalances = balances.tokenBalances.filter((token) => {
        return Number(token.tokenBalance).toString() !== '0';
      });
      let info = {};
      const tokenList = [];

      for (let token of nonZeroBalances) {
        let balance = token.tokenBalance;
        const metadata = await loadContractMetaByAddress(token.contractAddress);
        balance = balance / Math.pow(10, metadata.decimals);
        balance = balance.toFixed(4);
        info = TokenInfo(metadata.symbol, balance, metadata.logo);
        tokenList.push(info);
      }
      // ETH 添加到列表头
      const list = ethList.concat(tokenList);
      setTokenList(list);
    } catch (e) {
      alert('tokensBalance error!! \n' + e)
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      {/* <Button title="load tokens balance" onPress={() => {
        setLoading(true);
        tokensBalance();
      }} /> */}
      {loading ? <ActivityIndicator /> :
        <FlatList data={tokenList}
          ItemSeparatorComponent={<View style={{ height: 1, backgroundColor: '#bbb' }} />}
          renderItem={
            ({ item }) =>
              <TouchableOpacity onPress={() => {
                navigation.navigate(SCREEN_INFO.TRANSFER_SCREEN, item);
              }}>
                <View
                  style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, }}>
                  <Image source={{ uri: item.logo, height: 24, width: 24 }} />
                  <Text style={{ marginHorizontal: 15, width: 70 }}>{item.symbol}</Text>
                  <Text>{item.balance}</Text>
                </View>
              </TouchableOpacity>
          } />}
    </View>
  );
}

export default TokenList;
