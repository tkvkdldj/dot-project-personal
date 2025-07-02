//검색 ui
import { Pressable, TextInput, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import SearchIcon from '../../../assets/icons/magnifyingglass.svg';
import { BLACK, GRAY, PRIMARY } from '../../colors';

const SearchField = () => {
  //const navigation = useNavigation();

  return (
    <View style={defaultstyles.searchBox}>
      <TextInput
        placeholder="검색"
        placeholderTextColor={BLACK}
        style={defaultstyles.searchInput}
      />
      <SearchIcon/>
    </View>
  );
};

SearchField.propTypes = {
  
};


const defaultstyles = StyleSheet.create({
searchBox: {
   flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY.LIGHT,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 40,
    width: '100%',
  },
  icon : {
   padding: 4,  
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 0, // 줄간격 너무 넓어지는 거 방지
  },    

});



export default SearchField;