import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAweSome from 'react-native-vector-icons/FontAwesome';

const Search = ({route, navigation}: {route: any; navigation: any}) =>
  // {name, email}: {name: any; email: any},
  {
    //const route = useRoute();
    const {name, email} = route.params;
    //  const navigation = useNavigation();
    const textInputRef = useRef<TextInput | null>(null);
    const [searchTest, setSearchTest] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [focused, setFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemImage, setSelectedItemImage] = useState('');
    useEffect(() => {
      getApiData('https://jsonplaceholder.typicode.com/photos');
    }, []);

    const getApiData = async (URL: any) => {
      try {
        const getRequest = new Request(URL, {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const response = await fetch(getRequest);
        const json = await response.json();
        setData(json);
        setFilteredData(data);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };
    const searchFilterFunction = (searchTest: any) => {
      // console.log(filteredData);
      setSearchTest(searchTest);
      if (searchTest) {
        const newData = data.filter((item: any) => {
          const itemData = `${item.id} ${item.title}`.toUpperCase();
          const textData = searchTest.toUpperCase();
          return itemData.includes(textData);
        });
        setFilteredData(newData);
        console.log(newData);
      } else {
        setFilteredData([]);
      }
    };

    const handleSelectedItem = (item: any) => {
      setSelectedItem(item);
      setSelectedItemImage(item.url);
      setSearchTest(item.title);
      setFilteredData([]);
    };
    const handleImage = () => {
      navigation.navigate('Create');
    };
    // const navigateToFormpage = () => {
    //   navigation.navigate('Form');
    // };
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          
          {/* <View>
            <Pressable
              style={{
                height: 60,
                width: '40%',
                marginTop: 20,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={navigateToFormpage}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Form Page</Text>
            </Pressable>
          </View> */}
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{color: '#6B0772', fontSize: 20}}>
              Search (Get Method)
            </Text>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Hi {name}
            </Text>
          </View>
          <View style={{marginTop: 1, marginBottom: 5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              {email}
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              justifyContent: 'center',
              position: 'absolute',
            }}>
            <View
              style={{
                height: 60,

                borderWidth: 2,
                borderBlockColor: '#6B0772',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: 120,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="search1" size={25} color={'#6B0772'} style={{}} />
              <TextInput
                style={{
                  height: 55,
                  width: '80%',
                  marginLeft: 10,
                  color: '#6B0772',
                  fontSize: 20,
                }}
                ref={textInputRef}
                placeholder="Search here"
                onFocus={() => {
                  setFocused(false);
                }}
                onBlur={() => {
                  setFocused(true);
                }}
                value={searchTest}
                onChangeText={searchFilterFunction}
              />
              {searchTest !== '' ? (
                <Pressable
                  onPress={() => {
                    textInputRef?.current?.clear();
                    setFilteredData([]);
                    setSearchTest('');
                    setSelectedItemImage('');
                  }}>
                  <Icon name="close" size={20} color={'#6B0772'} />
                </Pressable>
              ) : (
                <FontAweSome name="microphone" size={25} color="#6B0772" />
              )}
            </View>
            <View style={{marginTop: 8}}>
              <FlatList
                data={filteredData}
                keyExtractor={(item: any) => item.id.toString()}
                showsVerticalScrollIndicator={true}
                renderItem={({item}) => (
                  <Pressable onPress={() => handleSelectedItem(item)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#6B0772',
                        marginBottom: 10,
                        borderRadius: 10,
                        height: 45,
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
            {selectedItemImage !== '' && (
              <Pressable onPress={handleImage}>
                <View
                  style={{
                    marginTop: 50,

                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: selectedItemImage}}
                    style={{
                      height: 100,
                      width: '80%',
                      borderRadius: 20,

                      shadowOpacity: 1,
                    }}
                  />
                </View>
              </Pressable>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

export default Search;
