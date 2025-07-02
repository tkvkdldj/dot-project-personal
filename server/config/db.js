/* mysql 연결 설정 */

// server/config/db.js
const mysql = require('mysql2');

// .env 파일에 있는 DB 설정값을 불러오기 위해 dotenv 사용
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, //데이터베이스 주소
  user: process.env.DB_USER, //로그인 계정
  password: process.env.DB_PASSWORD, //패스워드
  database: process.env.DB_NAME, //액세스할 데이터베이스
  waitForConnections: true, //커넥션 풀이 꽉 찼을 때 커넥션이 날 때까지 기다림
  connectionLimit: 10, //최대 동시 연결 수 설정
  queueLimit: 0, //풀에 여유가 없을 때 대기할 수 있는 요청수 (개발 환경시 0, 실배포시 조정)
});

module.exports = pool;