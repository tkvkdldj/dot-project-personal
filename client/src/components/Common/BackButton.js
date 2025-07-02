import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const BackButton = ({ size = 22, color = 'black', onPress }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={onPress || navigation.goBack}
      style={({ pressed }) => ({ opacity: 1 })} // 눌러도 시각적 변화 없음
    >
      <MaterialIcons name="arrow-back-ios-new" size={size}/>
    </Pressable>
  );
};

BackButton.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

export default BackButton;