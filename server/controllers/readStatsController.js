const pool = require('../config/db');

//사용자가 접속한 시간과 비교해서 누적 시간 불러오기
exports.getTodayDuration = (req, res) => {
  const userIdx = req.query.u_idx;

  if (!userIdx) {
    return res.status(400).json({ message: '사용자 ID가 누락' });
  }

  const sql = `
    SELECT SUM(r_duration) AS totalDuration
    FROM reading_logs
    WHERE r_u_idx = ?
      AND DATE(r_created_at) = CURDATE()
  `;

  pool.query(sql, [userIdx], (err, results) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).json({ message: '서버 오류' });
    }

    const totalDuration = results[0].totalDuration || 0;
    res.json({ totalDuration });
  });
};

//현재 날짜,요일 불러오기
exports.getServerDateInfo = (req, res) => {
  const now = new Date(); // Node.js 서버 기준 시간
  const daysKor = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  //const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekday = daysKor[now.getDay()];

  const formattedDate = `${month}월 ${String(day).padStart(2, '0')}일`;

  res.json({
    date: formattedDate,
    weekday: weekday,
  });
};

