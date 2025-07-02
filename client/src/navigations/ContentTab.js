//바텀 탭 내비게이터 사용 (네이티브 스택 내비게이터와 비슷 - AuthStack.js)
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import RecordScreen from "../screens/Timer/RecordScreen";
//import MissionScreen from "../screens/MissionScreen";
import MypageScreen from "../screens/Mypage/MypageScreen";
import { ContentRoutes } from "./routes"
import { MissionRoutes } from "./routes"; //MissionScreen대신 수정
import { PRIMARY, BLACK, WHITE } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MissionStack from "./MissionStack";
import FeedStack from "./FeedStack";


const Tab = createBottomTabNavigator();

/*
1. 바텀 탭 내비게이터에서는 contentStyle 적용 안됨
2. 시작 페이지를 따로 지정해주지 않으면 컴포넌트 순서대로 항상 첫번째 화면이 시작됨 -> initialRouteName
3. tabBarActiveTintColor/tabBarInactiveTintColor : 탭바 비활성화/활성화 상태의 컬러 변경

*/

const getTabBarIcon = ({focused, color, size, names}) => {

    const iconName = focused ? names : `${names}-outline`;
    return(
        <MaterialCommunityIcons name={iconName} size='24' color={color} style={{marginRight : 1}}/>
    );


}

const ContentTab = () => {
    return(
        <Tab.Navigator
            initialRouteName={ContentRoutes.HOME}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor : BLACK,
                tabBarInactiveTintColor : BLACK,
                //tabBarShowLabel : false,
                tabBarStyle:{
                    height : 100,
                    paddingTop : 15,
                },
                
            }}>
            <Tab.Screen 
                name={ContentRoutes.HOME} 
                component={HomeScreen}
                options={{
                    tabBarIcon: (props) => getTabBarIcon({...props, names:'home'}),
                    tabBarLabel : 'HOME',
                }}/>
            <Tab.Screen 
                name={ContentRoutes.FEED_HOME} 
                component={FeedStack}
                options={{
                    tabBarIcon: (props) => getTabBarIcon({...props, names:'text-box'}),
                    tabBarLabel : 'FEED',
                }}
                />
            <Tab.Screen 
                name={ContentRoutes.RECORD} 
                component={RecordScreen}
                options={{
                    tabBarIcon: (props) => getTabBarIcon({...props, names:'clock-time-nine'}),
                    tabBarLabel : 'TIMER',
                }}/>
            <Tab.Screen 
                name={ContentRoutes.MISSION_HOME} 
                component={MissionStack}
                options={{
                    tabBarIcon: (props) => getTabBarIcon({...props, names:'lightning-bolt'}),
                    tabBarLabel : 'MISSION',
                }}
                />
            <Tab.Screen 
                name={ContentRoutes.MYPAGE} 
                component={MypageScreen}
                options={{
                    tabBarIcon: (props) => getTabBarIcon({...props, names:'account'}),
                    tabBarLabel : 'MY',
                }}/>
        </Tab.Navigator>
    );
};

export default ContentTab;