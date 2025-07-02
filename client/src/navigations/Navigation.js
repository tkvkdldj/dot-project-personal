import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack"; //AuthStack을 NavigationContainer에 등록시켜주는 느낌..?
import { useUserState } from "../contexts/UserContext";
import MainStack from "./MainStack"; //로그인 성공 시 이동 -> CronTab을 컴포넌트 등록

const Navigation = () => {
    const [user] = useUserState();
    
    return(
        <NavigationContainer>
            {user?.u_email ? <MainStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

export default Navigation;