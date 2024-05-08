import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'react-native-axios';
import {TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Create = ({navigation}: {navigation: any}) => {
  const useridInputRef = useRef<TextInput | null>(null);
  const titleInputRef = useRef<TextInput | null>(null);
  const bodyInputRef = useRef<TextInput | null>(null);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  });

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={'#6B0772'} />
      </View>
    );
  }
  const postData = async (url: any, data: any) => {
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePost = () => {
    const postDataObject = {
      userId: userId,
      title: title,
      body: body,
    };
    postData('https://jsonplaceholder.typicode.com/posts', postDataObject);

    setUserId('');
    setTitle('');
    setBody('');
    Alert.alert('Thanks');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <SafeAreaView
        style={{
          marginTop: 40,
          justifyContent: 'center',
          //alignItems: 'center',
          //alignContent: 'center',
        }}>
        <ScrollView>
          <View style={{marginTop: 40, alignItems: 'center'}}>
            <Text style={{color: '#6B0772', fontSize: 20}}>
              Axios(PostMethod)
            </Text>
          </View>
          <View
            style={{
              marginTop: 40,

              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginHorizontal: 20,
                  marginTop: 34,
                  fontSize: 20,
                  color: '#6B0772',
                }}>
                UserId
              </Text>
              <View
                style={{
                  height: 60,
                  width: '60%',
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: '#6B0772',

                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                }}>
                <TextInput
                  ref={useridInputRef}
                  keyboardType="number-pad"
                  //placeholder="UserId"
                  value={userId}
                  onChangeText={setUserId}
                  style={{flex: 1, fontSize: 20, marginBottom: -20}}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginHorizontal: 20,
                  marginTop: 34,
                  fontSize: 20,
                  color: '#6B0772',
                }}>
                Name
              </Text>
              <View
                style={{
                  height: 60,
                  width: '60%',
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: '#6B0772',
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                }}>
                <TextInput
                  ref={titleInputRef}
                  value={title}
                  onChangeText={setTitle}
                  style={{flex: 1, fontSize: 20, marginBottom: -20}}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginHorizontal: 20,
                  marginTop: 34,
                  fontSize: 20,
                  color: '#6B0772',
                }}>
                Gender
              </Text>
              <View
                style={{
                  height: 60,
                  width: '60%',
                  borderWidth: 1,
                  borderColor: '#6B0772',
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                }}>
                <TextInput
                  ref={bodyInputRef}
                  //                  placeholder="Body"
                  value={body}
                  onChangeText={setBody}
                  style={{flex: 1, fontSize: 20, marginBottom: -20}}
                />
              </View>
            </View>
            <Pressable
              onPress={handlePost}
              style={{
                height: 60,
                width: 150,
                marginTop: 70,
                backgroundColor: '#6B0772',
                borderColor: '#6B0772',
                borderWidth: 2,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Update
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Create;
