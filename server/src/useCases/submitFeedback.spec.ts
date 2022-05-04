import { SubmitFeedbackUseCase } from "./submitFeedback";

const createFeedbackSpy = jest.fn();
const CREATE_FEEDBACK_MOCK = {
  create: createFeedbackSpy,
};

const sendMailSpy = jest.fn();
const SEND_MAIL_MOCK = {
  sendMail: sendMailSpy,
};

const submitFeedback = new SubmitFeedbackUseCase(
  CREATE_FEEDBACK_MOCK,
  SEND_MAIL_MOCK
);

describe("Submit Feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should NOT be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();
  });

  it("should NOT be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();
  });

  it("should NOT be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Comment example",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
