import { Pressable, Text, View, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons'; // feather 쓰고 있다면
import { BLACK } from "../../colors";
import { fontScale } from "../../fontScale";
import { Dimensions } from "react-native";

const RankingHeaderButton = ({ onPress }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const PADDING_VER = SCREEN_HEIGHT * 0.02;
  return (
    <Pressable onPress={onPress} style={{paddingVertical : PADDING_VER}}>
      <View style={styles.inner}>
        <Text style={styles.title}>Ranking</Text>
        <Feather name="chevron-right" size={30} color={BLACK} style={{marginRight:-5}} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 23,
    //paddingHorizontal: 20,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(20),
    fontWeight: '600',
    color: BLACK,
  },
});

export default RankingHeaderButton;