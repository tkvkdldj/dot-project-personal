import { Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { GRAY, PRIMARY, WHITE, BLACK } from "../../colors";
import { fontScale } from "../../fontScale";
import { Dimensions } from "react-native";

//selected : 키워드 선택 화면에서 사용
//keywordStyle : 키워드 선택할 때만 style 변경되도록 하는 변수
const MissionButton = ({styles, title, detail, onPress, hitSlop, keywordStyle})=>{
    const { height: SCREEN_HEIGHT } = Dimensions.get('window');
    const BUTTON_BOTTOM = SCREEN_HEIGHT * 0.015;
    const BUTTON_PADDING = SCREEN_HEIGHT * 0.015;
    
    const getTextStyle = () => {
        if (keywordStyle) {
          return [
              defaultStyles.title,
              baseKeywordStyle,
              styles?.title, // 커스터마이징 스타일은 항상 마지막에 병합
          ];
        }
        return [defaultStyles.title, styles?.title]; // 기본 스타일 분기
  };

    
    return(
        <Pressable
            style={[defaultStyles.button, {marginBottom : BUTTON_BOTTOM, paddingVertical : BUTTON_PADDING}, styles?.button]} // button 스타일도 유지
            hitSlop={hitSlop ? hitSlop : 10} //터치 영역 확장
            onPress={onPress}    
        >
            {/*<Text style={[defaultStyles.title, styles?.title]}>{title}</Text>*/}
             <Text style={getTextStyle()}>{title}</Text>
             <Text style={defaultStyles.detail}>{detail}</Text>
            
        </Pressable>
    );
};

MissionButton.propTypes = {
    styles : PropTypes.object,
    title : PropTypes.string.isRequired,
    detail : PropTypes.string.isRequired,
    onPress : PropTypes.func.isRequired,
    hitSlop : PropTypes.number,
    selected : PropTypes.bool,
    keywordStyle: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  title: {
    color: BLACK,
    fontWeight: '600',
    fontSize: fontScale(16),
    marginBottom : 5,
  },
  button: {
    //marginRight: 15,
    //marginBottom: 15,
    //paddingVertical : 14,
    paddingHorizontal : 9,
    borderWidth : 1,
    borderColor : PRIMARY.LIGHT,
  },
  detail: {
    fontSize : fontScale(12),
    fontWeight : '500',
    lineHeight : 18,
  }
});

const baseKeywordStyle = {
  borderWidth: 1,
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 10,
  marginBottom : -12,
  marginRight : -10,
  fontSize: 15,
};


export default MissionButton;