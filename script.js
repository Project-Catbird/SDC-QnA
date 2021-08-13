import http from 'k6/http';
import { sleep } from 'k6';

export default function() {
  const randomNumber = Math.floor(Math.random() * 90000);
  http.get(`http://localhost:3000/api/qa/questions/?product_id=${randomNumber}&count=5`);
  sleep(1);
}