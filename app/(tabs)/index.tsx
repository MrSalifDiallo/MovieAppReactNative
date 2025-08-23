import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function Index() {
  return (
    <View className="flex-1 justify-center items-center" >
      <Text className="text-5xl text-primary font-bold">Welcome to your Movie App!</Text>
      {/* <Link className="text-5xl text-blue-300 font-bold" href="/onBoarding">OnBoarding</Link> */}
      {/* <Link className="text-5xl text-green-400 font-bold" href="/movies/avengers">Avengers Movies</Link> */}
      {/* <Link className="text-5xl text-green-400 font-bold" href={{ pathname: "/movies/[id]", params: { id: "avengers" } }}>Avengers Movies</Link> */}
    </View>
  );
}
