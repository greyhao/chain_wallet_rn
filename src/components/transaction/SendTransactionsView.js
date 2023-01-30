import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Button, ActivityIndicator, FlatList } from "react-native";
import CommonStyles from '../../common/CommonStyle';
import EmptyDataView from "../EmptyDataView";
import { alchemy } from "../../utils/AlchemyUtil";
import { TransferInfo, requestCommonParams } from "../../screen/TranscationsScreen";

const SendTransactionsView = ({ route, navigation }) => {

  const { address } = route.params;

  const [refreshing, setRefreshing] = useState(true);
  const [nomore, setNomore] = useState(false);
  const [list, setList] = useState([]);

  /**
   * doc：https://docs.alchemy.com/reference/transfers-api-quickstart#pagination
   * 同 maxCount 一块使用；
   * 在请求结果中返回；
   * 10 分钟有效期；
   */
  const pageKey = useRef('0');

  useEffect(() => {
    loadData(true);
  }, []);

  async function loadData(isRefresh = false) {
    if (isRefresh) {
      setRefreshing(true);
      pageKey.current = '0';
      setNomore(false)
    } else {
      if (nomore) {
        return
      }
    }
    try {
      const params = JSON.parse(JSON.stringify(requestCommonParams));
      params.fromAddress = address;
      if (pageKey.current !== '0' && !isRefresh) {
        params.pageKey = pageKey.current;
      }
      const data = await alchemy.core.getAssetTransfers(params);

      for (const item of data.transfers) {
        TransferInfo(item);
      }

      // todo 添加延时异步请求的数据才正常显示
      setTimeout(() => {
        if (isRefresh) {
          setList(data.transfers);
        } else {
          setList(list.concat(data.transfers));
        }

        if (data.pageKey !== undefined) {
          pageKey.current = data.pageKey;
        } else {
          // pageKey 不存在：无更多数据
          setNomore(true);
          pageKey.current = 0;
        }
      }, 1500);
    } catch (e) {
      alert('loadData e \n' + e);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  }

  const RenderItem = ({ item }) => (
    <View style={{ marginVertical: 15 }} >

      <Text>{item.category}</Text>

      <Text>{item.metadata.blockTimestamp}</Text>
      <Text>to: {item.to}</Text>

      {(item.category === 'external' || item.category === 'internal') &&
        <View style={CommonStyles.layoutRowFixToText}>
          <Text>-{item.value}</Text>
          <Text>{item.asset}</Text>
        </View>
      }

      {/* erc20 */}
      {item.category === 'erc20' &&
        <View style={CommonStyles.layoutRowFixToText}>
          {item.contractMeta?.logo && <Image source={{ uri: item.contractMeta.logo, width: 24, height: 24 }} />}
          <Text>-{item.value}</Text>
          <Text>{item.asset}</Text>
        </View>
      }

      {/* erc721 */}
      {item.category === 'erc721' &&
        <View style={CommonStyles.layoutRowFixToText}>
          <Image source={{ uri: item.nftMeta.media[0].thumbnail, height: 20, width: 20 }} />
          <Text>-1</Text>
          <Text>{item.nftMeta.title}</Text>
        </View>
      }

      {/* erc1155 */}
      {item.category === 'erc1155' &&
        <View>
          {
            item.erc1155Metadata.map((info, index) => {
              return (
                <View style={CommonStyles.layoutRowFixToText} key={info.nftMeta.title}>
                  <Image source={{ uri: info.nftMeta.media[0].thumbnail, height: 20, width: 20 }} />
                  <Text>-{info.showValue}</Text>
                  <Text>{info.nftMeta.title}</Text>
                </View>
              );
            })
          }
        </View>
      }

      <Text onPress={() => {
        alert(item.hash);
      }}>hash: {item.hash}</Text>
      <View style={{ height: 5, backgroundColor: '#f00' }}></View>
    </View>
  );

  return (
    <View style={CommonStyles.container}>
      <Button title="load" onPress={() => loadData(true)} />
      {refreshing ? <ActivityIndicator /> :
        <View style={CommonStyles.flatListContainer}>
          {list.length > 0 ? (<FlatList
            renderItem={RenderItem}
            data={list}
            refreshing={refreshing}
            keyExtractor={(item) => item.uniqueId}
            onRefresh={() => {
              loadData(true)
            }}
            onEndReached={() => {
              loadData()
            }}
            ListFooterComponent={
              nomore && <Text style={{ padding: 6 }}>NoMore</Text>
            }
            ListFooterComponentStyle={{
              backgroundColor: '#ccc',
              alignItems: 'center',
            }}
          />) : (<EmptyDataView />)}
        </View>
      }
    </View>
  );
}

export default SendTransactionsView;