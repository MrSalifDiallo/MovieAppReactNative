import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { baseURLImageMovie } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { icons } from '@/constants/icons'



const MovieDetails = () => {
    const router =useRouter();
    const {id}=useLocalSearchParams()
    const {data:movie,loading}=useFetch(()=>
      fetchMovieDetails(id as string)
    )
    const MovieInfos=({label,value}:MovieInfos)=>(
      <View className='py-1.5'>
          <Text className="text-light-200 font-normal text-sm">
            {label}
          </Text>
          <Text className="text-light-100 font-bold text-sm">
            {value || 'N/A'}
          </Text>
      </View>
    )
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View>
          <Image
          resizeMode="stretch"
          className='w-full h-[550px]'
          source={{uri:`${baseURLImageMovie}${movie?.poster_path}`}}
          />
          <View className='flex-col items-start justify-center mt-5 px-5 ' >
              <Text className="text-white font-bold text-xl">
                {movie?.title}
              </Text>
              <View className='flex-row items-center gap-x-1 mt-2' >
                  <Text className="text-light-200 text-sm">
                      {movie?.release_date?.split('-')[0]}
                  </Text>
                  <Text className="text-light-200 text-sm">
                      {movie?.runtime}mn
                  </Text>
              </View>

              <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md'>
                <Image
                source={icons.star}
                />
                <Text className="text-white font-bold text-sm">
                      {Math.round(movie?.vote_average??0)}/10
                </Text>
                <Text className="text-light-200 text-sm pl-1">
                      {(movie?.vote_count)} votes
                </Text>
                
              </View>

              <MovieInfos 
                label={'Overview'}
                value={movie?.overview}
                />
                <MovieInfos 
                label={'Genre'}
                value={movie?.genres.map(
                  g=>g.name).join(' - ') || 'N/A'
                }
                />

                <View className='flex flex-row justify-between w-1/2'>
                    <MovieInfos 
                    label={'Budget'}
                    value={movie?.budget ? `$${Math.ceil(movie.budget/(1000000)) } Millions` : 'N/A'}
                    />
                    <MovieInfos 
                    label={'Revenue'}
                    value={movie?.revenue ? `$${Math.ceil(movie.revenue/(1000000))} Millions` : 'N/A'}
                    />
                </View>
                <MovieInfos 
                label={'Production Companies'}
                value={movie?.production_companies.map(
                  c=>c.name).join(' - ') || 'N/A'
                }
                /> 
          </View>

        </View>
      </ScrollView>

      <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex
      flew-row items-center justify-center z-50' onPress={router.back}>
        <Image
        source={icons.arrow}
        className='size-5 mr-1 mt-0.5 rotate-180 '
        tintColor="#fff"
        />
        <Text className='text-white font-semibold text-base'>
                Go Back
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})