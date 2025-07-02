//API 호출용 라우터 생성(알라딘 api를 호출할 거임)
const express = require('express');
const axios = require('axios');
const router = express.Router();

//도서 검색 API
router.get('/search', async(req, res) => {
    const {query} = req.query; // ex. ?query=공중그네

    try{
        const response = await axios.get('http://www.aladin.co.kr/ttb/api/ItemSearch.aspx',{
            params:{
                ttbkey : process.env.ALADIN_TTBKEY,
                Query : query,
                QueryType : 'Title',
                SearchTarget : 'Book',
                Start : 1,
                MaxResults : 10,
                Output : 'JS',
                Version : 20131101,
            }
        });
        
        res.json(response.data); //프론트에 전달
    }catch(error){
        console.error('API Error: ', error);
        res.status(500).send('도서 API 호출 실패');
    }
});

//도서 상품 조회 API
router.get('/detail', async (req, res) => {
  const { isbn13 } = req.query;

  try {
    const response = await axios.get('http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx', {
      params: {
        ttbkey: process.env.ALADIN_TTBKEY,
        itemIdType: 'ISBN13',
        ItemId: isbn13,
        Output: 'JS',
        Version: '20131101',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Detail API Error:', error);
    res.status(500).send('도서 상세 정보 실패');
  }
});



module.exports = router;