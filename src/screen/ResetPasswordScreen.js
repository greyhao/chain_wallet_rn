import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { UNLOCK_PASSWORD } from '../utils/Const';
import { storeData, retrieveByKey } from '../utils/StorageUtil';
import { validInput } from '../utils/InputUtil';
import CommonStyles from "../common/CommonStyle";

const ResetPasswordScreen = () => {

  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  async function changePwd() {
    if (!validInput(oldPwd.trim())) {
      alert('请输入原密码')
      return;
    }
    if (!validInput(newPwd.trim())) {
      alert('请输入新密码')
      return;
    }
    if (!validInput(confirmPwd.trim())) {
      alert('请输入确认新密码')
      return;
    }
    try {
      const savePwd = JSON.parse(await retrieveByKey(UNLOCK_PASSWORD));
      if (oldPwd !== savePwd) {
        alert('原密码错误，请重试');
        return;
      }
      if (newPwd !== confirmPwd) {
        alert('两次密码不一致，请重试');
        return;
      }
      // 保存
      storeData(UNLOCK_PASSWORD, newPwd);
      alert('修改成功')
    } catch (e) {
      alert('错误！' + e)
    }
  }

  return (
    <View style={CommonStyles.container}>
      <TextInput style={CommonStyles.inputText} textContentType="password" placeholder="请输入原密码" onChangeText={(str) => { setOldPwd(str) }} />
      <TextInput style={CommonStyles.inputText} textContentType="password" placeholder="请输入新密码" onChangeText={(str) => { setNewPwd(str) }} />
      <TextInput style={CommonStyles.inputText} textContentType="password" placeholder="请确认新密码" onChangeText={(str) => { setConfirmPwd(str) }} />
      <Button title="确定" onPress={() => {
        changePwd();
      }} />

    </View>
  );
}

export default ResetPasswordScreen;