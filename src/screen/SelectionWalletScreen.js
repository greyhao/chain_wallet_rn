import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { retrieveByKey, storeData } from '../utils/StorageUtil';
import { ALL_ADDRESS, CURRENT_ADDRESS } from '../utils/Const';
import { SCREEN_INFO } from "../../App";
import CommonStyles from "../common/CommonStyle";

const SelectionWalletScreen = ({ navigation }) => {

  const [walletList, setWalletList] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    loadList();
  });

  async function loadList() {
    setAddress(global.currentAddress);
    const temp = await retrieveByKey(ALL_ADDRESS);
    if (temp !== undefined) {
      setWalletList(JSON.parse(temp));
    }
  }

  function changeCurrent(address) {
    storeData(CURRENT_ADDRESS, address);
    global.currentAddress = address;
  }

  function goHome() {
    navigation.navigate(SCREEN_INFO.HOME, { params: { needLoad: true } })
  }

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 10, display: "flex", flexDirection: 'row' }}>
      <Text
        onPress={() => {
          changeCurrent(item);
          goHome();
        }}
        style={{ color: address === item ? "#f00" : '#303133' }}>{item}</Text>
      {address === item && <Text style={{ marginLeft: 5 }}>☑️</Text>}
    </View>
  );

  return (
    <View style={CommonStyles.container}>
      <Text>选择钱包</Text>
      <FlatList data={walletList} renderItem={renderItem} keyExtractor={item => item} />
    </View>
  );
}

export default SelectionWalletScreen;