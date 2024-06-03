import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LocalStorageKeys } from '../types/localStorageKeys';
import { useToast } from 'native-base';

const TellAboutYourselfButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('TellAboutYourselfScreen');
  };

  return <Button title="Tell About Yourself" onPress={handlePress} />;
};

const TellAboutYourselfScreen = () => {
  const [text, setText] = useState('');
  const toast = useToast();


  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(LocalStorageKeys.ABOUT_YOURSELF, text);
    } catch (error) {
      console.error(error);

      toast.show({
        title: "Error",
        description: "There was an error saving your data.",
        duration: 5000
      });
    }
  };

  return (
    <View>
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={setText}
        value={text}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export { TellAboutYourselfButton, TellAboutYourselfScreen };
