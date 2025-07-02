//실제 로그인 로직 처리

const pool = require('../config/db');

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '이메일과 비밀번호를 입력하세요.' });
  }

  const sql = 'SELECT * FROM dotusers WHERE u_email = ? AND u_passwd = ?';

  pool.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).json({ message: '서버 오류' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }

    const user = results[0]; //sql 명령어 결과의 첫번째 레코드를 가져옴
    res.json({ message: '로그인 성공', user });
  });
};