import {Dimensions, PixelRatio } from 'react-native';

// 기기 화면 크기 가져오기
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 기준 화면 크기 (보통 iPhone 12/13 기준)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const fontScale = (size) => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  const newSize = size * scale;
  return Math.max(12, PixelRatio.roundToNearestPixel(newSize)); // 최소 12px 보장
};