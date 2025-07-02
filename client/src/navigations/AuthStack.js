//인증화면을 관리하는 네비게이터
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WHITE } from "../colors"
import SignInScreen from "../screens/Sign/SignInScreen"
import SignUpCheckScreen from "../screens/Sign/SignUpCheckScreen";
import SignUpFormScreen from "../screens/Sign/SignUpFormScreen";
import SignUpKeywordScreen from "../screens/Sign/SignUpKeywordScreen";
import SignUpTimerScreen from "../screens/Sign/SignUpTimerScreen";
import SignUpSuccessScreen from "../screens/Sign/SiginUpSuccessScreen";
import { AuthRoutes } from "./routes";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator
        screenOptions={{
            contentStyle: {backgroundColor: WHITE},
            headerShown: false, //헤더 감추기
        }}>
            <Stack.Screen name={AuthRoutes.SIGN_IN} component={SignInScreen}/>
            <Stack.Screen name={AuthRoutes.SIGN_UP_CHECK} component={SignUpCheckScreen}/>
            <Stack.Screen name={AuthRoutes.SIGN_UP_FORM} component={SignUpFormScreen}/>
            <Stack.Screen name={AuthRoutes.SIGN_UP_KEYWORD} component={SignUpKeywordScreen}/>
            <Stack.Screen name={AuthRoutes.SIGN_UP_TIMER} component={SignUpTimerScreen}/>
            <Stack.Screen name={AuthRoutes.SIGN_UP_SUCCESS} component={SignUpSuccessScreen}/>
        </Stack.Navigator>
    );
};

export default AuthStack;

