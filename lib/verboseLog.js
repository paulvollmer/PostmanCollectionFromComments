module.exports = function(verbose, msg) {
  if(verbose) {
    console.log(msg);
    return msg;
  } else {
    return '';
  }
};
