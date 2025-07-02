import { StatusBar } from 'expo-status-bar';
import Navigation from './navigations/Navigation';
import { UserProvider } from './contexts/UserContext';
import { TimerProvider } from './contexts/TimerContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import PointToast from './components/Common/PointToast';

const toastConfig = {
    customPoint : ({text1}) => <PointToast text1={text1}/>,
};

const App = () => {
    return(
            <GestureHandlerRootView style={{ flex: 1 }}>  
                <UserProvider>
                    <TimerProvider>     
                        <StatusBar style="dark"></StatusBar>
                        <Navigation/>
                        <Toast config={toastConfig}/>
                    </TimerProvider>
                </UserProvider>
            </GestureHandlerRootView>
    );
};

export default App;