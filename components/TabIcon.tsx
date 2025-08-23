import { StyleSheet, Text, View, ViewProps, ImageSourcePropType, ImageBackground,Image } from 'react-native'
import React from 'react'
import { images } from '@/constants/images';

type Props = ViewProps & {
    focused: boolean;
    title: string;
    icon: ImageSourcePropType;
}

const TabIcon = ({ focused, title, icon, ...props }: Props) => {

    if (focused) {
        return (
            <>
            <ImageBackground className='flew flex-row 
            flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center
            rounded-full overflow-hidden'
            source={images.highlight}>
                <Image source={icon}    
                tintColor="#151312"  
                className='size-5'
                />
                <Text className='text-secondary text-base 
                font-semibold ml-2'>{title}</Text>
            </ImageBackground>
            </>
        )
    }
    else{
        return (
            <View className='flew flex-row 
            flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center
            rounded-full overflow-hidden'>
                <Image source={icon}    
                tintColor="#A8B5DB"  
                className='size-5'
                />
                {/* <Text className='text-secondary text-base 
                font-semibold ml-2'>{title}</Text> */}
            </View>
        )
    }
  
}

export default TabIcon

const styles = StyleSheet.create({})