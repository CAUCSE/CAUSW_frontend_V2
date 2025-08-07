import { useState, useEffect } from 'react';

/**
 * 값의 변경을 지연시키는 Debounce 커스텀 훅
 * @param value 디바운싱할 값
 * @param delay 지연 시간 (밀리초 단위)
 * @returns 디바운싱된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  // 디바운싱된 값을 저장하기 위한 state
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // value가 변경되면, delay 이후에 debouncedValue를 업데이트하는 타이머를 설정합니다.
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // 다음 effect가 실행되기 전에 이전 타이머를 정리(취소)합니다.
      // 사용자가 delay 시간 내에 계속 타이핑하면 이전 타이머는 취소되고 새 타이머가 설정됩니다.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // value 또는 delay가 변경될 때만 이 effect를 다시 실행합니다.
  );

  return debouncedValue;
}
