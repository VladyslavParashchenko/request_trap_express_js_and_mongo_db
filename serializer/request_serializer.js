function serializeObject (object) {
  let { cookie, headers, request_schema, method, query_params, remote_ip, query_string, trap_id, createdAt } = object;
  return { cookie, headers, request_schema, method, query_params, remote_ip, query_string, trap_id, createdAt };
}

function serializeCollection (objects) {
  return objects.map((object) => {
    return serializeObject(object);
  });
}

module.exports = { serializeCollection, serializeObject };
