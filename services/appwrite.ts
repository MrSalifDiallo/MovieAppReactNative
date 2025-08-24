//Installation Command: npx expo install react-native-appwrite react-native-url-polyfill
import { baseURLImageMovie } from "@/constants/images";
import {Client, Databases, ID, Query} from "react-native-appwrite"

// track the searches made by user 

// ! to say TypeScript that we know the value will be bear
//Here is the information in AppWrite Configuration
const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const APPWRITE_ENDPOINT=process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID=process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const attribute="searchTerm"
const client=new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID)

const database=new Databases(client)
export const updateSearchCount = async (query:string,movie:Movie )=>{
    //Check if a record of that search has already been stored 
    try {
        const trimmedQuery = query.trim();
        const result=await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal(attribute,trimmedQuery)
        ])

        // if a document is found increment the searchCount field
        if (result.documents.length>0) {
            const existingMovie=result.documents[0]
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count:existingMovie.count+1
                }

            )
        }
        else{
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),{
                searchTerm:trimmedQuery,
                movie_id:movie.id,
                count:1,
                title:movie.title,
                poster_url:`${baseURLImageMovie}${movie.poster_path}`
                }
            )
        }
    } 
    catch (error) {
        console.log(error);
        throw new Error("Error");
    }

    //if no document is found c
        // create a new document in Appwrite Database
}