const { restoreDefaultPrompts } = require("inquirer");
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
        type:'list',
        name: 'list',
        message:'do you want to add a great-bay listing?',
        choices:['add a listing','bid','leave']        
    },
    ])
    .then((answers) =>{
    if (answers.list == 'add a listing'){
    addlist()
    } else if (answers.list == 'bid'){
        readProducts() 
  
    }
    else{
        console.log("have a nice day!")
        connection.end()
    }
})}

const selectProduct =(answers)=>{
    const item =answers.listings
connection.query(
    
        `SELECT * FROM listings WHERE item=?`,
        [item],
    
    (err, res) => {
        if (err) throw err;
        res.forEach(({ id,item, catagory, price }) => {
          console.log(`${id} | ${item} | ${catagory} | ${price}`);
        })
    inquirer
    .prompt([
        {
            type:'input',
            name: 'pricechange',
            message:'how much are you bidding?',
                    
        },
    ])
    .then((answers) => {
        if (res.price > answers.pricechange){
            console.log('original bidding price is higher then new price!')
        }
        else{
            console.log('Updating price...\n');
  connection.query(
    'UPDATE listings SET ? where ? ',
    [
      {
        price: answers.pricechange,
      },
      {
        item:item,
      }
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`price changed!\n`);
      start()
        }
  )}
    
    }
    )})}



const readProducts = () => {
    console.log('Selecting all listings...\n');
    connection.query('SELECT * FROM listings', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      
    
      inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'listings',
                choices(){
                    const choiceArray =[];
                    res.forEach(({item})=> {
                        choiceArray.push(item)
                    });
                    return choiceArray
                },
                message:'what would you like to bid on?'
            }
        ])
        .then((answers) =>{
            selectProduct(answers)
        })

    
})}
//   const updateProduct = () => {
//     console.log('Updating all Rocky Road quantities...\n');
//     const query = connection.query(
//       'UPDATE products SET ? WHERE ?',
//       [
//         {
//           quantity: 100,
//         },
//         {
//           flavor: 'Rocky Road',
//         },
//       ],
//       (err, res) => {
//         if (err) throw err;
//         console.log(`${res.affectedRows} products updated!\n`);
//         // Call deleteProduct AFTER the UPDATE completes
//         deleteProduct();
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   };



connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });
