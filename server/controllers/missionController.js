//미션 저장
const pool = require('../config/db');

exports.createMissionPost = async (req, res) => {
    
    const { p_u_idx, p_type, p_subject, p_content } = req.body;

    if (!p_type || !p_subject || !p_content || !p_u_idx) {
        return res.status(400).json({ message: '필수 정보가 누락' });
    }

    //mission_post에 데이터 insert
    const insertPostSql = `
        INSERT INTO mission_post (p_u_idx, p_type, p_subject, p_content)
        VALUES (?, ?, ?, ?)
    `;

    pool.query(insertPostSql, [p_u_idx, p_type, p_subject, p_content], (err, result) => {
        if (err) {
            console.error('mission_post insert 오류:', err);
            return res.status(500).json({ message: '서버 오류로 인해 저장에 실패했습니다.' });
        }

        const p_idx = result.insertId; //해당 insert된 데이터의 primary key 값을 가져옴

        const insertStatsSql = `
            INSERT INTO mission_stats (s_p_idx, s_like, s_comment, s_hits)
            VALUES (?, 0, 0, 0)
        `;

        pool.query(insertStatsSql, [p_idx], (statErr) => {
            if (statErr) {
                console.error('mission_stats Insert 오류:', statErr);
                return res.status(500).json({ message: '통계 저장 실패' });
            }

            console.log('미션과 통계 모두 저장됨');
            res.json({ message: '저장 성공' });
        });
    });
};


//미션 글 목록 조회
exports.getMissionPosts = (req, res) => {
    const sql = `
    SELECT 
      a.p_idx,
      a.p_type,
      a.p_subject,
      a.p_content,
      a.p_created_at,
      b.s_like,
      b.s_comment,
      b.s_hits,
      c.u_idx,
      c.u_nicknm,
      c.u_profile
    FROM mission_post AS a
    LEFT JOIN mission_stats AS b ON a.p_idx = b.s_p_idx
    LEFT JOIN dotusers AS c ON a.p_u_idx = c.u_idx
    WHERE a.p_is_deleted = FALSE
    ORDER BY a.p_created_at DESC
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('DB 조회 오류:', err);
      return res.status(500).json({ message: '서버 오류로 인해 조회 실패' });
    }

    res.json(results);
  });
};