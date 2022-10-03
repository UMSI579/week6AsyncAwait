import { useState } from 'react';
import { FlatList, StyleSheet, Text, Button,
        TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


function App1() {
  let [inputText, setInputText] = useState('');
  let [rhymes, setRhymes] = useState([
    {text: 'foo', key: 'foo'}, 
    {text: 'too', key: 'too'}]);

  const findRhymes = async () => {
    const baseURI = 'https://api.datamuse.com/words?rel_rhy=';
    const uri = baseURI + inputText;
    let response = await fetch(uri); // blocks til fetch() resolves
    let json = await response.json(); // blocks til response.json() resolves
    let newRhymes = [];
    for (let r of json) {
      let newR = {text: r.word, key: r.word};
      newRhymes.push(newR);
    }
    setRhymes(newRhymes);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Enter a word"
          style={styles.input}
          onChangeText={text=>setInputText(text)}
        />
        <TouchableOpacity
          onPress={findRhymes}
        >
          <MaterialIcons name='search' size={24}/>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <FlatList
          data={rhymes}
          renderItem={({item})=>{
            return (
              <Text>{item.text}</Text>
            )
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    paddingTop: '15%', 
    paddingHorizontal: '5%',
    marginHorizontal: '5%'
  },
  input: {
    flex: 0.6,
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  body: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: '3%',
    paddingLeft: '5%'
  }
});

export default App1;
//export default App2;

