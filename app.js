
// BUDGET CONTROLLER
//IIFE - Allows data privacy
//Module patterns returns a object with public functions which is exposed to the rest of the application
//Object gets assigned ot bugdet variable after it gets returnted
//Closers allows an inner function has always access to the variables and paramters of its outer function even after the outer function has returned
//Thats what happenes here. The IIFE returns immedimtyl. It is effectivly gone. The public test function
//we return will alwasy have access to the x variablea and the add function because a closer was created/
//The public test method was public becuase is was return and now can use. The x and add are pribate becuase they are in the closer and therefore only the public test method can access them
//The functions and x variables and in the closer even after the iffee has returned.
var budgetController =  (function(){
 //Function Contructor
    class Expense {
		constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
   
    //Function Contructor prototype function
    calcPercentage(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }
   
     //Function Contructor prototype function
  getPercentage() {
        return this.percentage;
    }
	}
   
     //Function Contructor for income
   class Income{
	constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
   
      //Function Contructor for calculateTotal
     calculateTotal(type) {
        let sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
   }
 
//Object
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
   

   
    //returned public functions with access to the private functions/variables
    return {
		
		GetResult: function (){
			TotalExpenses = new Income();
			TotalExpenses.caclexp.calculateTotal('inc');
			return TotalExpenses;
			
		}, 
		/*IncomeResult: function() {
		   
	
		 

		   console.log(data.budget);
		let Total = data.budget;
			if (Total === 0){
				
				return Total;
			} else if (Total >= 0){
			Total *= 12; 
				return Total;
			} else {
				Total *= 12; 
				return Total;
			}
		},*/
        addItem: function(type, des, val) {
            let newItem, ID;
           
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
           
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
           
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }  
           
            // Push it into our data structure
            data.allItems[type].push(newItem);
           
            // Return the new element
            return newItem;
        },
       
       
        deleteItem: function(type, id) {
            let ids, index;
           
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
           
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
           
        },
       
       
        calculateBudget: function() {
           let caclexp = new Income();
		   
		   caclexp.calculateTotal('exp');
		   
		   //calculateTotal('exp');
            // calculate total income and expenses
          
             caclexp.calculateTotal('inc');
           
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
           
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
           
            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },
       
        calculatePercentages: function() {
           
            /*
            a=20
            b=10
            c=40
            income = 100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
            */
           
            data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
            });
        },
       
       
        getPercentages: function() {
            let allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
       
       
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
       
        testing: function() {
            console.log(data);
        }
    }; //end of returned public functions via closers
   
})();




