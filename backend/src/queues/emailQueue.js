const Queue = require("bull");
const sendEmail = require("../utils/sendEmail");

const emailQueue = new Queue("emailQueue", {
  redis: { port: 6379, host: "127.0.0.1" },
}); // Specify Redis connection using object

emailQueue.process((job) => {
  sendEmail(job.data);
});

module.exports = emailQueue;
