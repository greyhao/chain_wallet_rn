import React from "react";
import { SafeAreaView } from "react-native";
import CommonStyles from "../common/CommonStyle";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SendTransactionsView from "../components/transaction/SendTransactionsView";
import ReceiveTransactionsView from "../components/transaction/ReceiveTransactionsView";
import { loadContractMetaByAddress, loadNftMeta } from "../utils/ContractMetaUtil";
import { fromHex } from "alchemy-sdk";

const TAB_TYPE = {
  SEDN: '发送',
  RECEIVE: '接收',
};

// 请求中一些参数默认值
const fromBlock = '0x0';
const maxCount = 8;

const requestCommonParams = {
  fromBlock: fromBlock,
  category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
  maxCount: maxCount,
  withMetadata: true,
  order: 'desc',
};

// 格式化时间未当前时区时间
const toLocalTime = (utc) => {
  return (new Date(`${utc}`)).toLocaleString();
}

// 处理接口请求数据，逻辑处理：时间格式处理、erc721 和 erc1155 数据处理；
// 交易记录信息对象
const TransferInfo = async (info) => {
  // 时间转为当地时间
  info.metadata.blockTimestamp = toLocalTime(info.metadata.blockTimestamp);
  // 获取合约信息
  if(info.category === 'erc20') {
    info.contractMeta = await loadContractMetaByAddress(info.rawContract.address);
  } else if(info.category === 'erc1155') {
    for(let i = 0; i < info.erc1155Metadata.length; i++) {
      const erc1155 = info.erc1155Metadata[i];
      const nftMeta = await loadNftMeta(info.rawContract.address, erc1155.tokenId);
      info.erc1155Metadata[i].nftMeta = nftMeta;
      info.erc1155Metadata[i].showValue = fromHex(erc1155.value);
    }
  } else if(info.category === 'erc721') {
    const nftMeta = await loadNftMeta(info.rawContract.address, info.tokenId);
    info.nftMeta = nftMeta;
  }
};

const address = '0xbde8d3ef66ea8a6c38024615e0117c4d7b3d5cd9'; // 720
// const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // vitalik.eth

const TranscationsScreen = () => {

  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={CommonStyles.safeView}>
      <Tab.Navigator
        initialRouteName={TAB_TYPE.SEDN}
        screenOptions={{
          tabBarActiveTintColor: '#f00',
          tabBarLabelStyle: { fontSize: 14, fontWeight: '500' },
          tabBarStyle: { backgroundColor: 'powderblue' }
        }}>
        <Tab.Screen name={TAB_TYPE.SEDN} component={SendTransactionsView} initialParams={{address: global.currentAddress}}/>
        <Tab.Screen name={TAB_TYPE.RECEIVE} component={ReceiveTransactionsView} initialParams={{address: global.currentAddress}}/>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TranscationsScreen;
export {
  TransferInfo,
  requestCommonParams,
}