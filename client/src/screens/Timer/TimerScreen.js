//독서 타이머 화면
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { MainRoutes, ContentRoutes } from "../../navigations/routes";
import { WHITE, BLACK, PRIMARY, GRAY } from "../../colors";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import BackButton from "../../components/Common/BackButton";
import VectorIcon from "../../../assets/icons/Vector_black.svg";
import BellIcon from "../../../assets/icons/bell.svg";
import HR from "../../components/Common/HR";
import { useTimer } from "../../contexts/TimerContext";
import Button from "../../components/Common/Button";
import TextButton from "../../components/Common/TextButton";
import { useRoute } from '@react-navigation/native'; // 앞 화면에서 넘어온 데이터 params를 받기 위함
import { fontScale } from "../../fontScale";
import { Dimensions } from "react-native";

/* 모달라이즈로 임시 바텀시트 활용 변경 */
import { Modalize } from "react-native-modalize";
import { useRef, useState } from "react";
import ReadingTabContent from "../../components/Timer/ReadingTabContent";
import TodayRecordTabContent from "../../components/Timer/TodayRecordTabContent";
// 키보드가 화면 가리는 것 막기
import { ScrollView } from "react-native-gesture-handler";

import Toast from "react-native-toast-message";
import axios from "axios";

const TimerScreen = () => {
    const navigation = useNavigation();
    const { top, bottom } = useSafeAreaInsets();
    
    // 기기 화면 크기 가져오기
    const { height: SCREEN_HEIGHT } = Dimensions.get('window');
    const LIST_MARGIN = SCREEN_HEIGHT * 0.025;
    const TAB_MARGIN = SCREEN_HEIGHT * 0.02;
    const BUTTON_MARGIN = SCREEN_HEIGHT * 0.035;

    //도서 정보 데이터 받기
    const route = useRoute();
    const { title, author, publisher, page, image, user, idx } = route.params || {};

    //const {isRunning, formattedTime, start, pause, reset, seconds} = useTimer(); //TimerContext에서 사용
    //북id별 관리
    const { timers, start, pause, reset, formatTime } = useTimer(); 
    const bookId = idx.toString(); // 혹은 책 ID
    const timer = timers[bookId] || { seconds: 0, isRunning: false };

    //도서 모달 페이지수 상태관리
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    //도서 독서기록문 상태관리
    const [recordText, setRecordText] = useState('');

    //모달 ref
    const modalRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState('오늘의 독서'); // 초기 탭 설정

    // 모달 열기
    const openModal = () => {
        modalRef.current?.open();
    };  

    /*
    //독서 타이머 시작 및 종료
    const toggleTimer = () => {
        isRunning ? pause() : start();
    };
    */
    //포인트 토스트 메시지
    const showPointToast = (point) => {
        Toast.show({
            type: 'customPoint', //App.js
            text1: `${point} 포인트 받았어요`,
            position: 'top',
            visibilityTime: 2000,
            topOffset: 65,
        });
    };


    return(     
        <View style={[styles.container, {paddingTop : top}]}>
            
            <View style={styles.backHeader}>
            <BackButton 
            onPress={() => {
                reset(bookId);
                navigation.goBack();
            }}
            />
            <BellIcon/>
            </View>
          
           {/* 1. 타이틀 영역 */}
            <View style={styles.header}>
             <Text style={styles.date}>현재 독서 시간</Text>
            </View>

            {/* 2. 타이머 영역 */}
            <View style={styles.timerBox}>
                <Text style={styles.timerText}>{formatTime(timer.seconds)}</Text>
                <Pressable onPress={() => timer.isRunning ? pause(bookId) : start(bookId)}>
                <FontAwesome5 name={timer.isRunning ? 'pause' : 'play'} size={50} color="black" />
                </Pressable>
             </View>

            {/* 다른 화면 메뉴 이동 영역 */}
            <View>
            <HR styles={{
                container:{marginTop:20, marginVertical:LIST_MARGIN+2},
                line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 4}}}/>
            
                <View style={styles.infoBox}>
                <Text style={styles.menuText}>사전</Text>
                <VectorIcon/>
                </View>

            <HR styles={{
                container:{marginVertical:LIST_MARGIN+2},
                line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 2}}}/>
                
                <View style={styles.infoBox}>
                <Text style={styles.menuText}>메모</Text>
                 <VectorIcon/>
                </View>

            </View>
            
            {/* 책 기본 소개 영역 */}
            <View>
            <HR styles={{
                container:{marginVertical:LIST_MARGIN},
                line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 4}}}/>
    
                <View style={styles.infoBox}>
                 <Text style={styles.infoText} >제목</Text>
                 <Text style={styles.menuText} >{title}</Text>
                 </View>

            <HR styles={{
                container:{marginVertical:LIST_MARGIN},
                line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 2}}}/>
            
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>지은이</Text>
                <Text style={styles.menuText} >{author}</Text>
            </View>

            <HR styles={{
                container:{marginVertical:LIST_MARGIN},
                line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 2}}}/>
                 <View style={styles.infoBox}>
                 <Text style={styles.infoText}>출판사</Text>
                 <Text style={styles.menuText} >{publisher}</Text>
                 </View>

        </View>

        {/* 종료 버튼 */}
       <Button
        title="종료하기"
        onPress={()=>{
            //pause();
            pause(bookId);
            openModal();
        }}
        styles={{
            container : {
                position: 'absolute',
                bottom : 30,
                left : 20,
                right : 20,
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
                fontWeight:'500',
                fontSize : 17,
            },
        
        }}
        />

        {/* 모달 ui */}
       
        <Modalize
            ref={modalRef}
            overlayStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
            }}
            adjustToContentHeight // 내용 높이에 따 모달크기 자동 조절
            keyboardAvoidBehavior="padding"
            scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
            modalStyle={{ 
                paddingVertical: BUTTON_MARGIN,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            }}
            handleStyle={{ display : 'none' }}
            onClosed={() => setSelectedTab('오늘의 독서')} //모달을 나왔을 경우 selectedTab 초기화
            >

            {/* 탭 UI */}
            {/* 취소, 완료 버튼 영역 */}
            <View style={styles.modalButtonText}>
            <TextButton
                title="취소"
                onPress={()=>{
                    modalRef.current?.close();
                }}
                styles={{
                    button: { marginRight: 20 }, // 위치 조정
                    title: { color: BLACK, fontWeight :'500'},
                }}
            />

            <TextButton
                title="완료"
                onPress={async() => {
                    try{
                        //api 통신 코드 전에 이것부터 해야 제대로 작동을 하는구나
                        reset(bookId); //타이머 리셋
                        modalRef.current?.close();
                       
                        //북id별로
                        const timer = timers[bookId] || { seconds: 0 };

                        const result = await axios.post('http://localhost:3000/api/read-logs', {
                            r_u_idx: user,
                            r_m_idx: idx,
                            r_duration: timer.seconds,
                            r_pages: currentPage,
                            r_review: recordText,
                        });
                        
                        if(result.data.point > 0){
                            setTimeout(() => {
                                showPointToast(result.data.point);
                            }, 100); // 키보드 내려갈 시간 확보 -> 700은 해야함, 두번 터치로 바꿀거면 100이 나은듯
                        }//두 번 터치로 걍 바꿀까.. 아..

                        setTimeout(() => {
                            navigation.navigate(MainRoutes.CONTENT_TAB, {
                                screen: ContentRoutes.RECORD,
                            });
                        }, 100); //위에랑 같이

                    }catch(error){
                        console.error('저장 실패 : ', error);
                    }
                    
                }}
                
                styles={{
                    title: { color: BLACK, fontWeight :'500' },
                }}
            />

            </View>

            {/* 탭 컨텐츠영역 */}
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 10,
                marginBottom: TAB_MARGIN,
                paddingHorizontal : 30,
            }}
            >
            {['오늘의 독서', '오늘의 독서 기록'].map((tab) => {
                const isActive = selectedTab === tab;
                const underlineWidthMap = {
                '오늘의 독서': 90,
                '오늘의 독서 기록': 120,
                };

                return (
                <Pressable
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    style={{ marginRight: 20, alignItems: 'center', width: underlineWidthMap[tab] }}
                >
                    <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                        fontWeight: isActive ? 'bold' : 'normal',
                        fontSize: 16,
                        }}
                    >
                        {tab}
                    </Text>
                    {isActive && (
                        <View
                        style={{
                            height: 2,
                            width: underlineWidthMap[tab],
                            backgroundColor: 'black',
                            marginTop: 4,
                        }}
                        />
                    )}
                    </View>
                </Pressable>
                );
            })}
            </View>

            {/* 조건부 렌더링 */}
            <View style={{ paddingHorizontal: 20 }}>
            {selectedTab === '오늘의 독서' ? (  
                <ReadingTabContent
                title={title}
                author={author}
                page={page}
                image={image}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />       
            ) : (    
                <TodayRecordTabContent
                recordText={recordText}
                setRecordText={setRecordText}
                />
            )}
            </View>        
            
        </Modalize>   
       
        </View>
        
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : WHITE, //바텀 탭 내비게이터에서는 contentStyle옵션을 지원하지 않기에 화면마다 컬러 지정
        paddingHorizontal: 20,
        overflow: 'visible',
    },
    backHeader: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginLeft : -10,
    },
    header: {
        marginTop : 50,
        marginBottom : 10,
      },
      date: {
        fontSize: 20,
        fontWeight: '600',
        color: BLACK,
      },
      timerBox: {
       flexDirection: 'row',       // 아이템을 가로로 배치
        alignItems: 'center',       // 세로 정렬
        marginBottom: 25,
        justifyContent: 'space-between', // 텍스트는 왼쪽, 아이콘은 오른쪽
      },
      playIcon: {
        paddingRight : 10,
      },
      timerText: {
        fontSize: fontScale(67),
        fontWeight: 'light',
        color: 'black',
      },
      infoBox:{
        flexDirection: 'row',       // 아이템을 가로로 배치
        alignItems: 'center',       // 세로 정렬
        //marginBottom: 15,
        justifyContent: 'space-between', // 텍스트는 왼쪽, 아이콘은 오른쪽
      },
      menuText: {
        fontSize : fontScale(16),
        color: BLACK,
      },
      infoText: {
        fontSize : fontScale(16),
        color: GRAY.DARK,
      },

      modalButtonText : {
        flexDirection: 'row',       // 아이템을 가로로 배치
        alignItems: 'center',       // 세로 정렬
        justifyContent: 'space-between', // 텍스트는 왼쪽, 아이콘은 오른쪽
        paddingHorizontal : 30,
        
    },

});

export default TimerScreen;