/**
 * 2022.12.29 rss3 的接口只提供了转出数据
 */
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, ActivityIndicator, Text, Button } from "react-native";
import TranscationItem from "../components/TranscationItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
  }
});

const RSS3TranscationPage = (props) => {

  const currentAddress = global.currentAddress;

  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [nomore, setNomore] = useState(false);

  const host = 'https://api.rss3.io/v1/';
  // 网络
  const network = 'ethereum'
  const limit = 20;
  // 记录类型
  const tag = 'transaction';

  // 结果中返回
  const [cursor, setCursor] = useState('');

  async function loadData(isRefresh = false) {
    if (isRefresh) {
      setRefreshing(true);
      setCursor('');
      setNomore(false)
    } else {
      if (nomore) {
        return
      }
    }
    const url = `${host}notes/${currentAddress}?refresh=true&cursor=${cursor}&limit=${limit}&tag=${tag}&network=${network}&query_status=false`;
    // count_only=true 可以查询记录条数，只返回 total

    const options = {
      method: 'GET',
      Headers: {
        accept: 'application/json',
      }
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setCursor(json.cursor || "");
      const total = json.total;
      if (isRefresh) {
        setList(json.result);
      } else {
        setList(list.concat(json.result));
      }
      // total < limit 无更多数据
      setNomore(total < limit)
    } catch (error) {
      alert(error)
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  }

  useEffect(() => {
    loadData(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 回退到上一个页面 */}
      {/* <Button title="Go Back" onPress={() => props.navigation.goBack()} /> */}
      {/* 回到 Home 页 */}
      {/* <Button title="Go Home" onPress={() => props.navigation.navigate('Home')} /> */}
      {/* popToTop 回到栈中的第一个页面 */}
      {/* <Button title="Go back to frist screen in stack" onPress={() => props.navigation.popToTop()} /> */}
      {/* 继续打开列表页， push 会直接打开，navigate 如果已经显示就不会再次打开 */}
      {/* <Button title="Go List" onPress={() => props.navigation.push('TranscationList')} /> */}
      <Text>{currentAddress}</Text>
      <Text>list.size = {list?.length}</Text>
      {refreshing ? <ActivityIndicator /> : (
        <View>
          <FlatList
            data={list}
            renderItem={({ item }) => <TranscationItem time={item.timestamp} from={item.actions[0].address_from}
              to={item.actions[0].address_to} image={item.actions[0].metadata.image}
              value={item.actions[0].metadata.value_display}></TranscationItem>}
            keyExtractor={item => item.hash}
            refreshing={refreshing}
            onRefresh={() => {
              loadData(true)
            }}
            onEndReached={(info) => {
              loadData()
            }}
            ListFooterComponent={
              nomore && <Text style={{ padding: 6 }}>NoMore</Text>
            }
            ListFooterComponentStyle={{
              backgroundColor: '#ccc',
              alignItems: 'center',
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default RSS3TranscationPage;