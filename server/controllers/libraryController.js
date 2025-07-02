const pool = require('../config/db');

exports.getUserLibrary = (req, res) => {
  const userIdx = req.query.u_idx; // 쿼리 파라미터로 받아옴

  if (!userIdx) {
    return res.status(400).json({ message: '사용자 ID가 누락되었습니다.' });
  }

  const sql = 'SELECT * FROM mylibrary WHERE m_u_idx = ? ORDER BY m_idx ASC';

  pool.query(sql, [userIdx], (err, results) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).json({ message: '서버 오류' });
    }

    res.json({ books: results });
  });
};
