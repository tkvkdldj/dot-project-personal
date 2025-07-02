//필터링 카테고리 모달 컨텐츠
import { View, Text, StyleSheet, Pressable } from "react-native";
import PropTypes from 'prop-types';
import { BLACK, WHITE, GRAY, PRIMARY } from '../../colors';
import { useState, useEffect } from "react";

const FilterModal = ({options, defaultSelected = []}) => {
    const [selected , setSelected] = useState(defaultSelected);

 useEffect(() => {
  // 기본값이랑 현재 selected 상태가 다를 때만 setState 해줘 -> 추후 변경
  const isSame =
    selected.length === defaultSelected.length &&
    selected.every((val) => defaultSelected.includes(val));

  if (!isSame) {
    setSelected(defaultSelected);
  }
}, [defaultSelected]);
  
    const toggleItem = (item) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
    };

    return(
         <View style={{marginBottom : 15}}>
        {options.map((item) => (
        <Pressable
          key={item}
          onPress={() => toggleItem(item)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{item}</Text>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderRadius : 2,
              borderColor: '#aaa',
              backgroundColor: selected.includes(item) ? GRAY.DARK : WHITE,
            }}
          />
        </Pressable>
      ))}
    </View>
    );
}

FilterModal.propTypes = {
    options : PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultSelected: PropTypes.arrayOf(PropTypes.string),
}

export default FilterModal;
