//ios -> 키보드가 화면 가리는 것 방지 코드
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import PropTypes from "prop-types";

const SafeInputView = ({ children }) => {
    return(
        <KeyboardAvoidingView
        style={{flex:1}}
        //키보드가 올라오면 View 전체를 padding을 줘서 밀어냄 (ios만 적용)
        behavior={Platform.select({ios:'padding'})}>
            <Pressable 
            //배경 아무데나 터치했을 때 키보드가 닫히게 함 -> Pressable로 다 감쌈
            //style={{flex:1}} 
            // -> 부모 안에서 가능한 모든 공간을 차지하라
            // -> KeyboardAvoidingView, ScrollView, View 같은 레이아웃 루트 요소에서는 거의 무조건 써준다고 생각
            style={{flex:1}} 
            onPress={()=>Keyboard.dismiss()}>
                {children}
            </Pressable>           
        </KeyboardAvoidingView>
    );
};

SafeInputView.propTypes = {
    children : PropTypes.node,
};

export default SafeInputView;