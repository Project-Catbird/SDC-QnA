import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '20s', target: 100 },
    { duration: '60s', target: 100 },
    { duration: '20s', target: 0 },
  ],
};

export default function() {
  const randomNumber = Math.floor(Math.random() * 90000);
  http.get(`http://localhost:3000/api/qa/questions/?product_id=${randomNumber}&count=5`);
  sleep(1);
  http.get(`http://localhost:3000/api/qa/questions/${randomNumber}/answers/`);
  sleep(1);
}