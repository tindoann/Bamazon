// Gain access to node modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

// Connect to database
const connection = mysql.createConnection({
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
  managerPrompt();
});

// A prompt which displays the Manager's option, then a switch-statement 
function managerPrompt() {
  inquirer
    .prompt([{
      name: 'managerPrompt',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Exit']
    }])
    .then(function(ans) {
      switch (ans.managerPrompt) {
        case 'View Products for Sale':
          displayItems();
          break;
        case 'View Low Inventory':
          lowItems();
          break;
        case 'Add to Inventory':
          addItems();
          break; 
        case 'Add New Product': 
          newItems(); 
          break; 
        case 'Exit':
          process.exit();
          break;
        default:
          console.log("\nPlease select a valid operation.\n");
      };
    });
};

function displayItems() {
  console.log('Products available for sale')
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    console.log('');
    console.table(res);
    connection.end();
  });
}; 

function lowItems() {
  console.log('Inventory needing to be reorder') 
  connection.query('SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5', function (err, response) {
    if (err) throw err; 
    console.log(''); 
    console.table(response); 
    if (response.length === 0) {
      console.log('Currently, there are no items needing to be replenish')
    }
    connection.end(); 
  }); 
}; 


function addItems() {
  
  inquirer.prompt([
    {
      type: 'input', 
      message: 'What is the product id of the item you want to restock?', 
      name: 'itemId'
    },
    {
      type: 'input', 
      message: 'How many units of the product would you like to purchase?',
      name: 'restockQty'
    }
  ]).then(function (answer) {
    if (err) throw err;
    console.log('')
    connection.query(`UPDATE products SET stock_quantity = (${answer.restockQty} + stock_quantity) WHERE product_name = ?`, [response.itemId], function (err, newItem) {
      if (err) throw err;
      console.log('')
    })
  });

  function newItems() {
    inquirer.prompt([{
        type: 'input',
        message: 'What is the ID of the product you are updating?',
        name: 'idUpdate'
      },
      {
        type: 'input',
        message: 'What department would you like the product to be in',
        name: 'depUpdate'
      },
      {
        type: 'input',
        message: 'What price do you want the product to be?',
        name: 'priceUpdate'
      },
      {
        type: 'input',
        message: 'How many units do plan to acquire',
        name: 'inventoryUpdate'
      }
    ])
  }
  }