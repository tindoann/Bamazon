// Gain access to node modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

// Connect to database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  password: "Huong1225",
  database: "bamazon_DB"
});

// Initialize connection
connection.connect(function (err) {
  if (err) throw err;
  displayItems();
});

// Display available items
function displayItems() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    console.log('');
    console.table(res);
    userPrompt();
  });
};

function userPrompt() {
// Prompt user for item id and amount of unit to purchase
  inquirer
    .prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the id of the item you would like to submit?'
      },
      {
        name: 'units',
        type: 'input',
        message: 'How many units of the product would you like to purchase?',
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])

    // Get answer/response from user
    .then(function (ans) {
      connection.query('SELECT product_name, price, stock_quantity FROM products WHERE id = ?', [ans.id], function (err, res) {
        if (err) throw err;
        console.log('');
        if (ans.length === 0) {
          console.log('Item does not exist');
        } else if (ans.units > res[0].stock_quantity || res[0].stock_quantity === 0) {
          console.log('There is no stock left at this moment, please check again later');
        } else {
            let newPrice = parseInt(res[0].price);
            let purchaseUnits = parseInt(ans.units);
            let productName = res[0].product_name; 
            let total = newPrice * purchaseUnits;
            let actualStock = res[0].stock_quantity - ans.units;
            console.log(`The total cost for your items will be $${total} for ${purchaseUnits} ${productName}`);
            connection.query(`UPDATE products SET stock_quantity = ${actualStock} WHERE id = ${ans.id}`, function (err) {
              if (err) throw (err);
            })
          }
          connection.end();
      })
    });
};