//좋아요, 댓글, 조회수
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, BLACK } from '../../colors';
import HeartIcon from '../../../assets/icons/heart.svg';
import MessageIcon from '../../../assets/icons/message.svg';
import EyesIcon from '../../../assets/icons/eyes.svg';
import { fontScale } from "../../fontScale";

const PostAction = ({ heart, comment, hits, styles }) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
        
        <View style={defaultStyles.iconContainer}>
        <HeartIcon style={defaultStyles.iconStyle}/>
        <Text style={defaultStyles.numberStyle}>{heart}</Text>
        </View>
        
        <View style={defaultStyles.iconContainer}>
        <MessageIcon style={defaultStyles.iconStyle}/>
        <Text style={defaultStyles.numberStyle}>{comment}</Text>
        </View>
        
        <View style={defaultStyles.iconContainer}>
        <EyesIcon style={defaultStyles.iconStyle}/>
        <Text style={defaultStyles.numberStyle}>{hits}</Text>
        </View>
    
    </View>
  );
};

PostAction.propTypes = {
  heart: PropTypes.number.isRequired,
  comment: PropTypes.number.isRequired,
  hits: PropTypes.number.isRequired,
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection : 'row',
    marginTop : 15,
    //marginLeft : 50,
  },
  iconContainer : {
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    alignItems : 'stretch',
    marginRight : 15,
  },
  iconStyle : {
    marginRight : 4, 
    padding : 8, 
    marginTop : 1
  },
  numberStyle : {
    fontSize : fontScale(14),
    fontWeight : '400',
    color : GRAY.DEFAULT,
   
  },
  
});

export default PostAction;