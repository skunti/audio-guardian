
module.exports = {
  logLatency: function(requestParams, response, context, next) {
    const latency = response.timings.response;
    
    if (latency > 400) {
      console.log(`⚠️ High latency detected: ${latency}ms for ${requestParams.url}`);
    }
    
    return next();
  },
  
  validateResponse: function(requestParams, response, context, next) {
    if (response.statusCode >= 400) {
      console.log(`❌ Error response: ${response.statusCode} for ${requestParams.url}`);
    }
    
    return next();
  }
};
