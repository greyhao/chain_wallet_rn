import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import CommonStyles from "../common/CommonStyle";
import { validInput } from "../utils/InputUtil";

const TransferScreen = ({ route, navigation }) => {

  const { symbol, balance, logo } = route.params;

  const [inputAmount, setAmount] = useState('');

  useEffect(() => {
    // 动态改变标题
    navigation.setOptions({
      title: symbol,
    });
  });

  function checkInputAndShowConfirmDialog() {
    const amount = inputAmount.trim();
    if(validInput(amount)) {
      
    } else {
      alert('请输入数量');
    }
  }

  function confirmDialog() {

  }

  return (
    <SafeAreaView style={CommonStyles.safeView}>
      <View style={CommonStyles.container}>
        <Text>功能待添加</Text>
        {/* <Text>{symbol}</Text>
        <Text>{balance}</Text>
        <TextInput style={CommonStyles.inputText} placeholder="请输入转账数量" value={inputAmount} onChangeText={setAmount} />
        <Text onPress={() => {
          checkInputAndShowConfirmDialog();
        }}>确认</Text> */}
      </View>
    </SafeAreaView>
  );
}

export default TransferScreen;