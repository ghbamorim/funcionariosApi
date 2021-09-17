const http = require("http");

exports.handler = async (event) => {
  try {
    let id = event.queryStringParameters && event.queryStringParameters.id;

    return httprequest(id).then((data) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(data),
      };
      return response;
    });
  } catch (err) {
    const message = err.message;
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
    return response;
  }
};

function httprequest(id) {
  return new Promise((resolve, reject) => {
    const options = {
      host: "3.129.218.243",
      path: `/funcionarios/query_by_id?id=${id}`,
      port: 3001,
      method: "GET",
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
    req.end();
  });
}
