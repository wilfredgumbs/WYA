// Requiring in the connection to the DB
var connection = require("./connection");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    createTable: function (tableName, tableFields, cb) {
        var queryString = "CREATE TABLE ?? (?)"
        connection.query(queryString, [tableFields], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    select: function (table, column, cb) {
        var queryString = "SELECT ?? FROM ??";
        connection.query(queryString, [column, table], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    doesExist: function (table, column, value, cb) {
        var queryString = "SELECT id FROM ?? WHERE ?? = ? ";
        connection.query(queryString, [table, column, value], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      },

      selectWhere: function ( value, cb) {
        var queryString = "SELECT * FROM users WHERE studentId = ?";
        connection.query(queryString, [value], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
}

module.exports = orm;