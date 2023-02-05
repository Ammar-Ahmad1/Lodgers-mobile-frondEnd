import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function CupertinoSegmentWithThreeTabs(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textWrapper}>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          style={styles.segmentTextWrapper1}
        >
          <Text style={styles.text1}>{props.text1 || "Puppies"}</Text>
        </TouchableOpacity>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          style={styles.segmentTextWrapper2}
        >
          <Text style={styles.text2}>{props.text2 || "Kittens"}</Text>
        </TouchableOpacity>
        <TouchableOpacity /* Conditional navigation not supported at the moment */
          style={styles.segmentTextWrapper3}
        >
          <Text style={styles.text3}>{props.text3 || "Cubs"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  textWrapper: {
    height: 29,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row"
  },
  segmentTextWrapper1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  text1: {
    fontSize: 13,
    color: "#FFFFFF"
  },
  segmentTextWrapper2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  text2: {
    fontSize: 13,
    color: "#007AFF"
  },
  segmentTextWrapper3: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  text3: {
    fontSize: 13,
    color: "#007AFF"
  }
});

export default CupertinoSegmentWithThreeTabs;
