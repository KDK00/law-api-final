const axios = require('axios');
module.exports = async (req, res) => {
  const { query } = req.query;
  // target=law 로 법령 목록을 검색합니다.
  const url = `http://www.law.go.kr/DRF/lawSearch.do?OC=mentor0119&target=law&type=XML&query=${encodeURIComponent(query)}&display=10`;
  try {
    const response = await axios.get(url, { responseType: 'text' });
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ error: "법령 목록 API 호출 실패" });
  }
};