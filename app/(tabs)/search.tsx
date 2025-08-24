import { StyleSheet, Text, View,Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchPopularMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const Search = () => {

  const [searchQuery,setSearchQuery]=useState('')  
  const {
    data:movies,
    loading:moviesLoading,
    error:moviesError,
    refetch:loadMovies,
    reset}=useFetch(()=>fetchPopularMovies({
    query:searchQuery
  }),false)

  useEffect(()=>{
    const TimeoutId= setTimeout(async () => {
        if (searchQuery.trim()) {
          await loadMovies()
        }
        else{
          reset()
        }
    }, 500); 
    return()=>clearTimeout(TimeoutId)
  },[searchQuery])

  useEffect(()=>{
    if (searchQuery.trim() && movies && movies.length > 0 && !moviesLoading && !moviesError) {
      updateSearchCount(searchQuery, movies[0])
    }
  },[movies, moviesLoading, moviesError])

  /*useEffect(()=>{
    if (searchQuery.trim() && movies && movies.length > 2 && !moviesLoading && !moviesError) {
      updateSearchCount(searchQuery, movies[0])
    }
  },[movies, moviesLoading, moviesError])

  /*
  Invalid syntax
  useEffect(()=>{
    const TimeoutId= setTimeout(async () => {
        if (searchQuery.trim()) {
          await loadMovies()
        }
        else{
          reset()
        }
    }, 500); 
    return()=>clearTimeout(TimeoutId)
  },[searchQuery])*/

  return (
    <View className='flex-1 bg-primary'>
      <Image
      className='flex-1 absolute w-full z-0'
      source={images.bg}
      resizeMode="cover"
      />
      <FlatList
        data={movies}
        numColumns={3}
        renderItem={({item})=>
          <MovieCard
            {...item}
          />
        }
        keyExtractor={(item)=>item.id.toString()}
        className='px-5'
        columnWrapperStyle={{
          justifyContent:'flex-start',
          gap:16,
          marginVertical:16
        }}
        contentContainerStyle={{
          paddingBottom:100
        }}
        ListHeaderComponent={
          <>
          <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image
                className='w-12 h-10'
                source={icons.logo}
                resizeMode="cover"
              />
          </View>
          <View className='my-5'>
              <SearchBar
                value={searchQuery}
                placeholder="search movies..."
                onChangeText={(text:string)=>setSearchQuery(text)}
              />
              {
              moviesLoading && (
                <ActivityIndicator 
                size={'large'}
                color={'#000fff'}
                className='my-3'
                />
              )}

               {
               moviesError && (
                <Text className="text-red-500 font-bold px-5 my-3">
                  Error:{moviesError.message}
                </Text>
              )}

              {!moviesLoading && !moviesError && searchQuery.trim() &&
              movies?.length > 0 &&  (
                <Text className="text-xl text-white font-bold">
                  Search Results for {" "}
                  <Text style={{color: '#AB8BFF'}}>{searchQuery}</Text>
                </Text>
              )}
          </View>
          </>
        }
        ListEmptyComponent={
           !moviesLoading && !moviesError ?
            (<View className='mt-10 px-5 w-full items-center'>
                  <Text className="text-xl text-gray-500 font-bold text-center">
                    {searchQuery.trim() ? 'No Movies Found for ':"Search for a Movie"}
                    {searchQuery.trim() && searchQuery.length>=1 && <Text className="text-accent">{searchQuery}</Text>}
                  </Text>              
            </View> )
            :null   
        }
        
      />        
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})