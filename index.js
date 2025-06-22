// index.js (백엔드 서버 코드)

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // 서버가 사용할 포트 번호

app.use(cors()); // CORS 허용
app.use(express.json()); // 클라이언트가 보낸 JSON 데이터를 파싱

// --- 데이터베이스 대신 사용할 임시 데이터 저장소 ---
let gameEvents = [];
let eventId = 1;

// --- API (서버의 기능) ---

// 1. 모든 기록을 가져오는 기능
app.get('/api/events', (req, res) => {
  console.log('GET 요청: 모든 기록 조회');
  res.json(gameEvents);
});

// 2. 새로운 기록을 저장하는 기능
app.post('/api/events', (req, res) => {
  const { pitcher, batter, result } = req.body; // 프론트엔드에서 보낸 정보
  
  if (!pitcher || !batter || !result) {
    return res.status(400).send('필수 정보가 누락되었습니다.');
  }

  const newEvent = {
    id: eventId++,
    pitcher,
    batter,
    result,
    timestamp: new Date().toISOString()
  };
  
  gameEvents.push(newEvent);
  console.log('POST 요청: 새로운 기록 추가', newEvent);
  res.status(201).json(newEvent); // 성공적으로 생성되었음을 알림
});

// 서버 실행
app.listen(port, () => {
  console.log(`백엔드 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});