const axios = require('axios');
const xml2js = require('xml2js');

module.exports = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        // 1. 법령 목록과 판례 목록을 동시에 검색
        const lawSearchUrl = `http://www.law.go.kr/DRF/lawSearch.do?OC=mentor0119&target=law&type=XML&query=${encodeURIComponent(query)}&display=1`;
        const caseSearchUrl = `http://www.law.go.kr/DRF/lawSearch.do?OC=mentor0119&target=prec&type=XML&query=${encodeURIComponent(query)}&display=1`;

        const [lawListResponse, caseListResponse] = await Promise.all([
            axios.get(lawSearchUrl, { responseType: 'text' }),
            axios.get(caseSearchUrl, { responseType: 'text' })
        ]);

        const parser = new xml2js.Parser({ explicitArray: false });
        const lawListJson = await parser.parseStringPromise(lawListResponse.data);
        const caseListJson = await parser.parseStringPromise(caseListResponse.data);

        // 2. 모든 결과를 하나로 합쳐서 반환
        const finalResult = {
            lawSearchResult: lawListJson,
            caseSearchResult: caseListJson,
        };

        res.status(200).json(finalResult);

    } catch (error) {
        res.status(500).json({ error: "통합검색 호출 실패", details: error.message });
    }
};