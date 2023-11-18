const { GoogleSpreadsheet } = require('google-spreadsheet');
const dayjs = require('dayjs');

async function runSample() {
  // 스프레드시트 ID와 인증 정보 설정
  const doc = new GoogleSpreadsheet('1b9_q7A4kaY8hl7wAvvgqBRORd1gzHVezvtBNuhC4AGc');
  const creds = require('./centslabs-220618-e03b932fef78.json');

  // 구글 서버에 인증
  await doc.useServiceAccountAuth(creds);

  // 스프레드시트 불러오기
  await doc.loadInfo(); // 스프레드시트 정보 로드

  // 시트 선택
  const sheet = doc.sheetsByIndex[0]; // 첫 번째 시트를 선택하거나, 시트 이름으로도 선택 가능

  // 로우 로딩
  await sheet.loadCells('A1:J20'); // A1부터 B20까지의 셀 로딩

  // 출력을 위한 배열
  const valuesArray = [];

  // 각 행의 값을 배열에 추가
  for (let i = 0; i<20 ; i++) {
    const rowValues = [];
    for (let j = 0; j < 10; j++) {
      const cell = sheet.getCell(i, j);
      rowValues.push(cell.value);
    }
    valuesArray.push(rowValues);
  }

  const reqs = valuesArray.map(v => ({
    timestamp: dateConvert(v[0]),
    requester: v[1],
    email: v[2],
    partyName: v[3],
    startTime: v[4],
    endTime: v[5],
    empty: v[6],
    isCalnderAppendent: v[7],
    isSendEmail: v[8],
    isApproveParty: v[9],
  }));
  // 전체 배열 출력
  console.log('A1부터 J20까지의 값:', valuesArray);
  console.log(reqs);
}

runSample();

function dateConvert(timestamp){
    
// Convert Google Sheets timestamp to JavaScript Date object
const date = new Date((timestamp - 25569) * 86400 * 1000);

// Extract date components
const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is zero-based
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Output the formatted date and time
console.log(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}:${seconds}`);
var result = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}:${seconds}`;
return result;
}