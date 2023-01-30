import EncryptedStorage from 'react-native-encrypted-storage';

async function storeData(key, info) {
  try {
    await EncryptedStorage.setItem(global.currentChain + '_' + key, JSON.stringify(info));
  } catch (e) {
    alert(e)
  }
}

// 返回 Promise 对象
function retrieveByKey(key) {
  return EncryptedStorage.getItem(global.currentChain + '_' + key);
}

async function removeByKey(key) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e) {
    alert(e)
  }
}

async function clearAllData() {
  try {
    await EncryptedStorage.clear();
  } catch (e) {
    alert(e)
  }
}

export {
  storeData,
  retrieveByKey,
  removeByKey,
  clearAllData
}