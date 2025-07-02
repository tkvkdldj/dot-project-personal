import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TextButton from '../../components/Common/TextButton';
import Button from '../../components/Common/Button';
import { PRIMARY, GRAY, WHITE } from '../../colors';
import { AuthRoutes } from '../../navigations/routes';

const SignUpCheckScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  const [agreements, setAgreements] = useState({
    terms: false, // 수집 이용 안내 
    thirdParty: false, // 3자 제공
    service: false, //서비스 이용 약관
  });

 const [expandedSections, setExpandedSections] = useState({
  terms: false,
  thirdParty: false,
  service: false,
});

  const allChecked = Object.values(agreements).every(Boolean);

  const handleViewToggle = (key) => {
  setExpandedSections((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

  const handleAgreementChange = (key) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAllAgree = () => {
    const newValue = !allChecked;
    setAgreements({
      terms: newValue,
      thirdParty: newValue,
      service: newValue,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      {/* 왼쪽 상단 '<' 버튼 */}
      <View style={styles.header}>
        <TextButton
          title="〈"
          onPress={() => navigation.navigate(AuthRoutes.SIGN_IN)}
          styles={{ title: styles.backButton }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logo}>DOT</Text>
        <Text style={styles.welcome}>DOT에 오신 걸 환영합니다</Text>
        <Text style={styles.subText}>
          DOT을 이용하기 위해선{'\n'}
          약관 동의가 필요합니다. 약관에 동의하시고{'\n'}
          즐거운 DOT 생활을 해보세요.
        </Text>

        {/* 약관 체크 항목 */}
        <View style={styles.agreementList}>
          <CheckBoxItem
            label="(필수) 개인정보 수집 및 이용 안내"
            checked={agreements.terms}
            onPressView={() => handleViewToggle('terms')}
            onPressCheck={() => handleAgreementChange('terms')}
            isExpanded={expandedSections.terms}
            content="이 약관은 사용자의 개인정보를 수집하고, 이용하는 목적과 관련된 내용입니다..."
          />
          <CheckBoxItem
            label="(필수) 개인정보 제 3자 제공 동의"
            checked={agreements.thirdParty}
            onPressView={() => handleViewToggle('thirdParty')}
            onPressCheck={() => handleAgreementChange('thirdParty')}
            isExpanded={expandedSections.thirdParty}
            content="개인정보가 제3자에게 제공될 수 있으며 제공 목적 및 항목 등은 다음과 같습니다..."
          />
          <CheckBoxItem
            label="(필수) 서비스 이용약관"
            checked={agreements.service}
            onPressView={() => handleViewToggle('service')}
            onPressCheck={() => handleAgreementChange('service')}
            isExpanded={expandedSections.service}
            content="이용자는 본 서비스 이용 시 회사가 정한 규칙에 동의하게 됩니다..."
          />
        </View>

        {/* 전체 동의 */}
        <View style={styles.allAgreeSection}>
          <CheckBoxItem
            label="전체동의"
            checked={allChecked}
            onPressView={() => {}}
            onPressCheck={handleAllAgree}
            newStyles={{label : {fontWeight:'bold'}}}
            showViewButton={false}
          />
        </View>
      </ScrollView>
      {/* 다음 버튼 */}
        
        <Button
          title="다음"
          onPress={() => navigation.navigate(AuthRoutes.SIGN_UP_FORM)}
          disabled={!allChecked}
          styles={{ container : {paddingHorizontal: 45, marginBottom:40}}}
        />
        
    </View>
  );
};

const CheckBoxItem = ({ label, checked, onPressView, onPressCheck, newStyles, isExpanded, content,
  showViewButton = true, // 기본값 true
 }) => {
  return (
     <View style={styles.itemRowWrapper}>
      <View style={styles.itemRow}>
        <TextButton
          title={checked ? '●' : '○'}
          onPress={onPressCheck}
          styles={{ title: styles.circle }}
        />
        <Text style={[styles.label, newStyles?.label]}>{label}</Text>

        {showViewButton && (
          <TextButton
            title="보기"
            onPress={onPressView}
            styles={{ title: styles.viewText }}
          />
        )}
      </View>

      {isExpanded && (
        <Text style={styles.expandedText}>{content}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 100, // 하단 버튼이 안 가려지도록 여유 공간 확보
  },

  fixedButtonWrapper: {
    position: 'absolute',
     bottom: 20,
    left: 20,
    right: 20,
  },


  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    fontSize: 24,
    color: GRAY.DARK,
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  logo: {
    paddingTop : 40,
    fontSize: 80, 
    fontWeight: 'regular', 
    color: PRIMARY.DEFAULT, 
    marginBottom: 10,
    textAlign : 'center',
  },
  welcome: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 12,
    textAlign: 'center',
    color: GRAY.DARK,
    marginBottom: 30,
  },
  agreementList: {
    paddingTop : 20,
    gap: 25,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    fontSize: 20,
    marginRight: 10,
    //paddingTop : 10,
    color: GRAY.DARK,
  },
  label: {
    flex: 1,
    marginBottom : 10,
    fontSize: 16,
    color: GRAY.DARK,
  },
  viewText: {
    fontSize: 14,
    color: GRAY.DARK,
    marginBottom : 5,
    textDecorationLine: 'underline',
  },
  allAgreeSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: GRAY.DARK,
  },
  itemRowWrapper: {
    marginTop: 0,
  },
  expandedText: {
    fontSize: 12,
    color: GRAY.DARK,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 6,
    marginLeft: 30,
    marginTop: 5,
    lineHeight: 18,
  },

});

export default SignUpCheckScreen;
