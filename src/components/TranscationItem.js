import React from "react";
import { View, Text, Image } from "react-native";

const TranscationItem = (props) => {
  return (
    <View style={{padding: 10}}>
      <View>
        {/* <Image source={{ uri:  }}></Image> */}
        <Text>{props.time}</Text>
      </View>
      <View>
        <Text>{props.from}</Text>
        <Text>send to</Text>
        <Text>{props.to}</Text>
      </View>
      <View>
        <Image
          source={{ uri: props.image }}
          style={{ width: 20, height: 20 }}
        />
        <Text>{props.value}</Text>
      </View>
    </View>
  );
}

export default TranscationItem;