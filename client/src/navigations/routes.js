export const AuthRoutes = {
    SIGN_IN : 'SignIn', //로그인
    SIGN_UP_CHECK : 'SignUpCheck', //회원가입 약관 동의
    SIGN_UP_FORM : 'SignUpForm', //회원가입 폼
    SIGN_UP_KEYWORD : 'SignUpKeyword', //회원가입 키워드 조사
    SIGN_UP_TIMER : 'SignUpTimer', //회원가입 주간 목표 시간 설정
    SIGN_UP_SUCCESS : 'SignUpSuccess', //회원가입 성공 시 이동 
}

export const MainRoutes = {
    //HOME : 'Home', //로그인 시 이동되는 홈화면
    CONTENT_TAB : 'ContentTab',
    TIMER : 'Timer', //타이머 화면
    MISSION_STACK : 'MissionStack', //미션 스택
    FEED_STACK : 'FeedStack', //피드 스택
}

// 미션 스택
export const MissionRoutes = {
    MISSION : 'Mission', //미션글쓰기
    RANDOM_WORD : 'RandomWord', //랜덤 어휘 화면
    MISSION_COMP : 'MissionComp', //미션 종료 화면
}

//피드 스택
export const FeedRoutes = {
    FEED : 'Feed',
    FEED_DETAIL : 'FeedDetail',
}   

//바텀 내비게이터 사용
export const ContentRoutes = {
    HOME : 'Home', //홈화면
    FEED_HOME : 'FeedHome', //피드
    RECORD : 'Record', //독서기록
    MISSION_HOME : 'MissionHome', //미션글쓰기
    MYPAGE : 'Mypage', //마이페이지
}