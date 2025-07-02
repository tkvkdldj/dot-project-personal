//피드 상세보기 페지
import { StyleSheet, Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import SearchField from "../../components/Feed/SearchField";
import { WHITE, PRIMARY, BLACK, GRAY} from "../../colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ArrayPost from "../../components/Feed/ArrayPost";
import BackButton from "../../components/Common/BackButton";
import PostHeader from "../../components/Feed/PostHeader";
import { fontScale } from "../../fontScale";
import AttachBook from "../../components/Feed/AttachBook";
import PostAction from "../../components/Feed/PostAction";
import PostTime from "../../components/Feed/PostTime";
import HR from "../../components/Common/HR";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState, useCallback } from "react";

const FeedDetailScreen = () => {
    const navigation = useNavigation();
    const { top, bottom } = useSafeAreaInsets();

    //바텀시트
    const commentSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['10%'], []);
    //const [commentText, setCommentText] = useState('');

    const handleChange = useCallback((index) => {
        console.log('Changed to index:', index);
     }, []);

    return(
        
        <View style={[styles.container, {paddingTop : top}]}>
           
            <View style={styles.backHeader}>
            <BackButton/>
            </View>
            <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ paddingBottom : bottom + 70}}
            >

            <View style={{paddingHorizontal : 20}}>
            <View style={styles.profile}>
                <PostHeader
                profileUri="cute"
                nickname="혜징"
                userId="hyeji1111"
                />
            </View>

            {/* 제목 및 본문 */}
            <View style={{marginTop : 20}}>
            <View>
                <Text style={styles.titleStyle}>어른들을 위한 심리학</Text>
            </View>
            <View>
                <Text style={styles.textStyle}>
                    {
                    "안녕! 오늘은 심리학 책을 추천해 주려고 해~ 한 권의 책을 깊이 읽고 내 마음과 마주하는 시간은 특별한 경험이잖아? 특히 그게 내 자신을 조금 더 이해하게 만드는 방법인 것 같아 ~ 그럼 책을 소개해 볼까?\n\n첫 번째 책은 내가 가장 처음 읽었던 책이야 ㅎㅎ 이 책 진짜 좋더라고! 다들 완벽주의 때문에 힘들 때가 있잖아? 오히려 회피하게 된다거나... 그러면서 불안해진다거나 ㅜ 이 책이 그런 걸 많이 해소해 줬어서 추천해"
                    }
                </Text>
                 {/* 도서 첨부 */}
                <AttachBook
                imageKey="feed1"
                title="불안한 완벽주의자를 위한 책"
                contents="AAA | BBBB"
                />
                <Text style={styles.textStyle}>
                    {
                    "두 번째 책은 내가 가장 처음 읽었던 책이야 ㅎㅎ 이 책 진짜 좋더라고! 다들 완벽주의 때문에 힘들 때가 있잖아? 오히려 회피하게 된다거나... 그러면서 불안해진다거나 ㅜ 이 책이 그런 걸 많이 해소해 줬어서 추천해"
                    }
                </Text>
                 <AttachBook
                imageKey="feed2"
                title="감상의 심리학"
                contents="AAA | BBBB"
                />
                <Text style={styles.textStyle}>
                    {
                    "두 번째 책은 내가 가장 처음 읽었던 책이야 ㅎㅎ 이 책 진짜 좋더라고! 다들 완벽주의 때문에 힘들 때가 있잖아? 오히려 회피하게 된다거나... 그러면서 불안해진다거나 ㅜ 이 책이 그런 걸 많이 해소해 줬어서 추천해"
                    }
                </Text>
                {/* 좋아요, 댓글수, 조회수, 작성시간 */}
                <View style={styles.ActionAndTime}>
                <PostAction
                heart={12}
                comment={12}
                hits={12}
                />
                <PostTime
                time="26분 전"
                />
                </View>
            </View>
            </View>
            </View>
            
            {/* 댓글 영역 */}
            <View>
            <HR styles={{
                    container: {marginTop : 15, },
                    line: { borderBottomColor: PRIMARY.LIGHT, borderBottomWidth: 2 }
                }} />
            <View style={{marginLeft: 20, marginVertical : 8}}>
            <ArrayPost/>
            </View>
            <HR styles={{
                    line: { borderBottomColor: PRIMARY.LIGHT, borderBottomWidth: 2 }
                }} />
            </View>

            {/* 유저 댓글 => 각 댓글도 커스텀으로 분리해서 보내는게 낫겠지..? */}       
            <View style={{paddingHorizontal : 20}}>
                <View style={{flexDirection : 'row', alignItems:'flex-end' ,marginTop : 20}}>
                <PostHeader
                profileUri="kuchipatchi"
                nickname="이독자"
                userId="hyeji1111"
                />
                <PostTime
                time="• 26분 전"
                />
                </View>
                <View style={{marginLeft : 50}}>
                    <Text style={{fontSize : fontScale(14), marginTop : 10, lineHeight : fontScale(22)}}>
                    안은영 처럼 살면 너무 힘들 것 같아ㅜ내가 원해서 가진 것도 아니고 남의 걸 뺏은 것도 아닌데 책임까지 져야 한다니...난 못할 것 같다
                    </Text>
                </View>
            </View>
            
            <HR styles={{
                    container: {marginTop : 15, },
                    line: { borderBottomColor: PRIMARY.LIGHT, borderBottomWidth: 2 }
                }} />

                <View style={{paddingHorizontal : 20}}>
                <View style={{flexDirection : 'row', alignItems:'flex-end' ,marginTop : 20}}>
                <PostHeader
                profileUri="baby"
                nickname="정세랑팬"
                userId="hyeji1111"
                />
                <PostTime
                time="• 26분 전"
                />
                </View>
                <View style={{marginLeft : 50}}>
                    <Text style={{fontSize : fontScale(14), marginTop : 10, lineHeight : fontScale(22)}}>
                    그래도 책임져야 하지 않을까? 마음대로 쓴다는게 나쁘게 쓴다는 건 아니지만 다른 사람한테 도움이 되면 좋을 것 같아
                    </Text>
                </View>
            </View>
                <HR styles={{
                    container: {marginTop : 15, },
                    line: { borderBottomColor: PRIMARY.LIGHT, borderBottomWidth: 2 }
                }} />
            </ScrollView>

            {/* 댓글 입력 바텀시트 */}
            <BottomSheet
            ref={commentSheetRef}
            index={0}                     // ← 핵심: 처음엔 닫힌 상태
            snapPoints={snapPoints}
            handleComponent={null}
            //enablePanDownToClose           // 손가락으로 내려서 닫기
            animateOnMount={false}         // ‘살짝 떴다가 사라지는’ 깜빡임 방지용
            onChange={handleChange}
            backgroundStyle={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
        }}
            //enablePanDownToClose={false}               // 손으로 닫는 것도 막고 싶다면 false
            //enableContentPanningGesture={false}        // 바텀시트 내용 터치 시 드래그 불가
            //enableHandlePanningGesture={false}         // 바텀시트 핸들 부분 드래그 불가
        >
            <BottomSheetView style={styles.content}>
            <TextInput
            placeholder="댓글을 작성해 보세요"
            fontSize={fontScale(12)}
            placeholderTextColor={GRAY.DARK}
            style={{
                borderWidth : 1,
                borderColor : GRAY.DARK,
                height : 33,
                width : '100%',
                paddingLeft : 10
            }}
            />
            
            </BottomSheetView>
            </BottomSheet>
        </View>

        
    );

};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : WHITE, //바텀 탭 내비게이터에서는 contentStyle옵션을 지원하지 않기에 화면마다 컬러 지정
        //paddingHorizontal: 20,
        overflow: 'visible',
    },
    backHeader: {
        paddingHorizontal : 20,
        marginLeft : -10,
    },
    profile : {
        marginTop : 40,
    },
    titleStyle : {
    fontSize : fontScale(21),
    fontWeight : '600',
    color : BLACK,
    marginBottom : 15,
    },
    textStyle : {
        fontSize : fontScale(14),
        fontWeight : '400',
        color : BLACK,
        lineHeight: fontScale(24), // ← 이게 핵심!
    },
    ActionAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //width: '100%',
  },

  //바텀시트 테스트
    content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});

export default FeedDetailScreen;