import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradiant from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

const Form = ({navigation}: {navigation: any}) => {
  const nameInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    handleRegister();
  }, [name, email]);

  const handleRegister = () => {
    if (disabled) {
      const formErrors: string[] = [];
      if (!name.trim()) {
        formErrors.push('Name is required');
      }
      if (!email.trim()) {
        formErrors.push('Email is required');
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        formErrors.push('Email is invalid.');
      }
      setErrors(formErrors);
    } else {
      setDisabled(false);
    }
  };

  const handleForm = () => {
    navigation.navigate('Search', {name, email});

    setName('');

    setEmail('');
    setErrors([]);
    setDisabled(true);
  };

  return (
    <LinearGradiant
      style={{
        flex: 1,
      }}
      colors={['white', '#6B0772']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <SafeAreaView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <View style={{marginBottom: 50}}>
            <Text style={{color: '#6B0772', fontSize: 20}}>
              Form Validation
            </Text>
          </View>

          <View
            style={{
              height: 60,
              width: '70%',
              borderColor: '#6B0772',
              borderWidth: 1,

              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              flexDirection: 'row',
              alignItems: 'flex-end',
              paddingVertical: 10,
            }}>
            <Icon
              name="user"
              size={20}
              style={{marginHorizontal: 10, marginTop: 6}}
            />

            <TextInput
              ref={nameInputRef}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={{flex: 1, fontSize: 20, marginBottom: -14}}
            />
          </View>
          {errors.includes('Name is required') && (
            <Text style={{color: 'red', fontSize: 15, marginRight: 155}}>
              Name is required
            </Text>
          )}

          <View
            style={{
              height: 60,
              width: '70%',
              borderColor: '#6B0772',
              borderWidth: 1,
              marginTop: 40,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              flexDirection: 'row',
              alignItems: 'flex-end',
              paddingVertical: 10,
            }}>
            <Icon
              name="mail"
              size={20}
              color={'#6B0772'}
              style={{marginHorizontal: 10, marginTop: 6}}
            />
            <TextInput
              ref={emailInputRef}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{flex: 1, fontSize: 20, marginBottom: -14}}
            />
          </View>
          {errors.includes('Email is required') && (
            <Text style={{color: 'red', fontSize: 15, marginRight: 155}}>
              Email is required
            </Text>
          )}
          {errors.includes('Email is invalid.') && (
            <Text style={{color: 'red', fontSize: 15, marginRight: 155}}>
              Email is invalid.
            </Text>
          )}
          {/* {errors.map((error, index) => (
        <Text key={index} style={{color: 'red', fontSize: 15}}>
          {error}
        </Text>
      ))} */}

          <View
            style={{
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                height: 60,
                width: 150,
                marginTop: 70,
                backgroundColor: errors.length > 0 ? 'gray' : '#6B0772',
                borderColor: '#6B0772',
                borderWidth: 2,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={errors.length > 0}
              onPress={handleForm}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: errors.length > 0 ? 'black' : 'white',
                }}>
                Register
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradiant>
  );
};

export default Form;
