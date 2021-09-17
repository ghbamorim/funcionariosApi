/*não está funcionando */

const http = require("http");

exports.handler = async (event) => {
  try {
    let func = event && event.body && JSON.parse(event.body);

    return httprequest(func).then((data) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(data),
      };
      return response;
    });
  } catch (err) {
    const message = err.message;
    console.log(message);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
    return response;
  }
};

function httprequest(data) {
  return new Promise((resolve, reject) => {
    const options = {
      host: "3.129.218.243",
      path: `/funcionarios/new`,
      port: 3001,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };
    const req = http.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error("statusCode=" + res.statusCode));
      }
      let body = [];
      res.on("data", function (chunk) {
        body.push(chunk);
      });
      res.on("end", function () {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });
    req.on("error", (e) => {
      reject(e.message);
    });
    req.write(data);
    req.end();
  });
}
