exports.handler = function (event, context, callback) {
  let secretContent = `
    <h1 style="color: lightblue; text-transform: uppercase; text-align:center;">welcom to the inner circle!</h1>
    <p style="font-style: italic;">in this little seminar you'll learn how to make 100k  a day, no previous knowledge required. just like <strong>butter</strong></p>
  `
  let body
  if (event.body) {
    body = JSON.parse(event.body)
  } else {
    body = {}
  }
  if (body.password == "javascript is cool!") {
    callback(null, {
      statusCode: 200,
      body: secretContent,
    })
  } else {
    callback(null, {
      statusCode: 401,
    })
  }
}
