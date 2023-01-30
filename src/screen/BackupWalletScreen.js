import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { retrieveByKey } from "../utils/StorageUtil";
import CommonStyles from "../common/CommonStyle";

const BackupWallet = () => {

  const [mnemonic, setMnemonic] = useState('')
  const [privatekey, setprivatekey] = useState('')

  useEffect(() => {
    loadDetail(global.currentAddress);
  });

  // load address detail info
  async function loadDetail(address) {
    const infoStr = await retrieveByKey(address);
    if (infoStr !== undefined) {
      const obj = JSON.parse(infoStr)
      setMnemonic(obj.mnemonic);
      setprivatekey(obj.privatekey);
    }
  }

  function showInfo(str) {
    alert(str)
  }

  return (
    <View style={CommonStyles.container}>
      {privatekey && <Button title="备份私钥" onPress={() => {
        showInfo(privatekey)
      }} />}
      {mnemonic && <Button title="备份助记词" onPress={() => {
        showInfo(mnemonic)
      }} />}
      <Button title="删除" />
    </View>
  );
}

export default BackupWallet;