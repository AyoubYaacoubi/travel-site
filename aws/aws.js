exports.handler = function (event, context, callback) {
  let secretContent = `
    <h1>welcom to the inner circle!</h>
    <p>in this little seminar you'll learn how to make 100 dolor a seconde just like <strong>butter</strong></p>
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
