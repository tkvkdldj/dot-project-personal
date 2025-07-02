import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WHITE } from "../colors";
import { MissionRoutes } from "./routes";
import MissionScreen from "../screens/Mission/MissionScreen"; //미션홈
import RandomWordScreen from "../screens/Mission/RandomWordScreen"; //랜덤어휘미션
import MissionCompleteScreen from "../screens/Mission/MissionCompleteScreen";

const Stack = createNativeStackNavigator();

const MissionStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: {backgroundColor: WHITE},
                headerShown: false,
            }}
        >
            <Stack.Screen name={MissionRoutes.MISSION} component={MissionScreen}/>
            <Stack.Screen name={MissionRoutes.RANDOM_WORD} component={RandomWordScreen}/>
            <Stack.Screen name={MissionRoutes.MISSION_COMP} component={MissionCompleteScreen}/>
        </Stack.Navigator>
    );
};

export default MissionStack;