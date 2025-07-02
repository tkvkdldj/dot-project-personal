//포스트의 프로필, 닉네임, 해시태그 부분
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, BLACK } from '../../colors';
import { fontScale } from "../../fontScale";

const PostHeader = ({ profileUri, nickname, userId, hashtag }) => {
// DB에 "cloud" 라고 저장돼 있다면
const localImageMap = {
  cloud: require('../../../assets/images/cloud.jpg'),
  galaxy: require('../../../assets/images/galaxy.jpg'),
  cute : require('../../../assets/images/cute.jpg'),
  star : require('../../../assets/images/star.jpg'),
  kuchipatchi : require('../../../assets/images/kuchipatchi.jpg'),
  baby : require('../../../assets/images/baby.jpg'),

  // 추가 가능
};
const isRemoteUrl = profileUri && profileUri.startsWith('http');

const resolvedImageSource =
    isRemoteUrl
      ? { uri: profileUri }
      : localImageMap[profileUri] || localImageMap['galaxy']; // fallback

  return (
    <View style={styles.container}>
      {/* 왼쪽: 프로필 이미지 + 닉네임 */}
      <View style={styles.userInfo}>
        <Image
          /*
          source={
            profileUri && profileUri.trim() !== ''
              ? { uri: profileUri }
              : require('../../assets/images/galaxy.jpg')
          }*/
          source={resolvedImageSource}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.userId}>@{userId}</Text>
        </View>
      </View>

      {/* 오른쪽: 해시태그 */}
      <Text style={styles.hashtag}>{hashtag}</Text>
    </View>
  );
};

PostHeader.propTypes = {
  profileUri: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  userId: PropTypes.string,
  hashtag: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //width : '100%'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nickname: {
    fontSize: fontScale(15),
    fontWeight: '600',
    color: BLACK,
    marginBottom : 5,
  },
  userId: {
    fontSize: fontScale(13),
    color: GRAY.DEFAULT,
  },
  hashtag: {
    fontSize: fontScale(14),
    fontWeight : '600',
    color: GRAY.DEFAULT,
    marginBottom : 18,
  },
});

export default PostHeader;