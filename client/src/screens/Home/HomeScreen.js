import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from "react-native";
import { BLACK, WHITE, PRIMARY,GRAY } from "../../colors";
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 상하좌우 화면 침범 막기
import HR from "../../components/Common/HR";
import DotLogo from "../../../assets/icons/dot..svg";
import BellIcon from "../../../assets/icons/bell.svg";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native'; //반응형 대비 화면 크기
import { fontScale } from "../../fontScale";
import { LinearGradient } from "expo-linear-gradient";
import VectorIcon from "../../../assets/icons/Vector.svg";

import BookClub from "../../components/Home/BookClub";
import DiscussCard from "../../components/Home/DiscussCard";
import TranscriptBook from "../../components/Home/TranscriptBook";
import Curation from "../../components/Home/Curation";
import EditButton from "../../components/Home/EditButton";
import { useRef, useState } from "react";

export const bookImageMap = {
  book1: require("../../../assets/bookCovers/book7.jpg"),
  book2: require("../../../assets/bookCovers/book2.jpeg"),
};

export default function HomeScreen() {
const navigation = useNavigation();
const { top, bottom } = useSafeAreaInsets(); // 상하단 여백 값을 리턴 받음

const { width: screenWidth } = Dimensions.get('window');
const BOOK_WIDTH = screenWidth * 0.79;
const BOOK_HEIGHT = BOOK_WIDTH * 1.3;
const firstMargin = (screenWidth - BOOK_WIDTH) / 2 - 5;

//스크롤 인디게이터
const MARGIN_HORIZONTAL = 16;
const ITEM_WIDTH = BOOK_WIDTH + 16; 

const bookList = [
  { id: 1, key: 'book1' },
  { id: 2, key: 'book2' },
];

const [currentIndex, setCurrentIndex] = useState(0);

const handleScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / ITEM_WIDTH);
    setCurrentIndex(index);
};

