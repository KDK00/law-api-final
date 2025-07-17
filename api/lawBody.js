const axios = require('axios');
module.exports = async (req, res) => {
  const { mst } = req.query; // 법령은 MST 값을 받습니다.
  const url = `http://www.law.go.kr/DRF/lawService.do?OC=mentor0119&target=law&type=XML&MST=${mst}`;
  try {
    const response = await axios.get(url, { responseType: 'text' });
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ error: "법령 본문 API 호출 실패" });
  }
};