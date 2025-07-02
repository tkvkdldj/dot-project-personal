/* 전체 앱에 라우터 등록 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes'); //로그인 api
const libraryRoutes = require('./routes/libraryRoutes'); //독서기록 내 서재 불러오기 api
const readLogsRoutes = require('./routes/readLogsRoutes'); //독서로그에 저장시키기 api
const readStatRoutes = require('./routes/readStatsRoutes'); //독서 누적 시간 불러오기 api
const missionRoutes = require('./routes/missionRoutes'); //미션 글 저장하기

const openaiRoutes = require('./routes/openaiRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//openAI 호출
app.use('/api/openai', openaiRoutes);

//미션 글 저장하기
app.use('/api/mission-post', missionRoutes);

//독서 누적 시간 불러오기
app.use('/api/read-stats', readStatRoutes);

//독서로그 저장하기
app.use('/api/read-logs', readLogsRoutes);

//내 서재 불러오기
app.use('/api/library', libraryRoutes);

//도서 검색
app.use('/api/books', bookRoutes);

//로그인
app.use('/api', authRoutes);


//루트 테스트 라우터
app.get('/', (req, res) => {
    res.send('server is running!');
});

//DB 연결 테스트용 라우터
app.get('/db-test', (req, res) => {
    pool.query('SELECT 1', (err, results) => {
        if (err){
            console.error('DB Error : ', err);
            return res.status(500).send('DB connection Failed!');
        }
        res.send('DB Connection Sucessed!');
    });
});

//서버 시작
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

