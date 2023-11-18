const { SolapiMessageService } = require('solapi');
const dotenv = require('dotenv');
dotenv.config();

const client = new SolapiMessageService(process.env.SOL_API_KEY, process.env.SOL_API_SECRET);
const code = '01500050001';
const adminPhone = '01054845103';
const searchId = 'dlcwjh';

// 연동 작업 중
// (async () => {
//   const res = await client.createKakaoChannel({
//     searchId,
//     phoneNumber: adminPhone,
//     categoryCode: code,
//     token: '900628',
//   });
//   console.log({ res });
// })();


/**
 * 카카오톡 알림톡 발송 모듈
 */
const KakaotalkService = {
  /**
   * 단일 대상에게 예약 알림톡을 발송합니다
   * @param to 대상자
   * @param metadata @type {startDate:string;endDate:string;name:string;phone:string;}
   */
  sendReservationMessageOne(to, metadata) {
    client.send({
      to,
      from: '01054845103',
      text: createReservationRequestTemplate(metadata),
    })
  }
};

const SmsService = {
  /**
   * 단일 대상에게 예약 알림톡을 발송합니다
   * @param to 대상자
   * @param metadata @type {startDate:string;endDate:string;name:string;phone:string;}
   */
  sendReservationMessageOne(to, metadata) {
    client.send({
      to,
      from: '01054845103',
      text: createReservationRequestTemplate(metadata),
    })
  }
};

/**
 * @param metadata @type {startDate:string;endDate:string;name:string;phone:string;}
 * @returns {`
  [파티룸 예약 요청]\n
  새로운 파티룸 예약 요청이 신청되었습니다.
  신청 기간: ${string} ~ ${string}
  신청자: ${string}
  신청자 휴대번호: ${*}
  `}
 */
const createReservationRequestTemplate = metadata =>
  `
  [파티룸 예약 요청]\n
  새로운 파티룸 예약 요청이 신청되었습니다.
  신청 기간: ${metadata.startDate} ~ ${metadata.endDate}
  신청자: ${metadata.name}
  신청자 휴대번호: ${metadata.phone}
  `;

module.exports = { KakaotalkService, SmsService };
