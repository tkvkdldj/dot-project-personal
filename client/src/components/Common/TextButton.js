import { Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { GRAY, PRIMARY, WHITE } from "../../colors";

//selected : 키워드 선택 화면에서 사용
//keywordStyle : 키워드 선택할 때만 style 변경되도록 하는 변수
const TextButton = ({styles, title, onPress, hitSlop, selected, keywordStyle})=>{
    
    const getTextStyle = () => {
        if (keywordStyle) {
          return [
              defaultStyles.title,
              baseKeywordStyle,
              selected ? selectedKeywordStyle : unselectedKeywordStyle,
              styles?.title, // 커스터마이징 스타일은 항상 마지막에 병합
          ];
        }
        return [defaultStyles.title, styles?.title]; // 기본 스타일 분기
  };

    
    return(
        <Pressable
            //style={styles?.button}
            style={[defaultStyles.button, styles?.button]} // button 스타일도 유지
            hitSlop={hitSlop ? hitSlop : 10} //터치 영역 확장
            onPress={onPress}    
        >
            {/*<Text style={[defaultStyles.title, styles?.title]}>{title}</Text>*/}
             <Text style={getTextStyle()}>{title}</Text>
            
        </Pressable>
    );
};

TextButton.propTypes = {
    styles : PropTypes.object,
    title : PropTypes.string.isRequired,
    onPress : PropTypes.func.isRequired,
    hitSlop : PropTypes.number,
    selected : PropTypes.bool,
    keywordStyle: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  title: {
    color: GRAY.DARK,
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    marginRight: 10,
    marginBottom: 10,
  },
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

const selectedKeywordStyle = {
  color: WHITE,
  backgroundColor: PRIMARY.DEFAULT,
  borderColor: PRIMARY.DEFAULT,
};

const unselectedKeywordStyle = {
  color: PRIMARY.DEFAULT,
  backgroundColor: WHITE,
  borderColor: PRIMARY.DEFAULT,
};


export default TextButton;