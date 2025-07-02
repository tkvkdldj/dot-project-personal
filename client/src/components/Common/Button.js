//버튼 커스텀 컴포넌트 (로그인 모양)
import { ActivityIndicator, Pressable, StyleSheet, Text, View,} from 'react-native';
import PropTypes from 'prop-types';
import { WHITE,GRAY, PRIMARY } from '../../colors';

const Button = ({ styles, title, onPress, disabled, isLoading}) => {
    return(
        <View style={[defaultStyles.container, styles?.container]}>
            <Pressable 
            onPress={()=>onPress()}
            disabled={disabled || isLoading}
            style={ ({ pressed }) => [
                defaultStyles.button,
                {
                    backgroundColor : (()=>{
                        switch (true) {
                            case disabled || isLoading:
                                return PRIMARY.LIGHT;
                            case pressed:
                                return PRIMARY.DEFAULT;
                            default:
                                return PRIMARY.DEFAULT;
                        }
                    })(), //뭐야 이거
                },
                styles?.button,
            ]}
            >
                {isLoading ? ( //뭔 코드야 이게
                    <ActivityIndicator size="small" color={GRAY.DARK}/>
                ) : (
                    <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
                )}
            </Pressable>
        </View>
    );
};

Button.propTypes = {
    styles: PropTypes.object,
    title: PropTypes.string.isRequired,
    onPress : PropTypes.func.isRequired,
    disabled : PropTypes.bool,
    isLoading : PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
    container : {
        width : '100%',
        paddingHorizontal: 20,
    },
    button : {
        borderRadius : 25,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
    },
    title: {
        color: WHITE,
        fontSize : 16,
        fontWeight : '700',
        lineHeight : 20,
    },

});

export default Button;