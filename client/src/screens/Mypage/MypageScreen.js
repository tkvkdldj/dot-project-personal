//마이페이지 화면
import { Button, StyleSheet, Text, View } from "react-native";
import { useUserState } from "../../contexts/UserContext";
import { useRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const MypageScreen = () => {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ['30%'], []);

     const handleChange = useCallback((index) => {
    console.log('Changed to index:', index);
  }, []);

    const [, setUser] = useUserState();
   
     /* 바텀시트 열고/닫는 헬퍼 */
    const openSheet  = () => sheetRef.current?.snapToIndex(0);   // 0 → '10%' 지점
    const closeSheet = () => sheetRef.current?.close();          // 내부 util, == snapToIndex(-1)

    return( 
        <View style={styles.container}>
            <Text>MYPAGE</Text>
            <Button title="로그아웃" onPress={()=>setUser(null)}/> 

        <Button title="시트 열기" onPress={openSheet} />

        <BottomSheet
            ref={sheetRef}
            index={-1}                     // ← 핵심: 처음엔 닫힌 상태
            snapPoints={snapPoints}
            //enablePanDownToClose           // 손가락으로 내려서 닫기
            animateOnMount={false}         // ‘살짝 떴다가 사라지는’ 깜빡임 방지용
            onChange={handleChange}
            //enablePanDownToClose={false}               // 손으로 닫는 것도 막고 싶다면 false
            enableContentPanningGesture={false}        // 바텀시트 내용 터치 시 드래그 불가
            enableHandlePanningGesture={false}         // 바텀시트 핸들 부분 드래그 불가
        >
            <BottomSheetView style={styles.content}>
            <Text>여기에 바텀시트 내용</Text>
            <Button title="닫기" onPress={closeSheet} />
            </BottomSheetView>
        </BottomSheet>

        </View>

        
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        //backgroundColor : '#ffffff'
    },
    content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },

});

export default MypageScreen;