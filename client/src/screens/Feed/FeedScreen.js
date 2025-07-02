//피드 화면
import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, FlatList } from "react-native";
import SearchField from "../../components/Feed/SearchField";
import { WHITE, PRIMARY, BLACK, GRAY} from "../../colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import FilterButton from "../../components/Feed/FilterButton";
import FilterFollowers from "../../components/Feed/FilterFollowers";
import ArrayPost from "../../components/Feed/ArrayPost";
import PostCard from "../../components/Feed/PostCard";
import InputFAB from "../../components/Feed/InputFAB";
import { MainRoutes } from "../../navigations/routes";

import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import { Modalize } from 'react-native-modalize';
import TextButton from "../../components/Common/TextButton";
import FilterModal from "../../components/Feed/FilterModal";

import missionFeedStore from "../../store/missionFeedStore";


const FeedScreen = () => {
    const { top, bottom } = useSafeAreaInsets();
    const { width, height } = Dimensions.get('window'); //기기의 가로, 세로(상단바, 하단바 포함)
    const sidePadding = 10;
    const tabWidth = ((width - sidePadding * 2) / 2);
    
    //미션 컴플릿 후 이동
    const route = useRoute();
    const navigation = useNavigation();

    //초기화면 진입 시 탭설정
    const [selectedTab, setSelectedTab] = useState('자유');
    //카테고리 선택 여부
    const [activeCategory, setActiveCategory] = useState(null);

    const [lastTab, setLastTab] = useState('자유'); // 전 탭 기록
    const [justRedirected, setJustRedirected] = useState(false);

    //미션 포스트 띄우기
    const [missionPosts, setMissionPosts] = useState([]);


    //카테고리 모달
    const { height: SCREEN_HEIGHT } = Dimensions.get('window');

    const TAB_MARGIN = SCREEN_HEIGHT * 0.02;
    const BUTTON_MARGIN = SCREEN_HEIGHT * 0.035;

   //모달 ref
    const modalRef = useRef(null);
    const [categoryTab, setCategoryTab] = useState('카테고리'); // 초기 탭 설정

    // 모달 열기
    const openModal = () => {
        modalRef.current?.open();
    };  

    const {
        forceMission,
        fromMissionType,
        resetFeedFlags,
    } = missionFeedStore();
                    
    useFocusEffect(
    useCallback(() => {
        /*
        if (forceMission) {
        setSelectedTab('미션');

        if (fromMissionType) {
            setActiveCategory(fromMissionType);
        }

        setJustRedirected(true);
        resetFeedFlags(); // 한 번 적용하고 초기화
        }*/
        if (forceMission) {
        setSelectedTab('미션');
        if (fromMissionType) setActiveCategory(fromMissionType);   // ← 여기만 씀
        setJustRedirected(true);
        }
        resetFeedFlags();
        
    }, [forceMission])
    );

    /*
   useFocusEffect(
        useCallback(() => {
            if (route.params?.forceMission) {
                setSelectedTab('미션');

                if (route.params?.fromMissionType) {
                    setActiveCategory(route.params.fromMissionType);  // 카테고리도 저장
                }
                // 리다이렉션 직후임을 표시
                setJustRedirected(true);

                navigation.setParams({ 
                    forceMission: undefined, 
                    fromMissionType : undefined,
                });
            }
            // 첫 진입 외에는 상태 유지
        }, [route.params?.forceMission])
    );
*/
    // 다른 화면 갔다 돌아오면 초기화
    useFocusEffect(
        useCallback(() => {
            return () => {
            setActiveCategory(null);
            };
        }, [])
    );

    useEffect(() => {
        if (selectedTab !== lastTab) {
            if (justRedirected) {
            // 리다이렉션 후 탭 전환이면 초기화 하지 않음
                setJustRedirected(false);
            } else {
            // 일반적인 탭 전환이면 초기화
            setActiveCategory(null);
            }
            setLastTab(selectedTab);
        }
    }, [selectedTab]);

    useEffect(() => {
        if (selectedTab === '미션') {
            const fetchMissionPosts = async () => {
                try {
                    const res = await axios.get('http://localhost:3000/api/mission-post/view');
                    setMissionPosts(res.data); // 불러온 데이터를 상태로 저장

                    //console.log(res.data);

                } catch (err) {
                    console.error('피드 데이터 불러오기 실패:', err);
                }
            };

            fetchMissionPosts();
        }
    }, [selectedTab]);


    const dummyPosts2 = [
    {
        id: '1',
        profileUri: 'cute',
        nickname: '헤징',
        userId: 'hyeji1111',
        hashtag: '심리학',
        title: '어른들을 위한 심리학',
        text: '안녕! 오늘은 심리학 책을 추천해 주려고 해~ 한 권의 책을 깊이 읽고 내 마음과 마주하는 시간은 특별한 경험이잖아? 특히 그게 내 자신을 조금 더 이해하게 만드는 방법인 것 ',
        heart: 12,
        comment: 12,
        hits: 12,
        time: 26,
        imageKeys : ['feed1','feed2','feed3','feed4'],
    },
    {
        id: '2',
        profileUri: 'star',
        nickname: '빛나는별',
        userId: 'starkim',
        hashtag: '심리학',
        title: '공포 소설 추천해 줄 수 있을까?',
        text: '아가사 크리스티 책 좋아해! 추리 기반 공포 소설도 좋아하고 고어한 것도 괜찮아~일본 소설은 딱히 취향이 아닌 것 같지만 추천해 주면 감사히 읽을게ㅎㅎ 아래는 내가 추천하는 책들이야',
        heart: 10,
        comment: 3,
        hits: 45,
        time: 26,
        imageKeys : ['feed5','feed6','feed7','feed8'],
    },
    ];

    const category_options = ['100일 글쓰기','타임어택 글쓰기','랜덤 어휘 글쓰기','랜덤 고전 문장 글쓰기'];
    const subcategory_options = ['좋아하는 책','좋아하는 영화','싫어하는 영화','최초의 기억','가장 행복했던 기억','좋아하는 문장','SNS'];
    const genre_options = ['소설','시','비평문','에세이'];
    const period_options = ['오늘','이번 주','이번 달','이번 년'];

    const renderContent = {
    //'카테고리': <FilterModal options={category_options} />,
    '카테고리': (
    <FilterModal
      options={category_options}
      defaultSelected={
        activeCategory === '랜덤어휘' ? ['랜덤 어휘 글쓰기'] : []
      }
    />
  ),
    '세부 카테고리': <FilterModal options={subcategory_options} />,
    '장르': <FilterModal options={genre_options} />,
    '기간': <FilterModal options={period_options} />,
    };
   return( 
        <View style={[styles.container, {paddingTop : top}]}>
            
            {/* 검색 영역 */}
            <View style={{marginBottom : 20}}>
            <SearchField/>
            </View>

            {/* 탭 ui */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginTop: 10,
                    paddingHorizontal: sidePadding,
                }}
                >
                {['자유', '미션'].map((tab) => {
                    const isActive = selectedTab === tab;

                    return (
                    <Pressable
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                        style={{
                        alignItems: 'center',
                        width: tabWidth,
                        }}
                    >
                        <Text
                        style={{
                            color: isActive ? BLACK : PRIMARY.LIGHT,
                            fontWeight : '600',
                            fontSize: 16,
                            paddingBottom : 10,
                        }}
                        >
                        {tab}
                        </Text>
                        <View
                        style={{
                            height: 2,
                            width: tabWidth * 0.9,
                            backgroundColor: isActive ? 'black' : PRIMARY.LIGHT,
                            marginTop: 4,
                        }}
                        />
                    </Pressable>
                    );
                })}
                </View>

            {/* 조건부 렌더링 */}
            <View style={{ paddingVertical : 10 }}>
            {selectedTab === '자유' ? (  
                <>
                <View style={{ height: 42, overflow: 'hidden', marginBottom: 4 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{
                alignItems: 'center',
                
                }}
            >

            <FilterButton
                title={"카테고리"}
                onPress={()=>{}}
            />
            <FilterButton
                title={"세부 카테고리"}
                onPress={()=>{}}
            />
            <FilterButton
                title={"장르"}
                onPress={()=>{}}
            />
            <FilterButton
                title={"작성 시기"}
                onPress={()=>{}}
            />
            </ScrollView>
            </View>

           
            <View style={styles.postOrder}>
                <FilterFollowers
                    onPress={()=>{}}
                />
                <ArrayPost
                    onPress={()=>{}}
                />
            </View>

               <FlatList
                    data={dummyPosts2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <PostCard
                        profileUri={item.profileUri}
                        nickname={item.nickname}
                        userId={item.userId}
                        hashtag={item.hashtag}
                        title={item.title}
                        text={item.text}
                        heart={item.heart}
                        comment={item.comment}
                        hits={item.hits}
                        time={"26분 전"}
                        imageKeys={item.imageKeys}
                        onPress={
                            ()=>navigation.navigate(
                              MainRoutes.FEED_STACK, { screen : 'FeedDetail',}
                            )
                        }
                    />
                    )}
                    contentContainerStyle={{ //전체 목록을 감쌈
                        paddingBottom: bottom + 150//하단 여백 확보
                    }}
                    showsVerticalScrollIndicator={false}
                    
                />
                </>
            ) : (
                <>
            <View style={{ height: 42, overflow: 'hidden', marginBottom: 4 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{
                alignItems: 'center',
                
                }}
            >

            <FilterButton
                title={activeCategory === '랜덤어휘' ? '랜덤어휘' : '카테고리'}
                styles={
                    activeCategory === '랜덤어휘'
                    ? {
                        button: { backgroundColor: BLACK },
                        text: { color: WHITE, fontWeight: '600' },
                        icon: { color: WHITE },
                        }
                    : undefined
                }
                onPress={() => {
                    // 필터 버튼 클릭 시 activeCategory 초기화 or 변경
                    //setActiveCategory(null);
                    openModal();
                }}
            />
            <FilterButton
                title={"세부 카테고리"}
                onPress={()=>{}}
            />
            <FilterButton
                title={"장르"}
                onPress={()=>{}}
            />
            <FilterButton
                title={"작성 시기"}
                onPress={()=>{}}
            />
            </ScrollView>
            </View>

           
            <View style={styles.postOrder}>
                <FilterFollowers
                    onPress={()=>{}}
                />
                <ArrayPost
                    onPress={()=>{}}
                />
            </View>

                 <FlatList
                    data={missionPosts}
                    keyExtractor={(item) => item.p_idx.toString()}
                    renderItem={({ item }) => {
                    const timeAgo = formatDistanceToNow(new Date(item.p_created_at), {
                        addSuffix: true,
                        locale: ko,
                    });

                    return (
                        <PostCard
                        profileUri={item.u_profile}
                        nickname={item.u_nicknm}
                        userId="temporary"
                        hashtag={item.p_type}
                        title={item.p_subject}
                        text={item.p_content}
                        heart={item.s_like}
                        comment={item.s_comment}
                        hits={item.s_hits}
                        time={timeAgo}
                        />
                    );
                    }}

                    ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: GRAY.DEFAULT, fontSize: 15, marginTop : 30}}>첫 번째 글을 작성해보세요!</Text>
                    </View>
                    }
                    contentContainerStyle={{
                        paddingBottom: bottom+50,
                        flexGrow: 1, // <= 이것도 중요: ListEmptyComponent가 전체 높이 차지하도록
                    }}
                    showsVerticalScrollIndicator={false}
                />
            
                </>
                
            )}
            </View>  

            {/* 플로팅 버튼 */}
           
            <InputFAB/>

            {/* 모달 ui */}
            <Modalize
            ref={modalRef}
            overlayStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
            }}
            modalHeight={400}
            scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
            modalStyle={{ 
                paddingVertical: BUTTON_MARGIN,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            }}
            handleStyle={{ display : 'none' }}
            onClosed={() => setCategoryTab('카테고리')} //모달을 나왔을 경우 selectedTab 초기화
            >

            <View style={{alignItems : 'flex-end'}}>
            <TextButton
              title="적용"
              onPress={()=>{
              modalRef.current?.close();
              }}
              styles={{
                button: { marginRight: 20 }, // 위치 조정
                title: { color: BLACK, fontWeight :'600'},
                }}
            />
            </View>
            
            {/* 탭 컨텐츠영역 */}
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems : 'center',
                marginTop: 15,
                marginBottom: TAB_MARGIN,
                paddingHorizontal : 20,
            }}
            >
            {['카테고리','세부 카테고리','장르','기간'].map((tab) => {
                const isActive = categoryTab === tab;
                const underlineWidthMap = {
                '카테고리': 70,
                '세부 카테고리': 100,
                '장르' : 40,
                '기간' : 40,
                };

                return (
                <Pressable
                    key={tab}
                    onPress={() => setCategoryTab(tab)}
                    style={{ 
                        marginRight: 20, 
                        alignItems: 'center', 
                        width: underlineWidthMap[tab] 
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: isActive ? BLACK : PRIMARY.LIGHT,
                            fontWeight : '600',
                            fontSize: 16,
                            marginBottom : 3,
                            lineHeight : 18,
    
                        }}
                    >
                    {tab}
                    </Text>
                        <View
                        style={{
                            height: 2,
                            width: underlineWidthMap[tab],
                            backgroundColor: isActive ? BLACK : PRIMARY.LIGHT,
                            marginTop: 4,
                        }}
                        />
                    </View>
                </Pressable>
                );
            })}
            </View>

            {/* 조건부 렌더링 */}
            <View style={{ paddingHorizontal: 20 }}>
            {renderContent[categoryTab] ?? <Text>잘못된 탭</Text>}
            </View>
            
        </Modalize>   
           
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        //justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : WHITE,
        paddingHorizontal : 15,
    },
    postOrder : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingHorizontal : 5,
        width : '100%',
    },

});

export default FeedScreen;