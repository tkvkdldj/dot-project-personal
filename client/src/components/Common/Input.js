//커스텀 컴포넌트
import { StyleSheet,Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { GRAY, PRIMARY } from '../../colors';
import TextButton from './TextButton'; //회원가입-중복확인 버튼을 내장시키기 위함

export const ReturnKeyTypes = {
    DONE : 'done',
    NEXT : 'next',
};

/* 텍스트 필드 타입 */
// Input 컴포넌트의 props로 inputType을 추가하여 이 값을 받도록 함
export const InputTypes = { 
    NICKNAME : 'NICKNAME', //닉네임
    EMAIL : 'EMAIL', //이메일
    PASSWORD : 'PASSWORD', //비밀번호
    PASSWORD_CONFIRM : 'PASSWORD_CONFIRM', //비밀번호 확인
};

/* 비밀번호 & 비밀번호 확인의 속성이 공통되어 따로 빼줌 */
const PasswordProps = {
    keyboardType: 'default',
    secureTextEntry: true,
    /* 자동 덮어쓰기 방지 */
    autoCapitalize: 'none',
    autoCorrect: false,
    autoComplete : 'off',
    importantForAutofill: 'no',
    iconName: {active: 'key', inactive: 'key'}
}

// InputTypes 변수 별로 받을 props를 미리 정의
const InputTypeProps = {
    NICKNAME : {
        title : '닉네임',
        placeholder : '닉네임',
        keyboardType: 'default',
        secureTextEntry : false,
        textContentType: 'nickName',
        
        //일단 임의로 아이콘을 넣어본다
        iconName : { active: 'user', inactive: 'user'},
    },

    EMAIL : {
        title: '아이디(이메일)',
        placeholder: '이메일 주소',
        keyboardType: 'email-address',
        secureTextEntry : false,
        //추가 (비밀번호와 구분)
        textContentType: 'emailAddress',     
        iconName: { active : 'mail', inactive: 'mail'},
       
    },

    PASSWORD : {
        title: '비밀번호',
        placeholder : '비밀번호',
        
        //자동 비밀번호 할당 방지!!
        //textContentType: 'newPassword',
        textContentType: 'none',
        ...PasswordProps,
    },

    PASSWORD_CONFIRM : {
        title : '비밀번호 확인',
        placeholder : '비밀번호를 한 번 더 입력하세요',
        textContentType: 'none', // 비밀번호 확인은 자동완성 비활성화
        ...PasswordProps,
    },
};

const Input = forwardRef(({inputType, styles, showTitle=false, showIcon=false, 
    showCheckButton=false, onCheckPress, isRequired = false, ...props}, ref) => {
    //따로 정의한 props들을 가지고 오고 싶으면 여기에도 정의를 해줬어야
    const {
        title,
        placeholder,
        keyboardType,
        secureTextEntry,
        autoCapitalize,
        textContentType,
        autoCorrect,
        autoComplete,
        importantForAutofill,
        iconName: { active, inactive},
    } = InputTypeProps[inputType];

    const { value } = props;

    //포커스 상태에 따라 다른 아이콘을 사용하도록 포커스 상태 관리하는 상태변수
    const [isFocused, setIsFocused] = useState(false);

    return(//{ }안에 변수를 추가하려면 [ ]로 감싸줘야하나보다
        <View style={[defaultStyles.container, styles?.container]}>
            {/* title 렌더링 여부 */}
            {showTitle && (
                <Text style={[defaultStyles.title, styles?.title]}>
                {title}
                {isRequired && <Text style={{ color: 'red' }}> *</Text>}
                </Text>
            )}
            <View>
                <TextInput
                    ref={ref}
                    {...props}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => setIsFocused(true)}
                    onBlur={()=>setIsFocused(false)}
                    style={[
                        defaultStyles.input, 
                        {
                            borderColor: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
                            //color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK,
                            paddingRight: showCheckButton ? 100 : 50,
                        },
                        styles?.input

                    ]}
                    textContentType={textContentType}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    importantForAutofill={importantForAutofill}
                    autoCorrect={autoCorrect}
                />

                {/* icon이 보일 때만 렌더링 */}
                 {showIcon && (
                <View style={defaultStyles.icon}>
                    <Feather
                        name={isFocused ? active : inactive}
                        size={21}
                        color={value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK}
                    />
                </View>
                 )}

                {/* 중복확인 버튼 보일 때만 렌더링 */}
                 {showCheckButton && (
                    <View style={defaultStyles.checkButtonWrapper}>
                        <TextButton
                            title="중복 확인"
                            onPress={onCheckPress}
                            styles={{ title: defaultStyles.checkButtonText }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
});

Input.displayName = 'Input'; //?

Input.propTypes = {
    inputType: PropTypes.oneOf(Object.values(InputTypes)).isRequired,
    value: PropTypes.string.isRequired,
    styles: PropTypes.object,
    showTitle: PropTypes.bool,
    showIcon: PropTypes.bool,
    showCheckButton: PropTypes.bool,
    onCheckPress: PropTypes.func,
    isRequired: PropTypes.bool, 
  };
  
const defaultStyles = StyleSheet.create({
    container:{
        width:'100%',
        paddingHorizontal: 20,
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderRadius : 25,
        height : 50,
        paddingHorizontal : 40,
        paddingLeft: 50,//placeholder 위치
    },
    icon:{
        position: 'absolute',
        left : 20,
        height : '100%',
        justifyContent : 'center',
    },
    title:{
        marginBottom : 10,
        fontWeight: '700',
    },
    checkButtonWrapper: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    checkButtonText: {
        color: PRIMARY.DEFAULT,
        borderWidth: 1,
        borderColor: PRIMARY.DEFAULT,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 10,
        marginRight : -5,
        fontSize: 13,
    },
});

export default Input;