//타이머 구현을 위한 커스텀 훅
import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef(); //최근에 들어온 callback을 저장할 ref

  useEffect(() => {
    savedCallback.current = callback; //callback이 바뀔 때마다 ref를 업데이트
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    //saveCallback.current() : callback 함수 실행
    return () => clearInterval(id); //unmount될 때 clearInterval 실행
  }, [delay]); //delay가 바뀔 때마다 새로 실행
}