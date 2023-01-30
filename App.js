import React from 'react';
import { Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screen/HomeScreen';
import RSS3TranscationPage from './src/screen/RSS3TranscationsScreen';
import TranscationsScreen from './src/screen/TranscationsScreen';
import CreateWalletScreen from './src/screen/CreateWalletScreen';
import SearchScreen from './src/screen/SearchScreen';
import ManagerScreen from './src/screen/ManagerScreen';
import BackupWallet from './src/screen/BackupWalletScreen';
import SelectionWalletScreen from './src/screen/SelectionWalletScreen';
import ResetPasswordScreen from './src/screen/ResetPasswordScreen';
import WelcomeScreen from './src/screen/WelcomScreen';
import TransferScreen from './src/screen/TransferScreen';
import WalletQRCodeScreen from './src/screen/WalletQRCodeScreen';

// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */
// // const Section = ({children, title}): Node => {
// const Section = ({ children, title }) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const Stack = createNativeStackNavigator();

// 页面路由信息
const SCREEN_INFO = {
  WELCOM: 'Welcom', // 欢迎页
  HOME: 'Home', // 首页
  RSS3_TRANSCATIONS: 'RSS3_Transcations', // 交易记录
  TRANSCATIONS: 'Transcations', // 交易记录
  CREATE_WALLET: 'CreateWallet', // 创建/导入
  SEARCH: 'Search', // 搜索
  MANAGER: 'Manager', // 管理
  BACKUP: 'BackupWallet', // 备份
  SELECTION_WALLET: 'Selection', // 选择钱包
  RESET_PASSWORD: 'ResetPassword', // 重设密码
  TRANSFER_SCREEN: 'TransferScreen', // 转账
  TRANSATION_RESULT_SCREEN: 'TransationResult', // 转账结果
  WALLET_QRCODE: 'WalletQRCode', // 钱包二维码页



}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_INFO.WELCOM}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#409FFF'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}>
        <Stack.Screen name={SCREEN_INFO.WELCOM} component={WelcomeScreen} />
        <Stack.Screen name={SCREEN_INFO.HOME} component={HomeScreen}
          options={(navigation, route) => ({
            headerRight: () => (
              <Button
                title="Manage"
              />
            ),
          })} />
        <Stack.Screen name={SCREEN_INFO.RSS3_TRANSCATIONS} component={RSS3TranscationPage} />
        <Stack.Screen name={SCREEN_INFO.TRANSCATIONS} component={TranscationsScreen} />
        <Stack.Screen name={SCREEN_INFO.CREATE_WALLET} component={CreateWalletScreen} />
        <Stack.Screen name={SCREEN_INFO.SEARCH} component={SearchScreen} />
        <Stack.Screen name={SCREEN_INFO.MANAGER} component={ManagerScreen} />
        <Stack.Screen name={SCREEN_INFO.BACKUP} component={BackupWallet} />
        <Stack.Screen name={SCREEN_INFO.SELECTION_WALLET} component={SelectionWalletScreen} />
        <Stack.Screen name={SCREEN_INFO.RESET_PASSWORD} component={ResetPasswordScreen} />
        <Stack.Screen name={SCREEN_INFO.TRANSFER_SCREEN} component={TransferScreen} />
        <Stack.Screen name={SCREEN_INFO.WALLET_QRCODE} component={WalletQRCodeScreen} />

      </Stack.Navigator>
    </NavigationContainer>

    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>

    //     <TextInput placeholder='inpute eth address' value={inputAddress}
    //       style={{ borderColor: '#409eff', borderWidth: 1, borderRadius: 8, margin: 10, padding: 6 }}
    //       onChangeText={(inputStr) => { setAddress(inputStr) }} />

    //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
    //       <Button title='A'></Button>
    //       <Button title='B'></Button>
    //       <Button title='C'></Button>

    //       <Button onPress={() => {
    //         alert('press button')
    //       }} title='open transcation pages' color="#841584" />
    //     </View>


    //     {/* <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.js</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View> */}
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default App;
export {
  SCREEN_INFO
}