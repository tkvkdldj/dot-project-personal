// 피드 게시물
import { StyleSheet, View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../../colors';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostAction from './PostAction';
import PostTime from './PostTime';
import PostBook from './PostBook';
import HR from '../Common/HR';

const PostCard = ({
  profileUri,
  nickname,
  userId,
  hashtag,
  title,
  text,
  heart,
  comment,
  hits,
  time,
  onPress,
  imageKeys,
}) => {
  return (
    <Pressable onPress={onPress} style={defaultstyles.container}>
      {/* 프로필, 닉네임, 해시태그 */}
      <PostHeader
        profileUri={profileUri}
        nickname={nickname}
        userId={userId}
        hashtag={hashtag}
      />

      {/* 제목 + 본문 */}
      <PostContent
        title={title}
        text={text}
        //onPress={onPress} //본문 화면 이동
      />

      {/* 자유피드 */}
      {imageKeys ? (
        <PostBook imageKeys={imageKeys} />
      ) : null}


      {/* 좋아요/댓글/조회수 + 작성 시간 */}
      <View style={defaultstyles.ActionAndTime}>
        <PostAction
          heart={heart}
          comment={comment}
          hits={hits}
          styles={{
            container : {marginLeft : 50}
          }}
        />
        <PostTime time={time} />
      </View>

      <HR styles={{
        container: { marginVertical: 15 },
        line: { borderBottomColor: PRIMARY.LIGHT, borderBottomWidth: 1 }
      }} />
    </Pressable>
  );
};

// props 타입 정의
PostCard.propTypes = {
  profileUri: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  hashtag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  heart: PropTypes.number.isRequired,
  comment: PropTypes.number.isRequired,
  hits: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  onPress : PropTypes.func,
  imageKeys : PropTypes.arrayOf(PropTypes.string),
};

const defaultstyles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  ActionAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default PostCard;