const INDICATOR_TOTAL_WIDTH = screenWidth * 0.75;
const progressWidth = ((currentIndex + 1) / bookList.length) * INDICATOR_TOTAL_WIDTH;

  return (
    <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingTop: top + 10}}
    showsVerticalScrollIndicator={false}
    bounces={false}
    backgroundColor={GRAY.BRIGHT}
    >

    {/**  회색 배경 **/}
    <View style={{ backgroundColor: GRAY.BRIGHT}}>
      
      {/* 로고 및 알림*/}
           <View style={styles.LogoContainer}>
                <DotLogo width={55} height={18}/>
                <BellIcon width={40} height={24}/>
            </View>

    {/* 내 서재 책 보여주는 곳 */}
    <ScrollView 
    horizontal 
    bounces={false}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{marginTop : 20, paddingHorizontal: MARGIN_HORIZONTAL / 2}}

    //인디게이터
    pagingEnabled
    onScroll={handleScroll}
    scrollEventThrottle={16}
    >

    {bookList.map((book, idx) => (
     <ImageBackground
      key={book.id}
      //source={require('../../assets/bookCovers/book4.jpeg')}
      source={bookImageMap[book.key]}
      resizeMode="stretch"
      style={[
        {
        //marginLeft :firstMargin, 
        marginLeft: idx === 0 ? firstMargin : 8,
        width: BOOK_WIDTH,
        height: BOOK_HEIGHT,
        marginHorizontal: 8,
        justifyContent: 'flex-end',
       },
       {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      }
    ]}
      imageStyle={styles.imageBorder}
    >
      {/* 그라데이션 + 텍스트 */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
        style={styles.overlay}
      >
        <Text style={styles.percent}>82%</Text>
      </LinearGradient>
    </ImageBackground>
))}

    </ScrollView>
    <View
    style={{
      marginTop : 15,
      justifyContent : 'center',
      alignItems : 'center',
    }}>
    {/* 페이지 인디케이터 */}
      <View
        style={{
          height: 4,
          backgroundColor: '#E0E0E0',
          width: INDICATOR_TOTAL_WIDTH,
          marginTop: 6,
          alignSelf: 'center', // 가운데 정렬
          position: 'relative',
        }}
      >
        <View
          style={{
            height: 4,
            backgroundColor: '#000',
            width: progressWidth,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </View>

    <EditButton
    title="편집"
    onPress={()=>{}}
    />
    </View>
    <View style={{ height: 20 }} />

</View>


    {/** 흰색 배경 **/}
    <View style={{ backgroundColor: WHITE, paddingBottom : bottom}}>
    {/* 오늘의 퀴즈 */}
    <View style={[styles.quizBox,{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}]}>
    <View style={{flexDirection : 'column'}}>
    <Text style={styles.quizToday}>6월 19일 목요일, 오늘의 퀴즈</Text>
    <Text style={styles.quizQues}>{"'벗어지다'와 '벗겨지다' 중\n알맞은 말은?"}</Text>
    </View>
    <VectorIcon style={{marginHorizontal : 15}}/>
    </View>
    <HR styles={{
            container: { marginVertical: 15},
            line: { borderBottomColor: PRIMARY.LIGHT, borderBottomWidth: 1 }
          }} />

    {/* 지금 핫한 독서 모임 */}
   <View style={styles.bookClubBox}>
    <View style={styles.iconAlign}>
    <Text style={styles.contentsTitle}>지금 핫한 독서 모임</Text>
    <VectorIcon style={{marginHorizontal : 15, marginBottom : 10}}/>
    </View>
    <ScrollView
    horizontal 
    bounces={false}
    showsHorizontalScrollIndicator={false}
    >
    <BookClub
    imageKey="bookclub1"
    subject="도서 중심"
    clubTitle="[대온실 수리 보고서] 읽기"
    />
    <BookClub
    imageKey="bookclub2"
    subject="주제 중심"
    clubTitle="문학동네 시인선 도장 깨기"
    />
    <BookClub
    imageKey="bookclub3"
    subject="주제 중심"
    clubTitle="eBook 독서 모임"
    />
    </ScrollView>
    </View>
    
    {/* 뜨거운 토론의 장 */}
  <View style={styles.contentsBox}>
  <View style={styles.iconAlign}>
  <Text style={styles.contentsTitle}>뜨거운 토론의 장</Text>
  <VectorIcon style={{marginHorizontal : 15, marginBottom : 10}}/>
  </View>
  <ScrollView
    horizontal 
    bounces={false}
    showsHorizontalScrollIndicator={false}
    >
  <DiscussCard
  imageKey="discussion1"
  subject="사회에 대한 책임 vs 개인의 자유"
  discussTitle={"내가 안은영이라면,\n초능력 어떻게 쓸까?"}
  bookTitle="보건교사 안은영"
  bookAuthor="정세랑"
  />
  <DiscussCard
  imageKey="discussion2"
  subject="엄마 vs 이모"
  discussTitle={"소설 <모순>의 세계에\n갈 수 있다면?"}
  bookTitle="모순"
  bookAuthor="양귀자"
  />
  </ScrollView>
</View>
    {/* 필사하기 좋은 시집 */}
<View style={styles.contentsBox}>
<Text style={styles.contentsTitle}>필사하기 좋은 시집</Text>
<Text style={styles.explainMent}>봄에 어울리는 감성 돋는 시집들로 준비했어요</Text>
<ScrollView
    horizontal 
    bounces={false}
    showsHorizontalScrollIndicator={false}
    >
<TranscriptBook
imageKey="transcription1"
bookAuthor="한강"
bookTitle="서랍에 저녁을 넣어⋯"
/>
<TranscriptBook
imageKey="transcription2"
bookAuthor="안희연"
bookTitle="당근밭 걷기"
/>
<TranscriptBook
imageKey="transcription3"
bookAuthor="김소형"
bookTitle="도넛을 나누는 기분"
/>
<TranscriptBook
imageKey="transcription4"
bookAuthor="박준"
bookTitle="마중도 배웅도 없이"
/>
    </ScrollView>
</View>
    {/* 이달의 큐레이션(편집자 픽 시리즈 추천) */}
<View style={styles.contentsBox}>
<Text style={styles.contentsTitle}>이달의 큐레이션</Text>
<Text style={styles.explainMent}>편집자 픽! 지금 딱 읽기 좋은 시리즈</Text>
<ScrollView
    horizontal 
    bounces={false}
    showsHorizontalScrollIndicator={false}
    >
<Curation
imageKey="curation1"
title="이번 봄 문학 BEST 5"
contents="닷 유저들이 선정한 봄 문학"
/>
<Curation
imageKey="curation2"
title="문학동네 마케터 픽"
contents="지금, 정주행하기 딱인"
/>
</ScrollView>
</View>


    {/* 당신이라면 좋아할 만한(최근 본 책들을 기반으로 추천) */}
    <View style={styles.contentsBox}>
<Text style={styles.contentsTitle}>당신이라면 좋아할 만한</Text>
<Text style={styles.explainMent}>최근 본 책들을 기반으로 추천할게요</Text>
<ScrollView
    horizontal 
    bounces={false}
    showsHorizontalScrollIndicator={false}
    >
  <TranscriptBook
  imageKey="recommend1"
  bookAuthor="안미옥"
  bookTitle="저는 많이 보고 있⋯"
  />
  <TranscriptBook
  imageKey="recommend2"
  bookAuthor="최승호"
  bookTitle="내가 아직 쓰지 않⋯"
  />
  <TranscriptBook
  imageKey="recommend3"
  bookAuthor="박은지"
  bookTitle="여름 상설 공연"
  />
  <TranscriptBook
  imageKey="recommend4"
  bookAuthor="조시현"
  bookTitle="크림이 무게를 재는⋯"
  />
    </ScrollView>
</View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  LogoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal : 20,
  },
  bookContainer : {
    paddingTop : 20,
    alignItems : 'center',
  },
  imageBorder: {
    borderRadius: 4,
  },
  overlay: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom : 10,
    paddingRight : 10,
  },
  percent: {
    color: WHITE,
    fontSize: fontScale(74),
    fontWeight: '400',
  },
  quizBox : {
    paddingTop : 12,
    paddingLeft : 15,
  },
  quizToday : {
    paddingVertical : 12,
    fontSize : fontScale(12),
    fontWeight : '600',
    color : GRAY.DEFAULT,
  },
  quizQues : {
    fontSize : fontScale(20),
    fontWeight : '400',
    color : BLACK,
    lineHeight: 32,
  },
  bookClubBox : {
    paddingTop : 5,
    paddingLeft : 15,
  },
  contentsTitle : {
    fontSize : fontScale(20),
    fontWeight : '600',
    color : BLACK,
    marginBottom : 10,
  },
  contentsBox : {
    paddingTop : 40,
    paddingLeft : 15,
  },
  explainMent : {
    fontSize : fontScale(14),
    marginBottom : 20,
  },
  iconAlign : {
    flexDirection : 'row', 
    alignItems : 'center', 
    justifyContent : 'space-between',
    marginBottom : 10,
  },
  //인디게이터
  indicatorContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 10,
},


});
