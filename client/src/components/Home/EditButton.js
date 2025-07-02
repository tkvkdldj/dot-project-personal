//편집 버튼
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY } from '../../colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fontScale } from '../../fontScale';
import { Dimensions } from 'react-native';

const EditButton = ({ styles, title, onPress }) => {
   const { height: SCREEN_HEIGHT } = Dimensions.get('window');
   const BUTTON_HEIGHT = SCREEN_HEIGHT * 0.033;
   const BUTTON_WIDTH = BUTTON_HEIGHT * 2.34;

  return (
    <Pressable style={[defaultstyles.button,{height : BUTTON_HEIGHT, width : BUTTON_WIDTH}, styles?.button ]} onPress={onPress}>
      <View style={[defaultstyles.innerContainer, styles?.innerContainer]}>
        <Ionicons name="pencil-sharp" size={12} style={[defaultstyles.icon, styles?.icon]} />
        <Text style={[defaultstyles.text, styles?.text]}>{title}</Text>
      </View>
    </Pressable>
  );
};

EditButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const defaultstyles = StyleSheet.create({
  button: {
    //flex: 1,
    //height: 35,
    borderWidth: 1.2,
    borderRadius : 20,
    borderColor: GRAY.DEFAULT,
    justifyContent: 'center',
    alignItems : 'center',
    marginRight : 4,
    marginTop : 20,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft : 12,
    paddingRight : 8,
    //paddingVertical : 6,
  },
  text: {
    fontSize: fontScale(14),
    color: GRAY.DEFAULT,
    fontWeight: '600',
    marginLeft : 3,
  },
  icon : {
    color : GRAY.DEFAULT
  }
});

export default EditButton;