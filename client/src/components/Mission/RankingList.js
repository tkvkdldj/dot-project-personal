// components/RankingItem.js
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, GRAY } from '../../colors';
import { fontScale } from '../../fontScale';
import { Dimensions } from "react-native";

const RankingList = ({ rank, name, percentage }) => {
  const isTop = rank === 1;
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const RANKING_PADDING = SCREEN_HEIGHT * 0.005;
  const LIST_BOTTOM = SCREEN_HEIGHT * 0.006;
  const TOP_NUMBER = SCREEN_HEIGHT * 0.006;

  return (
    <View style={[styles.container, {paddingVertical : RANKING_PADDING} , isTop && styles.topContainer]}>
      <View style={styles.leftBox}>
        <Text style={[styles.rankText, {paddingBottom : LIST_BOTTOM},isTop && styles.topRankText, {paddingTop : TOP_NUMBER}]}>{rank}</Text>
        <Text style={[styles.nameText, isTop && styles.topNameText]}>{name}</Text>
      </View>
      <Text style={[styles.percentText, isTop && styles.topPercentText]}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingVertical: 6,
    paddingHorizontal: 5,
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: fontScale(26),
    fontWeight: '400',
    marginRight: 10,
    color: BLACK,
    //paddingBottom : 10,
  },
  nameText: {
    fontSize: fontScale(23),
    color: BLACK,
  },
  percentText: {
    fontSize: fontScale(23),
    fontWeight: '400',
    color: BLACK,
  },
  // 강조 스타일
  topContainer: {
    //backgroundColor: '#f4f4f4',
    //borderRadius: 6,
  },
  topRankText: {
    fontSize: fontScale(43),
    fontWeight: '400',
    //paddingTop : 5,
    marginRight : 15,
  },
  topNameText: {
    fontSize: fontScale(45),
    fontWeight: '400',
    //paddingBottom : 5,
  },
  topPercentText: {
    fontSize: fontScale(41),
    fontWeight: '400',
  },
});

RankingList.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default RankingList;
