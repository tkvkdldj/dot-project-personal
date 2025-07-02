// RecordScreen.js
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useUserState } from '../../contexts/UserContext';  //현재 로그인된 사용자 정보 가져오기 위함
import axios from 'axios';
import { Image, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { WHITE, GRAY, PRIMARY, BLACK } from '../../colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HR from '../../components/Common/HR';
import SearchIcon from '../../../assets/icons/magnifyingglass.svg';
import DotLogo from "../../../assets/icons/dot..svg";
import BellIcon from "../../../assets/icons/bell.svg";
import { MainRoutes } from "../../navigations/routes";
import SafeInputView from '../../components/Common/SafeInputView';
import { fontScale } from '../../fontScale';
import { Dimensions } from 'react-native';

const plusBooks = [
  {id : 'add', type:'add'},
];

const RecordScreen = () => {

  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const TIMER_MARGIN = SCREEN_HEIGHT * 0.03;

    const navigation = useNavigation();
    const { top, bottom } = useSafeAreaInsets();

    const [user] = useUserState();
   
    const [bookData, setBookData] = useState([]);

    //누적시간 관리
    const [todayDuration, setTodayDuration] = useState(0);

    //현재 날짜, 요일
    const [todayDate, setTodayDate] = useState('');
    const [weekday, setWeekday] = useState('');

    
    useEffect(()=>{
      if (!user?.u_idx) return;
    
      //내 서재에 있는 도서 데이터 불러오기
      const fetchLibrary = async () => {
        try{
          const response = await axios.get('http://localhost:3000/api/library/user',{
            params : {u_idx: user.u_idx},
          });

          setBookData(response.data.books); // bookList 상태에 데이터 저장
          //console.log('도서 데이터 응답 : ', response.data);
        }catch(error){
          console.error('도서 불러오기 실패 : ', error);
        }
      };

      //독서 로그에 있는 시간 총합 불러오기
      const fetchTodayDuration = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/read-stats/duration?u_idx=${user.u_idx}`);
          setTodayDuration(response.data.totalDuration || 0);
          console.log('누적시간: ', response.data.totalDuration);


        } catch (error) {
          console.error('누적 시간 불러오기 실패:', error);
        }
      };

      //서버 기준 현재 날짜, 요일 불러오기
      const fetchTodayDate = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/read-stats/date`);
          setTodayDate(res.data.date);
          setWeekday(res.data.weekday);
        } catch (err) {
          console.error('서버 날짜 불러오기 실패:', err);
        }
      };

      fetchLibrary();
      fetchTodayDuration();
      fetchTodayDate();
      
    },[user]);
    
    //누적시간 포맷 변환 함수
    const formatTime = (seconds) => {
      const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      return `${hrs}:${mins}:${secs}`;
    };

    const renderBookItem = ({item}) => {
          if (item.type === 'add') {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => console.log('도서 추가 화면으로 이동')}
                style={styles.bookBox}
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              //onPress={() => navigation.navigate(MainRoutes.TIMER)}
               onPress={() =>
                navigation.navigate(MainRoutes.TIMER, {
                  title: item.m_title,
                  author: item.m_author,
                  publisher: item.m_publisher,
                  page : item.m_page,
                  image : item.m_cover,
                  user : item.m_u_idx,
                  idx : item.m_idx,
                })
              }
              style={styles.bookBox}
            >
              <Image
                source={{ uri: item.m_cover }}
                style={styles.bookImage}
                //resizeMode="cover"
                resizeMode='stretch'
                
              />
            </TouchableOpacity>
          );
    }

  return (
   <SafeInputView>

    <View style={[styles.container, {paddingTop : top}]}>

      {/* 로고 및 알림*/}
            <View style={styles.LogoContainer}>
                <DotLogo width={55} height={18}/>
                <BellIcon width={40} height={24}/>
            </View>

      {/* 1. 타이틀 영역 */}
      <View style={styles.header}>
        <Text style={styles.date}>
           {todayDate} {weekday}, 오늘의 독서 시간
        </Text>
      </View>

      {/* 2. 타이머 영역 */}
      <View style={[styles.timerBox, {marginBottom : TIMER_MARGIN }]}>
        <Text style={styles.timerText}>{formatTime(todayDuration)}</Text>
      </View>
    
        <HR styles={{
          container:{marginVertical:15},
          line : {borderBottomColor : BLACK, borderBottomWidth: 2.5}
          }}/>

      {/* 3. 검색창 영역 => 여기 외에 나머지 검색 ui는 통일(추후 이것도 통일될 수 있을 지 생각해보기 */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="내 서재 검색"
          placeholderTextColor={PRIMARY.LIGHT}
          style={styles.searchInput}
        />
        <View style={styles.icon}>
        <SearchIcon/>
        </View>
      </View>
    
      {/* 4. 책 표지 영역 */}
       <FlatList
        data={[...plusBooks, ...bookData]}   //반복할 데이터 배열
        keyExtractor={(item) => (item.id || item.m_idx).toString()} //각 아이템의 고유 key값 지정
        renderItem={renderBookItem} //각 아이템을 어떻게 그릴지 지정
        numColumns={3} // 3열로 출력
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }} // 한 행 스타일
        contentContainerStyle={{ //전체 목록을 감쌈
            paddingBottom: bottom //하단 여백 확보
        }}
        showsVerticalScrollIndicator={false} //스크롤바 숨김
        keyboardShouldPersistTaps="handled" //이거 안 주면 리스트 눌러도 dismiss 안 됨 (always는?)
        bounces={false} //스크롤 튕기는 거 없앰
      />
    
    </View>
</SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
  },
  header: {
    marginTop : 70,
    marginBottom : 10,
  },
  LogoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  date: {
    fontSize: fontScale(18),
    fontWeight: '500',
    color: BLACK,
  },
  timerBox: {
    //marginBottom: 25,
  },
  timerText: {
    fontSize: fontScale(70),
    fontWeight: 'light',
    color: 'black',
  },
  searchBox: {
    flexDirection: 'row',       // 아이템을 가로로 배치
    alignItems: 'center',       // 세로 정렬
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
    marginBottom: 20,
    justifyContent: 'space-between', // 텍스트는 왼쪽, 아이콘은 오른쪽
  },
  icon : {
   padding: 4,  
  },
  searchInput: {
    flex: 1,                    
    height: 40,
    fontSize: 16,
    paddingLeft: 5,
    color: 'black',
  },
  bookBox: {
    width: '31%',
    //aspectRatio: 0.7,
    aspectRatio : 0.75,
    borderRadius: 4,
    backgroundColor: BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: '50',
    color : WHITE,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

export default RecordScreen;
