import React from "react";
import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    padding: 10,
    // backgroundColor: '#fcc'
  },
  layoutRowFixToText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    fontSize: 16,
    color: '#61dafb',
    borderRadius: 6,
    textAlign:'center',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowRadius: 10,
    marginVertical: 10,
    fontWeight: '500'
  },
  text: {
    title: {
      fontSize: 16
    },
    content: {
      fontSize: 14,
    }
  },
  inputText: {
    padding: 6,
    fontSize: 14,
    color: '#222',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 4,
  },
  flatListContainer: {
    paddingTop: 10,
    paddingBottom: 100,
  }
});
export default CommonStyles;