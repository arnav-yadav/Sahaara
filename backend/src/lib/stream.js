import {StreamChat} from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key or secret is not defined in environment variables");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// Function to upsert a user in Stream
export const upsertStreamUser = async (userData) => {
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }
    catch(error){
        console.error("Error upserting Stream user:", error);
    }
}

// Function to generate a Stream token for a user
export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token:", error);
    }
}