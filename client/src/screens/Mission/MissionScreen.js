//미션 글쓰기 화면
import { StyleSheet, Text, View } from "react-native";
import MissionButton from "../../components/Mission/MissionButton";
import { BLACK, WHITE, PRIMARY,GRAY } from "../../colors";
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 상하좌우 화면 침범 막기
import RankingList from "../../components/Mission/RankingList";
import HR from "../../components/Common/HR";
import DotLogo from "../../../assets/icons/dot..svg";
import BellIcon from "../../../assets/icons/bell.svg";
import RankingHeaderButton from "../../components/Mission/RankingHeaderButton";
import { useNavigation } from "@react-navigation/native";
import { MainRoutes } from "../../navigations/routes";
import { Dimensions } from "react-native";
import { fontScale } from "../../fontScale";
import { ScrollView } from "react-native-gesture-handler";

const MissionScreen = () => {
    const navigation = useNavigation();
    const { top, bottom } = useSafeAreaInsets(); // 상하단 여백 값을 리턴 받음
   
    const { height: SCREEN_HEIGHT } = Dimensions.get('window');
    const RANKING_MARGIN = SCREEN_HEIGHT * 0.02;
    const INTRO_MARGIN = SCREEN_HEIGHT * 0.025;

    return( 
        <View style={[styles.container, {paddingTop: top+10}]}>
            {/* 로고 및 알림*/}
            <View style={styles.LogoContainer}>
                <DotLogo width={55} height={18}/>
                <BellIcon width={40} height={24}/>
            </View>
            
             {/* 랭킹 */}
            <View style={styles.Rankingcontainer}>
               <View>
                <RankingHeaderButton onPress={()=>{console.log("랭킹 버튼 눌림")}}/>
            </View>

            <View style={styles.RankingList}>
            <RankingList rank={1} name="김독자" percentage={98} />
            <HR styles={{
                container:{marginVertical:5},
                line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 1}}}/>
            <RankingList rank={2} name="나독자" percentage={86} />
            <HR styles={{
                container:{marginVertical:5},
                line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 1}}}/>
            <RankingList rank={3} name="민독자" percentage={72} />
            
            </View>
            </View>

            {/* 글쓰기 버튼 */}
            <View style={styles.missionContaner}>
                <View style={[styles.introMentBox, {marginBottom : INTRO_MARGIN}]}>
                    <Text style={styles.introName}>구름속으로 님,</Text>
                    <Text style={styles.introMent}>글을 쓰러 가 볼까요?</Text>
                    
                </View>

                <View style={styles.missonButtons}>
                    <MissionButton
                    title={'릴레이 글쓰기'}
                    detail={'다른 사용자와 릴레이로 작성해요'}
                    onPress={()=>{}}
                     styles={{ button: { width: '100%' } }}
                   
                    />
                     <MissionButton
                    title={'100일 글쓰기'}
                    detail={'100일간 이어지는 습관 형성과 함께 글쓰기 실력도 향상해요'}
                    onPress={()=>{}}
                    styles={{button : {width:'48%'}}}
                    />
                     <MissionButton
                    title={'타임어택 글쓰기'}
                    detail={'게으름을 낳는 완벽주는 이제 그만! 일단 쓰고 퇴고해요'}
                    onPress={()=>{}}
                    styles={{button : {width:'48%'}}}
                    
                    />
                     <MissionButton
                    title={'고전 문장 글쓰기'}
                    detail={'첫 문장 공포증을 타파하기 위해 준비했어요'}
                    onPress={()=>{}}
                    styles={{button : {width:'48%'}}}
                    />
                     <MissionButton
                    title={'랜덤 어휘 글쓰기'}
                    detail={'마땅한 글감이 없는 당신을 위해 준비했어요'}
                    onPress={()=>navigation.navigate(
                        MainRoutes.MISSION_STACK, { screen : 'RandomWord',}
                    )}
                    styles={{button : {width:'48%'}}}
                    
                    />
                </View>
            </View>

        </View>
        
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'stretch',
        //paddingHorizontal : 20,
        //marginHorizontal : 20,
        backgroundColor : GRAY.BRIGHT,
    },
    LogoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal : 20,
    },
    Rankingcontainer : {
        flex : 0.7,
        //justifyContent : 'center',
        //alignItems : 'center',
        //marginBottom : 40,
        marginTop : 10,
        paddingLeft : 15,
        paddingRight : 15,
    },
    RankingList : {
        justifyContent : 'center',
        alignContent : 'stretch',
    },  

    introMentBox : {
        marginLeft : 15, 
        marginTop : 25,
        //marginBottom: 25,
    },
    introName: {
        color: BLACK,
        fontSize: fontScale(20),
        fontWeight: '600',
        marginBottom : 5
    },
    introMent : {
        color : BLACK,
        fontSize : fontScale(20),
        fontWeight : '600',
    },
    missionContaner : {
        flex : 1,
        //justifyContent : 'center',
        //alignItems : 'flex-start'
        backgroundColor : WHITE,
    },

    missonButtons : {
        flexDirection: 'row',
        flexWrap: 'wrap', // 줄바꿈 허용
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    }

});

export default MissionScreen;