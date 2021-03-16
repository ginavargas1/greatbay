const inquirer = require("inquirer");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Af3221996',
    database: 'greatbayDB',
  });
  
const createProduct = (answers) =>{
    console.log('adding listing...\n');
    const query = connection.query(
        'INSERT INTO listings SET ?',
        {
            item:answers.item,
            catagory:answers.catagory,
            price:answers.price
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} listing inserted!\n`);
          }
    )
}





function addlist(){
    inquirer
    .prompt([
    {
        type:'input',
        name: 'item',
        message:'what is the item?',
    },
    {
        type:'input',
        name: 'catagory',
        message:'what is the catagory of the item?',
    },
    {
        type:'input',
        name: 'price',
         message:'what is the price?',
    }   
    ])
    .then((answers)=> {
        createProduct(answers);
       (err) =>
        err? console.log (err) :console.log("added engineer!")
       start()  
    })        



}


function start(){
inquirer
.prompt([
    {
        type:'checkbox',
        name: 'list',
        message:'do you want to add a great-bay listing?',
        choices:['add a listing','bid','leave']        
    },
    ])
    .then((answers) =>{
    if (answers.list == 'add a listing'){
    addlist()
    }
})}




connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });
  