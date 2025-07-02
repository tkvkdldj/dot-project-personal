import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WHITE } from "../colors";
import { MainRoutes } from "./routes";
import ContentTab from "./ContentTab";
import TimerScreen from "../screens/Timer/TimerScreen";
import MissionStack from "./MissionStack";
import FeedStack from "./FeedStack";

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: {backgroundColor: WHITE},
                headerShown: false,
            }}
        >
            <Stack.Screen name={MainRoutes.CONTENT_TAB} component={ContentTab}/>
            <Stack.Screen name={MainRoutes.TIMER} component={TimerScreen}/>
            <Stack.Screen name={MainRoutes.MISSION_STACK} component={MissionStack}/>
            <Stack.Screen name={MainRoutes.FEED_STACK} component={FeedStack}/>
        </Stack.Navigator>
    );
};

export default MainStack;