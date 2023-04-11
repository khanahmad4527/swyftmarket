const sedngrid = require("@sendgrid/mail");
require("dotenv").config();

sedngrid.setApiKey(process.env.SENDGRID_API_KEY);

function sedngridSendEmail({ to, from, subject, text, html }) {
  const msg = { to, from, subject, text, html };

  return sedngrid.send(msg);
}

module.exports = { sedngridSendEmail };
