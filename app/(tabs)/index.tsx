import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TredingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPopularMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { Text, View,Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
export default function Index() {
  const router =useRouter();

  const {
    data:trendingMovies,
    loading:trendingLoading,
    error:trendingError}=useFetch(getTrendingMovies)

  const {
    data:movies,
    loading:moviesLoading,
    error:moviesError}=useFetch(()=>fetchPopularMovies({
    query:''
  }))
  return (
    <View className="flex-1 bg-primary" >
      <Image source={images.bg} className="absolute w-full z-0"
      />
      <ScrollView className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight:"100%",
        paddingBottom:10
      }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        {moviesLoading || trendingLoading ?(
          <ActivityIndicator
            size={"large"}
            color={"#000fff"}
            className="mt-10 self-center"
          />
        ):
        moviesError || trendingError ?(
          <Text>
            Error:{moviesError?.message || trendingError?.message}
          </Text>
        ):(
           <View className="flex-1 mt-5 " >
            <SearchBar
            onPress={()=>router.push("/search")}
            placeholder="search for a movie"
            />
            {trendingMovies && (
              <>
               <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                  </Text>
                  <FlatList
                  horizontal
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={()=>
                  <View className="w-4" />
                }
                  data={trendingMovies}
                  renderItem={({item,index})=>(
                   <TredingCard movie={item} index={index}                   
                   />
                    //<Text className='text-white text-sm'>{item.title}</Text>
                  )}
                  keyExtractor={(item)=>item.movie_id.toString()}
                  /**
                   *This props are not supported when we have horizontal props 
                   
                  //numColumns={3}
                  /*columnWrapperStyle={{
                    justifyContent:'flex-start',
                    gap:20,
                    paddingRight:5,
                    marginBottom:10,
                  }}*/
                />
              </View>
              </>
             
            )}
            <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest Movies
                </Text>
                <FlatList
                  data={movies}
                  renderItem={({item})=>(
                    <MovieCard
                    {...item}
                    />
                    //<Text className='text-white text-sm'>{item.title}</Text>
                  )}
                  keyExtractor={(item)=>item.id}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent:'flex-start',
                    gap:20,
                    paddingRight:5,
                    marginBottom:10,
                  }}
                  scrollEnabled={false}
                />
            </>
        </View>
        )
      }

       
      </ScrollView>
      
      {/* <Link className="text-5xl text-blue-300 font-bold" href="/onBoarding">OnBoarding</Link> */}
      {/* <Link className="text-5xl text-green-400 font-bold" href="/movies/avengers">Avengers Movies</Link> */}
      {/* <Link className="text-5xl text-green-400 font-bold" href={{ pathname: "/movies/[id]", params: { id: "avengers" } }}>Avengers Movies</Link> */}
    </View>
  );
}
