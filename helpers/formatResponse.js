function formatResponse(json) {
  delete json.password
  return { data: json };
}

module.exports = formatResponse;
