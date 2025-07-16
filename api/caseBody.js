const axios = require('axios');

module.exports = async (req, res) => {
  const { id } = req.query;
  const url = `http://www.law.go.kr/DRF/lawService.do?OC=mentor0119&target=prec&type=XML&ID=${id}`;
  try {
    const response = await axios.get(url, { responseType: 'text' });
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ error: "API 호출 실패" });
  }
};