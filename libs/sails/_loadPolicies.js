const async = require("async");
const _ = require("lodash");
const includeAll = require("include-all");

module.exports = function(cb) {
  async.reduce(
    sails.config.paths.policies,
    {},
    function(prev, curr, callback) {
      includeAll.optional(
        {
          dirname: curr,
          filter: /^(.+)\.(?:(?!md|txt).)+$/,
          replaceExpr: null,
          flatten: true,
          keepDirectoryPath: true,
        },
        (err, policies) => {
          if (err) callback(err);
          callback(null, _.merge(prev, policies));
        }
      );
    },
    cb
  );
};
