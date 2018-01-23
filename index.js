const https = require('https');

const createResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body
  }
};

const filter = function (buffer) {
  const result = JSON.parse(buffer);
  if (result.Success !== true) {
    return [];
  }

  const data = result.Data;
  return data.filter(item => item.Volume > 0);
};

exports.handler = (event, context, callback) => {
  https.get('https://www.cryptopia.co.nz/api/GetMarkets', (res) => {
    const data = [];
    console.log('statusCode: ' + res.statusCode);
    console.log('headers: ' + res.headers);

    res.on('data', (chunk) => {
      console.log('received: ' + chunk);
      data.push(chunk);
    }).on('end', function () {
      const buffer = Buffer.concat(data);
      console.log('buffer: ' + buffer);
      callback(null, createResponse(200, filter(buffer)));
    });
  }).on('error', (e) => {
    console.error('error: ' + e);
    callback(null, createResponse(500, null));
  });
};
