//필터버튼
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, WHITE, GRAY, PRIMARY } from '../../colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { fontScale } from "../../fontScale";
import { Modalize } from 'react-native-modalize';
import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';


const FilterButton = ({ styles, title, onPress }) => {
   const { height: SCREEN_HEIGHT } = Dimensions.get('window');
   const BUTTON_HEIGHT = SCREEN_HEIGHT * 0.037;


  return (
    <View>
    <Pressable 
    style={[defaultstyles.button,{height : BUTTON_HEIGHT}, styles?.button ]} 
    onPress={onPress}>
      <View style={[defaultstyles.innerContainer, styles?.innerContainer]}>
        <Text style={[defaultstyles.text, styles?.text]}>{title}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={22} style={[defaultstyles.icon, styles?.icon]} />
      </View>
    </Pressable>  

    
  </View>
    

  );
};

FilterButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const defaultstyles = StyleSheet.create({
  button: {
    //flex: 1,
    //height: 35,
    borderWidth: 1,
    borderRadius : 20,
    borderColor: PRIMARY.LIGHT,
    justifyContent: 'center',
    marginRight : 4,
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
    color: GRAY.DARK,
    fontWeight: '500',
  },
  icon : {
    color : GRAY.DARK,
  }
});

export default FilterButton;