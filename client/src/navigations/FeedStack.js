//피드 관련 스택 부분
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedRoutes } from "./routes";
import { WHITE } from "../colors";
import FeedScreen from "../screens/Feed/FeedScreen";
import FeedDetailScreen from "../screens/Feed/FeedDetailScreen";


const Stack = createNativeStackNavigator();

const FeedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: {backgroundColor: WHITE},
                headerShown: false,
            }}
        >
            <Stack.Screen name={FeedRoutes.FEED} component={FeedScreen}/>
            <Stack.Screen name={FeedRoutes.FEED_DETAIL} component={FeedDetailScreen}/>
        </Stack.Navigator>
    );
};

export default FeedStack;