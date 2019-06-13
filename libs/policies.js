/**
 * Load policies from a directory into a Sails app
 */

const _ = require('@sailshq/lodash');
// const includeAll = require('include-all');
// const util = require('./utils');
var loadPolicies = require(__dirname + "/sails/_loadPolicies");

module.exports = function (sails, dir, cb) {
  // includeAll.optional({
  //   dirname: dir,
  //   filter: /^(.+)\.(?:(?!md|txt).)+$/,
  //   replaceExpr: null,
  //   flatten: true,
  //   keepDirectoryPath: true
  // }, util.bindToSails(function (err, modules) {
  //   if (err && cb) {
  //     return cb(err);
  //   }
  //   sails.log.info("mvcloader policies modules : ", module);
  //   if (cb) {
  //     cb(null, modules);
  //   }
  // }));
  if (_.isArray(sails.config.paths.policies)) {
    sails.config.paths.policies.push(dir);
  } else {
    sails.config.paths.policies = [sails.config.paths.policies, dir];
  }

  sails.modules.loadPolicies = loadPolicies;
  _.bind(sails.modules.loadPolicies, sails.modules);

  return cb(null, loadPolicies);
}
