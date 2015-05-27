return module.exports  = {
  /*
   * Check for SQL injection vectors
   */
  check: function checkInjection(value, callback) {
    var usingCallback = (typeof callback === 'function');

    // RegExp from: http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks
    var sqlTestSuite = [
      new RegExp('(%27)|(\')|(--)|(%23)|(#)', 'i'),                    // Test meta characters (1)
      new RegExp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'i'), // Test meta characters (2)
      new RegExp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'i'), // Test for typical attack vectors (3)
      new RegExp('((%27)|(\'))union', 'i')                             // Test for attack vectors using UNION keyword (4)
    ];

    // Return false if empty value (obviously no injection then)
    if (value === null || value === undefined) {
      return usingCallback ? callback(false) : false;
    }

    // Iterate through each run in the test suite,
    // return callback upon the last iteration with
    // result.
    var result = false;
    for (var run = 0; run < sqlTestSuite.length; run++) {
      console.info('Testing SQL run:', run);

      result = result && sqlTestSuite[run].test(value);

      if (result) {
        console.warn('Found SQL injection');
      }

      if (run === (sqlTestSuite.length - 1)) {
        return usingCallback ? callback(result) : result;
      }
    }
  },

  /*
   * Escape string for SQL
   */
  escape: function escapeSql(value, callback) {
    var usingCallback = (typeof callback === 'function');

    // From: https://github.com/felixge/node-mysql/blob/master/lib/protocol/SqlString.js#L46
    value = value.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(s) {
      switch(s) {
        case "\0"  : return "\\0";
        case "\n"  : return "\\n";
        case "\r"  : return "\\r";
        case "\b"  : return "\\b";
        case "\t"  : return "\\t";
        case "\x1a": return "\\Z";
        default    : return "\\" + s;
      }
    });
    value = "'" + value + "'";

    return usingCallback ? callback(value) : value;
  }
};
