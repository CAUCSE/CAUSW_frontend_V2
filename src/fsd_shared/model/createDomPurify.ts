import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export const createDomPurify = () => {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);
  return purify;
};
