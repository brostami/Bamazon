var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('tty-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Pepper0910',
    database: 'bamazonDB'
});

connection.connect(function(err) {
    if (err) throw err;
    getProducts();    
});

// function displayItems() {
//     var query = 'SELECT * FROM products';
//     connection.query(query, function(err, res) {
//         console.log('\n-----------------------------------\n');
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].id + ' || ' + res[i].product_name + ' || ' + '$' + res[i].price);
//         }
//         console.log('\n-----------------------------------');
//     });
// }
var products = [];

function getProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            products.push({id: res[i].id, name: res[i].product_name, price: '$' + res[i].price});
        }
        displayItems();
    });
}

function displayItems() {
    var header = [
    {
        value: "id",
        headerColor: "cyan",
        color: "white",
        align: "left",
        paddingLeft : 2,
        width : 10
    },
    {
        value : "name",
        headerColor : "cyan",
        color: "white",
        align : "left",
        paddingLeft : 2,
        width : 30
    },
    {
        value : "price",
        headerColor : "cyan",
        color : "white", 
        width : 20,
        align : "left",
        paddingLeft : 2,
    }
    ];

    var t2 = table(header, products, {
        borderStyle : 1,
        paddingBottom : 0,
        headerAlign : "center",
        align : "center",
        color : "white"
    });

    var str2 = t2.render();
    console.log(str2);

    userQuestions();
}

function userQuestions() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            choices:['Purchase', 'See Top Sellers', 'Exit'],
            message: 'What would you like to do?'
        }
    ]).then(function(answers) {
        switch(answers.choice) {
            case 'Purchase':
                makePurchase();
                break;
            case 'See Top Sellers':
                highestGross();
                break;
            case 'Exit':

                break;
        }
    });
}

function makePurchase() {
    inquirer.prompt([
        {
            name: "item",
            message: "What item would you like to buy?\nEnter Item #: "
        }, {
            name: "quantity",
            message: "How many? "
        }
    ]).then(function(answers) {
        var userQty = parseInt(answers.quantity);
        var userTotal = 0;
        connection.query("SELECT * FROM products WHERE id=?", parseInt(answers.item), function(err, res)  {
            if (err) throw err;
            var storeQty = res[0].quantity;
            if (storeQty < userQty) {
                console.log('Insufficient Inventory. ' + storeQty + ' available.');
                makePurchase();
            }
            else {
                updatedQty = parseInt(storeQty) - userQty;
                connection.query("SELECT * FROM products WHERE id=?", parseInt(answers.item), function(err, res) {
                    if (err) throw err;
                    console.log(userQty + ' x ' + res[0].name + ' (' + res[0].price + ')');
                    var item = res[0].product_name;
                    var itemPrice = res[0].price;
                    userTotal = userQty * itemPrice;
                    userPurchase = [{item: item, price: itemPrice, qty: userQty, total: userTotal}];
                    displayTotal(userPurchase);
                });
                connection.query("UPDATE products SET quantity=" + updatedQty + " WHERE id=" + parseInt(answers.item));
            }
        });
    });
}

function displayTotal(purchasedItem) {
    var header = [
    {
        value : "item",
        headerColor : "cyan",
        color: "white",
        align : "left",
        paddingLeft : 2,
        width : 30
    },
    {
        value : "price",
        headerColor : "cyan",
        color : "white", 
        width : 20,
        align : "center",
        paddingLeft : 2,
    },    
    {
        value: "qty",
        headerColor: "cyan",
        color: "white",
        align: "center",
        paddingLeft : 2,
        width : 10
    },
    {
        value : "total",
        headerColor : "cyan",
        color : "white", 
        width : 20,
        align : "center",
        paddingLeft : 2,
    }
    ];

    var t2 = table(header, purchasedItem, {
        borderStyle : 1,
        paddingBottom : 0,
        headerAlign : "center",
        align : "center",
        color : "white"
    });

    var str2 = t2.render();
    console.log(str2);

    userQuestions();
}
    
