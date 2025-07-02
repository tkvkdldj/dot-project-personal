//게시글 작성 플로팅 버튼
import { Pressable, StyleSheet, View } from "react-native";
import { BLACK, WHITE } from "../../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const InputFAB = () => {
    const { width:SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    const WIDTH = SCREEN_WIDTH * 0.13;
    const HEIGHT = SCREEN_HEIGHT * 0.06;

    return (
        <Pressable
            style={({pressed})=>[
                styles.button,{width : WIDTH, height : HEIGHT}
            ]}
        >
            <MaterialCommunityIcons name="plus" size={34} color={WHITE}/>
        </Pressable>

    );

};

const styles = StyleSheet.create({
    button : {
        position : 'absolute',
        bottom : 15,
        right : 20,
        //width : 60,
        //height : 60,
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : BLACK,
    },
});

export default InputFAB;