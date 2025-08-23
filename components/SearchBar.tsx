import { StyleSheet, Text, View,Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'

interface Props{
    placeholder:string,
    onPress?:()=>void,
}

const SearchBar = ({placeholder,onPress}:Props) => {  
  const capitalizeText = (text: string) => {
    return text.replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <View className='flex-row items-center bg-dark-200 
    rounded-full px-5 py-4' >
        <Image
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor='#ab8bff'
        />
      <TextInput
      onPress={()=>{

      }}
      placeholder={capitalizeText(placeholder)}
      value=""
      onChangeText={onPress}
      placeholderTextColor="#ab8bff"
      className='flex-1 ml-2 text-white'

      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})