// UI CONTROLLER
var UIController =  (function(){
    //private object
    var DOMstrings = {
      /*  inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        Budgetinputb: '.Budgetinput',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.Budget_Label',
        incomeLabel: '.budget__income',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'*/
		
		 BudgetDes: '.BudgetDes',
		 BudgetDesinput: '.BudgetDesinput',
		 budgetResult: '.budget_value',
		 Budgetbtn: '.BudgetSubmit',
		 ExpenseLabel: '.ExpenseLabel',
		 Expenseinput: '.Expenseinput',
		 ExpenseValue: '.Expenseinput',
		 ExpenseValueInput: '.ExpenseValueInput',
	     Expensebtn : '.Expensebtn',
		budgetValue: '.Budgetinput',
		// ExpenseValue: '.ExpenseValueInput"',
		balanceValue: '.balance_value',
		  expensesContainer: '.expenses__list',
		  expensesPercLabel: '.item__percentage',
		   budgetLabel: '.balance_value',
		 incomeLabel: '.budget__value--value',
        expensesLabel: '.expense_value',
		 percentageLabel: '.budget__expenses--percentage',
		   container: '.container'
		
    };
   
    //private function
    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };
	var Result = function(Resultbtn){
		if (ResultBtn === 0){
		document.querySelector('Result').addEventListener('click', ctrlResultItem);			
		}
	};
   
    //private functions
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
   
    //returned public functions
    return {
        getInput: function() {
            return {
				
                Expensedes: document.querySelector(DOMstrings.ExpenseValue).value, // Will be either inc or exp
                Expenseamount: parseFloat(document.querySelector(DOMstrings.ExpenseValueInput).value)
                
            };
        },
		 getInputBudget: function() {
            return {
				
              
				incomedes: document.querySelector(DOMstrings.BudgetDesinput).value,
				incomeamount: parseFloat(document.querySelector(DOMstrings.budgetValue).value)
				//incomebtn: document.querySelector(DOMstrings.Budgetbtn).value,
            };
        },
       addResult: function(obj){
		 
	   },
       
        addListItem: function(obj, type) {
            let html, newHtml, element;
            // Create HTML string with placeholder text
           
            if (type === 'inc') {
              //  element = DOMstrings.incomeContainer;
               
               var label_text = $('#budget_value').text(); //Get the text
			   console.log(label_text);
				$('#budget_value').text(label_text.replace(incomeamount) ); //Replace and set the text back
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
               
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%Expensedes%  </div> <div class="item__value">%Expenseamount%  </div>  <div class="item__percentage"> %21% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				//</ </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%Expensedes%', obj.description);
            newHtml = newHtml.replace('%Expenseamount%', formatNumber(obj.value, type));
           
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);           
		   } 
           

        },
       
       
        deleteListItem: function(selectorID) {
           
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
           
        },
       
       
        clearFields: function() {
            let fields, fieldsArr;
           
            fields = document.querySelectorAll(DOMstrings.balanceValue + ', ' + DOMstrings.expensesLabel);
         
            fieldsArr = Array.prototype.slice.call(fields);
           
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
           
            fieldsArr[0].focus();
        },
       
       
        displayBudget: function(obj) {
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
           
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
           
          //  document.querySelector(DOMstrings.budgetResult).textContent = formatNumber(obj.totalInc, 'inc');
          //  document.querySelector(DOMstrings.ExpenseValueInput).textContent = formatNumber(obj.totalExp, 'exp');
           
          /*  if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            } */
           
   }, 
       
       
        displayPercentages: function(percentages) {
           
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
           
            nodeListForEach(fields, function(current, index) {
               
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
           
        },
       
       
       /* displayMonth: function() {
            let now, months, month, year;
           
            now = new Date();
            //var christmas = new Date(2016, 11, 25);
           
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
           
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },*/
       
       
       /* changedType: function() {
           
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
           
            nodeListForEach(fields, function(cur) {
               cur.classList.toggle('red-focus');
            });
           
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
           
        },*/
       
       
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
   
})();




// GLOBAL APP CONTROLLER
//global controller with access to the budget controll and UI ctontrollers. It recongizes the returns controllers
//On the bottom
var controller = (function(budgetCtrl, UICtrl) {
   
    var setupEventListeners = function() {
        let DOM = UICtrl.getDOMstrings();
       
        document.querySelector(DOM.Expensebtn).addEventListener('click', ctrlAddItem);
		document.querySelector(DOM.Budgetbtn).addEventListener('click',  ctrlAddBudget);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
               document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        //document.querySelector(DOM.expensesContainer).addEventListener('click', ctrlDeleteItem);
       
        //document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);   
		//document.querySelector('.button').addEventListener('click', GetResult);		
    };
   
   /*var GetResult = function() {
	  let value = budgetCtrl.IncomeResult();
	  console.log(value);
	     let html, newHtml, element;
			                html = '<div class="item clearfix" id="Result"> <div class="item__description">Pontenial savings after a year with this budget:   $</div><div class="right clearfix"><div class="item__value">%value%</div></div>';
                        newHtml = html.replace('%value%', value);
           //newHtml = newHtml.replace('%value%', formatNumber(result));
           
            // Insert the HTML into the DOM
            document.querySelector('.Result').insertAdjacentHTML('beforeend', newHtml);
   };*/
    var updateBudget = function() {
       
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
       
        // 2. Return the budget
        let budget = budgetCtrl.getBudget();
		 	console.log(budget.totalInc);
       
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
   
   
    var updatePercentages = function() {
       
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
       
        // 2. Read percentages from the budget controller
        let percentages = budgetCtrl.getPercentages();
       
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
   
   
    var ctrlAddItem = function() {
        let input, newItem;
       
        // 1. Get the field input data
        input = UICtrl.getInput();        
       
        if (input.Expensedes !== "" && !isNaN(input.Expenseamount) && input.Expenseamount > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem('exp', input.Expensedes, input.Expenseamount);
              
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, 'exp');

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
           
            // 6. Calculate and update percentages
            updatePercentages();
        }
    };
   
   var ctrlAddBudget = function() {
        let input, newItem;
       
        // 1. Get the field input data
        input = UICtrl.getInputBudget();  
console.log(input.incomeamount)		
       
        if (input.incomedes !== "" && !isNaN(input.incomeamount) && input.incomeamount > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem('inc', input.incomedes, input.incomeamount);
              
            // 3. Add the item to the UI
           UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
           UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
           
            // 6. Calculate and update percentages
            updatePercentages();
        }
    };
   
   
    var ctrlDeleteItem = function(event) {
        let itemID, splitID, type, ID;
       
        itemID = event.target.parentNode.parentNode.parentNode.id;
       console.log('Item id: ' + itemID);
        if (itemID) {
           
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
           
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem('exp', ID);
           
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
           
            // 3. Update and show the new budget
            updateBudget();
           
            // 4. Calculate and update percentages
            updatePercentages();
        }
    };
   
   
    return {
        init: function() {
            console.log('Application has started.');
           // UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
    //Passing the controllers via atrguments.
})(budgetController, UIController);


controller.init();

