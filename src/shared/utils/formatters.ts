/**
 * 입력된 문자열을 010-xxxx-xxxx 반환
 */
export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.startsWith('010')) {
    const formatted = cleaned.substring(0, 11);
    const match = formatted.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
  }
  return cleaned.substring(0, 11);
};
