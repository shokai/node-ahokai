
exports.merge = function(base, hash){
  var result = {};
  for(var key in base){
    result[key] = base[key];
  };
  for(var key in hash){
    result[key] = hash[key];
  };
  return result;
};
