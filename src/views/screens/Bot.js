import { View, Text,useColorScheme,SafeAreaView,StatusBar,Button,StyleSheet,ScrollView, NativeModules } from 'react-native'
import React from 'react'
// import {  } from 'react-native-appearance';
const Kommunicate = require('react-native-kommunicate-chat');

const Bot = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };
  const RNKommunicateChat = NativeModules.RNKommunicateChat;
  if(RNKommunicateChat)
  {
    console.log("RNKommunicateChat initialized");
  }else{
    console.log("RNKommunicateChat not initialized");
  }
  startConversation = () => {
    let conversationObject = {
      'appId' : '193e93982bedb8a269b29c8bc21555b07', // The [APP_ID](https://dashboard.kommunicate.io/settings/install) obtained from kommunicate dashboard.
      'botIds' : ['lodgers-bot-wj3pf  '], // The botIds of the bots you want to assign to the conversation.
    }

    console.log(Kommunicate)
  }
  return (
    <SafeAreaView style={styles.con}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      {/* <Header /> */}
      <View
        style={{
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Here you can talk with our customer support.</Text>
        <View style={styles.container}>
          <Button
            title="Start conversation"
            onPress={() => startConversation()}
          />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    con: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        },
    });

export default Bot