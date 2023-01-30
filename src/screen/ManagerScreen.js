import React from "react";
import { ScrollView, View, Button, StyleSheet } from "react-native";
import { SCREEN_INFO } from "../../App";
import { PAGE_TYPE } from './CreateWalletScreen';

const ManagerScreen = ({ navigation }) => {

  return (
    <ScrollView>

      <View style={styles.buttonContainer} >
        <Button onPress={() => {
          navigation.navigate(SCREEN_INFO.SELECTION_WALLET);
        }} title='切换钱包' />
      </View>

      <View style={styles.buttonContainer} >
        <Button onPress={() => {
          navigation.navigate(SCREEN_INFO.BACKUP);
        }} title='管理钱包' />
      </View>

      <View style={styles.divide} />

      <View style={styles.buttonContainer} >
        <Button onPress={() => {
          navigation.navigate(SCREEN_INFO.CREATE_WALLET, { title: PAGE_TYPE.CREATE });
        }} title='创建钱包' />
      </View>

      <View style={styles.buttonContainer} >
        <Button onPress={() => {
          navigation.navigate(SCREEN_INFO.CREATE_WALLET, { title: PAGE_TYPE.IMPORT });
        }} title="导入钱包" />
      </View>

      <View style={styles.buttonContainer} >
        <Button onPress={() => {
          navigation.navigate(SCREEN_INFO.RESET_PASSWORD);
        }} title="重设密码" />
      </View>

      <View style={styles.divide} />
      <View style={styles.buttonContainer} >
        <Button onPress={() => {
          navigation.navigate(SCREEN_INFO.SEARCH);
        }} title='搜索' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 6,
    marginHorizontal: 15,
    height: 40,
    width: 200,
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  divide: {
    height: 10,
    backgroundColor: '#ccc'
  }
});

export default ManagerScreen;