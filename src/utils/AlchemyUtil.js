import 'react-native-get-random-values';
import '@ethersproject/shims';
import { Alchemy, Network } from "alchemy-sdk";

// TODO https://dashboard.alchemy.com/  注册自己的账号并申请 app 以获取 apiKey
const config_mainnet = {
  apiKey: 'xxxx',
  network: Network.ETH_MAINNET,
};

const config_goerli = {
  // 不保证永久有效，请自行注册
  apiKey: 'YGtFVENsPYcaHOB929iLDp6jTzSqgBW-',
  network: Network.ETH_GOERLI,
};

// 配置信息
const config = config_goerli;

const alchemy = new Alchemy(config);

export { alchemy };