//TimerScreen 모달의 '오늘의 독서탭' 콘텐츠
import { useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import { BLACK, GRAY } from '../../colors';
import PropTypes from 'prop-types';
import { fontScale } from '../../fontScale';
import { Dimensions } from 'react-native';

const ReadingTabContent = ({ title, image, author ,page, currentPage, setCurrentPage }) => {
  //const totalPages = 140; // 전체 페이지 수
  //const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

  // 기기 화면 크기 가져오기
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const BOTTOM_MARGIN = SCREEN_HEIGHT * 0.032; // 첫 번째 박스 아래쪽 마진
  const TOP_MARGIN = SCREEN_HEIGHT * 0.025;    // 두 번째 박스 위쪽 마진

  return (
    <View style={{marginTop : 10, marginBottom : 72}}>
      {/* 책 이미지 + 정보 */}
      <View style={styles.bookInfoContainer}>
        
        <Image
            source={{uri:image}}
            style={styles.bookImage}
        />
        <View style={styles.bookTextContainer}>
          <View style={{marginBottom : BOTTOM_MARGIN}}>
            <Text style={styles.bookTitle}>{title}</Text>
            <Text style={styles.bookAuthor}>{author}</Text>
          </View>   
            
            <View style={styles.pageContainer}>
                <Text style={styles.currentPage}>P.{currentPage}</Text>
                <Text style={styles.totalPage}> / {page}</Text>
            </View>
        </View>
      </View>

      {/* 페이지 슬라이더 */}
      <Slider
        trackStyle={{ height: 6 }} // 슬라이더 바 굵기 조절
        minimumValue={0}
        maximumValue={page}
        step={1}
        minimumTrackTintColor="black"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="black"
        value={currentPage}
        onValueChange={setCurrentPage}
      />
    </View>
  );
};

ReadingTabContent.propTypes = {
  title : PropTypes.string.isRequired,
  image : PropTypes.string,
  author : PropTypes.string.isRequired,
  page : PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  bookInfoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal : 5,
    alignItems: 'flex-start', // 위로 정렬
  },
  bookImage: {
    width: 115,
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 4,
    marginRight: 20,
  },
  bookTextContainer: {
    flex: 1, // ← 전체 row 중 남은 공간 차지
    height: 150, // bookImage 높이와 맞춤 (고정!)
    position: 'relative', // 자식 요소의 절대 위치 기준
  },
  bookTitle: {
    fontSize: fontScale(19),
    fontWeight: '600',
    paddingBottom : 7,
    flexWrap: 'wrap',      // <- wrap 활성화 (기본값이긴 함)
    lineHeight: 26,        // 가독성 향상
  },
  bookAuthor: {
    fontSize: fontScale(16),
    color: BLACK,
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    position: 'absolute', // ← 절대 위치로 고정
    bottom: 0, // ← 컨테이너 맨 아래에 고정
    // marginTop은 인라인으로 동적 적용
  },
  currentPage: {
    fontSize: fontScale(37),
    fontWeight: '400'
  },
  totalPage: {
    fontSize: fontScale(20),
    color: GRAY.DARK,
    marginLeft: 4,
  },
});

export default ReadingTabContent;