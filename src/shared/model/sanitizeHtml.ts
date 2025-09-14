import DOMPurify, { type Config } from 'dompurify';
import { JSDOM } from 'jsdom';

export const sanitizeHtml = (html: string, options?: Config) => {
  return DOMPurify(new JSDOM('<!DOCTYPE html>').window).sanitize(html, options);
};
