/**
 * create or import wallet
 */
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, ActivityIndicator, TextInput } from "react-native";
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from "ethers";
import { storeData, retrieveByKey, clearAllData } from '../utils/StorageUtil';
import { ALL_ADDRESS, CURRENT_ADDRESS } from "../utils/Const";
import { SCREEN_INFO } from "../../App";
import { validInput } from "../utils/InputUtil";
import CommonStyles from "../common/CommonStyle";

const PAGE_TYPE = {
  CREATE: "Create",
  IMPORT: 'Import',
}

const CreateWalletScreen = ({ navigation, route }) => {

  const [address, setAddress] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [privatekey, setprivatekey] = useState('');

  const [input, setInput] = useState('');

  const [isHide, setHide] = useState(true);
  const [isCreating, setCreateing] = useState(false);

  const [pageType, setPageType] = useState(PAGE_TYPE.CREATE);
  const [firstAdd, setFirstAdd] = useState(false);

  useEffect(() => {
    const title = route.params?.title || PAGE_TYPE.CREATE;
    navigation.setOptions({
      title: title,
    });
    setPageType(title);

    setFirstAdd(route.params?.firstAdd || false);
  }, [route.params?.isCreate]);

  function importWallet() {
    if (!validInput(input.trim())) {
      alert('please input valid content')
      return;
    }
    setCreateing(true);
    setTimeout(() => {
      startImport(input.trim());
    }, 200);
  }

  function startImport(str) {
    if (input.includes(' ')) {
      importByMnemonic(str);
    } else {
      importByprivatekey(str);
    }
  }

  function importByMnemonic(str) {
    try {
      const wallet = ethers.Wallet.fromMnemonic(str);
      setAddress(wallet.address);
      setprivatekey(wallet.privatekey);
    } catch (e) {
      alert('please input right mnemonic!\n' + e)
    } finally {
      setCreateing(false)
    }
  }

  function importByprivatekey(str) {
    try {
      const wallet = new ethers.Wallet(str);
      setAddress(wallet.address);
      setprivatekey(str);
    } catch (e) {
      alert('please input right privatekey!\n' + e)
    } finally {
      setCreateing(false)
    }
  }

  function createWallet() {
    setCreateing(true)
    setTimeout(() => {
      create();
    }, 200);
  }

  async function create() {
    // let start = nowTime();
    try {
      const wallet = ethers.Wallet.createRandom();
      const str = await wallet.getAddress();
      setAddress(str);
      setMnemonic(wallet.mnemonic.phrase);
      setprivatekey(wallet.privatekey);
      // let end = nowTime();
    } catch (e) {
      alert('error ' + e)
    } finally {
      setCreateing(false)
    }
    // alert('start = ' + start + '\n end = ' + nowTime());
  }

  function nowTime() {
    return (new Date()).toLocaleString();
  }

  async function saveWalletAndGoHome() {
    // 存入地址列表中
    const addressListStr = await retrieveByKey(ALL_ADDRESS);
    let list = [];
    if (addressListStr === undefined) {
      list.push(address);
    } else {
      const oldList = JSON.parse(addressListStr);
      if(oldList.includes(address)) {
        alert('address have exist')
        return;
      }
      list.push(...oldList);
      list.push(address);
    }
    storeData(ALL_ADDRESS, list);

    // clearAllData();
    // 存为当前选中地址
    storeData(CURRENT_ADDRESS, address);
    global.currentAddress = address;
    // 保存钱包信息，key 为钱包地址
    const walletInfo = {
      privatekey: privatekey,
      mnemonic: mnemonic
    }
    storeData(address, walletInfo);
    goHome();
  }

  function goHome() {
    if(firstAdd) {
      navigation.replace(SCREEN_INFO.HOME, { params: { needLoad: true } });
    } else {
    // 带参数回到首页才会刷新
      navigation.navigate(SCREEN_INFO.HOME, { params: { needLoad: true } });
    }
  }

  return (
    <ScrollView style={CommonStyles.container}>
      <View>
        {pageType === PAGE_TYPE.CREATE ? <Button title="创建" disabled={isCreating} onPress={() => {
          createWallet()
        }} /> :
          <View>
            <TextInput style={CommonStyles.inputText} multiline placeholder='input mnemonic or privatekey' value={input} onChangeText={text => setInput(text)}/>
            <Button title="导入" disabled={isCreating} onPress={() => {
              importWallet()
            }} />
          </View>}

        {isCreating ? (<View style={{ flex: 1 }}>
          <Text>{pageType === PAGE_TYPE.CREATE ? 'creating' : 'importing'}</Text>
          <ActivityIndicator />
        </View>) : ''}
        {address !== "" && <View style={{ marginTop: 20 }}>
          <Text>{address}</Text>
          <Text onPress={() => { setHide(!isHide) }}
            style={{ width: 100, height: 40, backgroundColor: '#409FFF', color: '#fff', textAlign: 'center', lineHeight: 40 }}>
            {isHide ? 'show' : 'hide'}</Text>
          {privatekey && <Text>{isHide ? '****....****' : privatekey}</Text>}
          {mnemonic && <Text>{isHide ? '*****...*****' : mnemonic}</Text>}
          <Text style={{ color: '#f00' }}>请保存好私钥和助记词！</Text>
          <Text style={{ color: '#f00' }}>未点击‘开始体验’，钱包才会被保存</Text>
          <Button title="开始体验" onPress={() => {
            saveWalletAndGoHome()
          }} />
        </View>}

      </View>

    </ScrollView>
  );
}

export default CreateWalletScreen;
export {
  PAGE_TYPE,
}