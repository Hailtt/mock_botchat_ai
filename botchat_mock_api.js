const express = require("express");
const app = express();
const PORT = 4000;
const DATA_RESPONE = require("./botchat_model");
app.use(express.json());

app.post("/legal-chat/legalchatbot", async (req, res) => {
  try {
    const { request_id, question } = req.body;

    //Kiem tra du lieu tu FE
    if (!request_id || !question) {
      return res.status(400).json({
        code: 1,
        msg: "Thiếu request_id hoặc question",
        data: {},
        request_id: request_id || null,
      });
    }

    //Kiem tra data tu botchat
    if (!DATA_RESPONE) {
      return res.json({
        code: 2,
        msg: "Không xử lý",
        data: {},
        request_id: request_id,
      });
    }

    // get data
    const responeData = {
      code: 0,
      mgs: "Successful",
      request_id: request_id,
      data: {
        ...DATA_RESPONE,
        answer: `Câu trả lời cho câu hỏi: ${req.body.question} là: 
        - Thu nhập tính thuế (sau đây viết tắt là TNTT) = Thu nhập chịu thuế - Các khoản giảm trừ

        - Thu nhập chịu thuế bằng tổng số tiền lương, tiền công, tiền thù lao, các khoản thu nhập khác có tính chất tiền lương, tiền công trừ (-) Các khoản thu nhập được miễn thuế (đối với thu nhập từ tiền lương, tiền công).

        - Thuế suất: áp dụng theo Biểu thuế lũy tiến từng phần quy định tại khoản 2 Điều 7 Thông tư 111/2013/TT-BTC.

        - Số thuế thu nhập cá nhân được tính theo từng bậc thu nhập bằng thu nhập tính thuế của bậc thu nhập nhân (×) với thuế suất tương ứng của bậc thu nhập đó (hoặc có thể áp dụng theo Biểu tính thuế rút gọn bên dưới).`,
      },
    };

    // Trả về phản hồi
    return res.json(responeData);
  } catch (error) {
    res.json({
      code: 1,
      msg: "something went wrong !",
      data: {},
      request_id: req.body.request_id,
    });
  }
});

app.listen(PORT, () => {
  console.log(`BOTCHAT API is running on http://localhost:${PORT}`);
});
