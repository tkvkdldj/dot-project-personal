//미션 컴플릿 화면
import { StyleSheet, Text, View, TextInput } from "react-native";
import BackButton from "../../components/Common/BackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BellIcon from "../../../assets/icons/bell.svg";
import { PRIMARY, GRAY, BLACK, WHITE} from "../../colors";
import Button from '../../components/Common/Button'; 
import { useNavigation } from "@react-navigation/native";
import { ContentRoutes, MainRoutes } from "../../navigations/routes";
import missionFeedStore from '../../store/missionFeedStore';


const MissionCompleteScreen = () => {
    const navigation = useNavigation();
    const { top, bottom } = useSafeAreaInsets();

    const { setForceMission, setFromMissionType} = missionFeedStore();

    const goToFeed = () => {
        setForceMission(true);
        setFromMissionType('랜덤어휘');
        navigation.navigate(MainRoutes.CONTENT_TAB, {
            screen : ContentRoutes.FEED_HOME,
        });
        /*
        navigation.navigate(MainRoutes.CONTENT_TAB, {
        screen: ContentRoutes.FEED_HOME,
        params: { 
            forceMission: true,
            fromMissionType : '랜덤어휘',
        },
        
    });*/
    };

   return( 
        <View style={[styles.container, {paddingTop : top+5, paddingBottom: bottom}]}>
            {/* 상단 영역 */}
            <View>
            <View style={styles.backHeader}>
            <BackButton />
            <BellIcon style={{marginRight:5}}/>
            </View>

            {/* 코멘트 영역 */}
            <View style={styles.wordContainer}>
            <Text style={styles.wordStyle}>미션 달성 완료!</Text>
            <Text style={styles.wordStyle}>막상 써 보니 어렵지 않죠?</Text>
            </View>
            </View>

            
            {/* 버튼 영역 */}
            <View style={{width:'100%'}}>
                <Button
                    title={"랜덤 어휘 피드 보러가기"}
                    onPress={goToFeed}
                    styles={{
                        container : {
                            paddingHorizontal : 0,
                        },
                        button : {
                            borderRadius : 0,
                            height : 60,
                            justifyContent : 'center',
                            alignItems : 'center',
                            backgroundColor : BLACK},
                        title:{
                            color:WHITE,
                            fontWeight:'600',
                            fontSize : 17,
                        },
                            
                    }}
                />
                <Button
                    title={"홈으로"}
                    onPress={() => {
                        navigation.navigate(MainRoutes.CONTENT_TAB, {
                            screen: ContentRoutes.MISSION_HOME,
                        });
                        //console.log(navigation.getParent()?.getState()?.routeNames);

                    }}
                    styles={{
                        container : {
                            marginTop : 12,
                            paddingHorizontal : 0,
                        },
                        button : {
                            borderRadius : 0,
                            height : 60,
                            justifyContent : 'center',
                            alignItems : 'center',
                            backgroundColor : WHITE,
                            borderWidth : 1,
                            borderColor : GRAY.DARK,
                        },
                        title:{
                            color:GRAY.DARK,
                            fontWeight:'500',
                            fontSize : 17,
                        },
                            
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'space-between',
        //alignItems : 'center',
        paddingHorizontal : 15,
    },
    backHeader: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        //marginLeft : 5,
        paddingHorizontal : 5,
    },
    wordContainer : {
        marginLeft : 5,
        marginTop : 20,
    },  
    wordStyle : {
        marginTop : 7,
        fontSize : 22,
        fontWeight : '400',
    },
});

export default MissionCompleteScreen;