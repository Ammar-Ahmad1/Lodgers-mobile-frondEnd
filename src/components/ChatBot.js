import { Text, View, StyleSheet,Modal } from 'react-native'
import React, { Component } from 'react'
import ChatBoT from 'react-native-chatbot'

const steps = [
    {
        id: '1',
        message: 'Hello World',
        trigger: '2',
    },
    {
        id: '2',
        message: 'Bye World',
        end: true,
    },
]

// export class ChatBot extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
//         <ChatBoT steps={steps} />

//       </View>
//     )
//   }
// }
const ChatBot = () => {
    return (
        <View style={styles.container}>
            <ChatBoT steps={steps} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 25
    }

})

export default ChatBot