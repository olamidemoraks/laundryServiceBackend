const attachCookiesToResponse = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: false,
    expires: new Date(Date.now() + oneDay),
    signed: true,
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = attachCookiesToResponse;
