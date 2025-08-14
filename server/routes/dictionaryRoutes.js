//사전 api 호출용 
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async(req, res) => {

    const {query} = req.query; //ex. ?query=나무

    try{
        const response = await axios.get('https://stdict.korean.go.kr/api/search.do',{
            params : {
                key : process.env.DICTIONARY_API_KEY,
                q : query,
                req_type : 'json',
            }
        });

        res.json(response.data); 

    }catch(error){
        console.error('API Error : ', error);
        res.status(500).send('사전 API search 호출 실패');
    }
});

router.get('/detail', async(req, res) => {

    const {target} = req.query; // target_code
    if(!target) return res.status(400).json({error: 'target(target_code) is required' });

    try{
        const response = await axios.get('https://stdict.korean.go.kr/api/view.do',{
            params : {
                key : process.env.DICTIONARY_API_KEY,
                method: 'target_code',
                req_type : 'xml',
                q : target,
            },
            timeout: 8000,
            // 서버가 content-type을 애매하게 줄 때를 대비
            validateStatus: s => s < 500,
            transformResponse: [data => data], // 무변환(문자 그대로 받기)
        });
         console.log('STDIC detail status:', response.status);
        console.log('STDIC detail ctype:', response.headers['content-type']);
        console.log('STDIC detail sample:', typeof response.data, String(response.data).slice(0, 200));


        res.json(response.data); 

    }catch(error){
        console.error('API Error : ', error);
        res.status(500).send('사전 API detail 호출 실패');
    }
});

module.exports = router;