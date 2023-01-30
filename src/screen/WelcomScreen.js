import React, { useEffect, useRef, useState } from "react";
import { View, Text, Alert, TextInput, Button } from "react-native";
import { SCREEN_INFO } from "../../App";
import { retrieveByKey, storeData } from "../utils/StorageUtil";
import { CURRENT_ADDRESS, UNLOCK_PASSWORD } from "../utils/Const";
import { PAGE_TYPE } from "./CreateWalletScreen";
import { validInput } from "../utils/InputUtil";
import CommonStyles from "../common/CommonStyle";

const WelcomeScreen = ({ navigation }) => {

  const address = useRef('');

  const [needAdd, setNeedAdd] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [pwd, setPwd] = useState('111');

  useEffect(() => {
    loadCurrentChain();
    // load current wallet 
    loadCurrentAddress();
  });

  function showAddWalletDialog() {
    Alert.alert('提示', '请选择添加钱包的方式', [
      {
        text: '创建',
        onPress: () => {
          navigation.replace(SCREEN_INFO.CREATE_WALLET, { title: PAGE_TYPE.CREATE, firstAdd: true });
        }
      },
      {
        text: '导入',
        onPress: () => {
          navigation.replace(SCREEN_INFO.CREATE_WALLET, { title: PAGE_TYPE.IMPORT, firstAdd: true });
        }
      }
    ]);
  }

  function loadCurrentChain() {
    // set ETH default，add save logic when add other chains
    global.currentChain = 'ETH';
  }

  async function loadCurrentAddress() {
    let temp = await retrieveByKey(CURRENT_ADDRESS)
    if (temp !== undefined) {
      temp = JSON.parse(temp);
      address.current = temp;
      global.currentAddress = address.current;
      setShowInput(true);
    } else {
      setNeedAdd(true);
    }
  }

  function savePwd() {
    if (validInput(pwd.trim())) {
      storeData(UNLOCK_PASSWORD, pwd.trim());
      showAddWalletDialog();
    } else {
      Dialog('请输入密码')
    }
  }

  async function checkAndGoHome() {
    if (validInput(pwd.trim())) {
      try {
        const temp = await retrieveByKey(UNLOCK_PASSWORD);
        if (JSON.parse(temp) === pwd.trim()) {
          navigation.replace(SCREEN_INFO.HOME);
        } else {
          Dialog('密码错误，请重试')
        }
      } catch (e) {
        alert('error ' + e);
      }
    } else {
      Dialog('请输入密码')
    }
  }

  const Dialog = (content, title, btnStr) => (
    Alert.alert(title || '提示', content, [
      {
        text: btnStr || '确定'
      }
    ])
  );

  const SetPwdView = () => (
    <View>
      <TextInput style={CommonStyles.inputText} onChangeText={(str) => setPwd(str)} value={pwd} placeholder="请输入密码" autoFocus />
      <Button title="确认" onPress={() => {
        savePwd();
      }} />
      <Text>请设置一个您认为安全的密码，首次创建/导入钱包前设置，之后每次重新打开app都需要输入！</Text>
    </View>
  );

  const VerifyPWdView = () => (
    <View>
      <Text>请输入唯一密码，首次创建/导入钱包前设置</Text>
      <TextInput style={CommonStyles.inputText} onChangeText={setPwd} value={pwd} placeholder="请输入" autoFocus />
      <Text style={CommonStyles.button} onPress={() => {
        checkAndGoHome();
      }} >确认</Text>
    </View>
  );

  return (
    <View style={CommonStyles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20}}>欢迎使用 👏</Text>

      {needAdd && <SetPwdView />}

      {showInput && <VerifyPWdView />}

    </View>
  );
}

export default WelcomeScreen;