const pool = require('../config/db');

exports.createReadLog = (req, res) => {
  const { r_u_idx, r_m_idx, r_duration, r_pages, r_review } = req.body;
  
  //필수값 검증
  if (!r_u_idx || !r_m_idx || r_duration === undefined || r_pages === undefined) {
    return res.status(400).json({ message: '필수 정보가 누락' });
  }

  const sql = `
    INSERT INTO reading_logs (r_u_idx, r_m_idx, r_duration, r_pages, r_review)
    VALUES (?, ?, ?, ?, ?)
  `;

  pool.query(sql, [r_u_idx, r_m_idx, r_duration, r_pages, r_review], (err, result) => {
    if (err) {
      console.error('DB Insert 오류:', err);
      return res.status(500).json({ message: '서버 오류로 인해 저장에 실패했습니다.' });
    }

    // 쿼리 성공 후 조건 분기
    if (r_duration >= 5) {
      return res.status(201).json({
        message: '저장 성공 및 포인트 지급',
        point: 3,
        insertId: result.insertId,
      });
    } else {
      return res.status(201).json({
        message: '저장 성공 (포인트 없음)',
        point: 0,
        insertId: result.insertId,
      });
    }
  });
};

