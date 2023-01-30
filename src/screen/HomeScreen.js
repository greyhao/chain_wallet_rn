import React, { useState, useEffect } from "react";
import { useColorScheme, SafeAreaView, StatusBar, View, Text, Button, Alert } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SCREEN_INFO } from "../../App";
import { CURRENT_ADDRESS } from "../utils/Const";
import { retrieveByKey } from "../utils/StorageUtil";
import CommonStyles from "../common/CommonStyle";
import TokenList from "../components/TokenList";


const HomeScreen = ({ navigation, route }) => {

  const [address, setAddress] = useState('');

  async function loadCurrentAddress() {
    let temp = await retrieveByKey(CURRENT_ADDRESS);
    if (temp !== undefined) {
      temp = JSON.parse(temp);
    } else {
      temp = ''
    }
    setAddress(temp);
    global.currentAddress = address;
  }

  useEffect(() => {
    if (route.params?.needLoad) {
      loadCurrentAddress();
    }
  }, [route.params?.needLoad]);

  useEffect(() => {
    setAddress(global.currentAddress);
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="设置" color='#fff' onPress={() => {
          navigation.navigate(SCREEN_INFO.MANAGER)
        }} />
      ),
    });
  }, [navigation]);

  function showAlert(msg) {
    Alert.alert('提示', msg)
  }

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={CommonStyles.container}>
        <View>
          <Text>当前钱包地址 {address}</Text>
        </View>

        <View style={CommonStyles.layoutRowFixToText}>
          <Button title="转账" onPress={() => {
            showAlert('功能待添加')
          }}/>
          <Button title="收款" onPress={() =>
            navigation.navigate(SCREEN_INFO.WALLET_QRCODE)
          } />
          <Button title="交易记录" onPress={() =>
            navigation.navigate(SCREEN_INFO.TRANSCATIONS)
          } />
          <Button title="RSS3 记录" onPress={() =>
            navigation.navigate(SCREEN_INFO.RSS3_TRANSCATIONS)
          } />
        </View>

        <Text>Tokens</Text>
        <TokenList navigation={navigation}/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;