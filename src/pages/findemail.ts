import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  email?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { studentId, name, phoneNumber } = req.body;

    // 서버와의 통신 예제입니다. 실제로는 데이터베이스를 조회하는 로직을 구현해야 합니다.
    // 여기서는 예시로 고정된 데이터를 반환합니다.
    if (studentId === '20219999' && name === '민세원' && phoneNumber === '01031052042') {
      res.status(200).json({ email: 'nvpz1598@cau.ac.kr' });
    } else {
      res.status(404).json({
        message: '해당 사용자를 찾을 수 없습니다.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}