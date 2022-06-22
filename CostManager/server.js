require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json({
    type: ['application/json', 'text/plain']
}))

mongoose.connect("mongodb+srv://" + process.env.password +"@cluster0.rfa43.mongodb.net/Costs");

const costsSchema = {
    id:String,
    description:String,
    sum:Number,
};
const categorySchema = {
    name:String,
    cost: [costsSchema],
    total: Number
};

const reportSchema = {
    year:String,
    month:String,
    category: [categorySchema]
};

const userSchema = new mongoose.Schema ({
    id:String,
    first_Name:String,
    last_Name: String,
    BirthDay:Date,
    marital_status:String,
    report: [reportSchema]
});


const Cost = mongoose.model("costs", costsSchema);
const Reports = mongoose.model("reports", reportSchema);
const Category = mongoose.model("category", categorySchema);

const User = new mongoose.model("User", userSchema);

app.get("/report/:year/:month/:userID", function(req,res)
{
    const year = req.params.year;
    const month = req.params.month;
    const userID = req.params.userID;

    User.findOne({id:userID},function (error,foundUser){
        if(!error)
        {
            if(foundUser != null)
            {
                const arr = [];
                var totalSum = 0;

                for(let i = 0; i < foundUser.report.length; i++)
                {
                    if (foundUser.report[i].year == year && foundUser.report[i].month == month) {

                        for (let j = 0; j < foundUser.report[i].category.length; j++) {
                            for (let k = 0; k < foundUser.report[i].category[j].cost.length; k++) {

                                arr.push({
                                    description: foundUser.report[i].category[j].cost[k].description,
                                    sum: foundUser.report[i].category[j].cost[k].sum,
                                    category: foundUser.report[i].category[j].name
                                });
                                totalSum += foundUser.report[i].category[j].cost[k].sum;
                        }
                    }
                    }

                }
                arr.push({totalSum:totalSum});

                if(totalSum != 0)
                {
                    res.status(200).json(arr);
                }
                else
                {
                    res.status(400).json('no data on year/month')
                }
            }
            else
            {
                res.status(400).json("user not found")
            }
        }
        else{
            console.log(error);
        }
    });
});

app.post("/adduser", function(req, res){

    const user = new User({
        id:req.body.id,
        first_Name: req.body.firstName,
        last_Name: req.body.lastName,
        BirthDay: req.body.BirthDay,
        marital_status: req.body.maritalStatus,
        report : []

    });

    User.findOne({id:user.id},function (error,foundUser){

        if(!error)
        {
            if(foundUser != null)
            {
                res.status(400).json("user not found")
            }
            else{
                user.save();
                res.status(201).json("created");

            }
        }
        else{
            console.log(error);
        }
    });

});


app.post("/submit", function(req, res){
    const costDescription = req.body.description;
    const costId = req.body.id;
    const totalSum = req.body.sum;
    const costCategory = req.body.category;
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    const newItem = new Cost({
        id:costId,
        description:costDescription,
        sum:totalSum,
    });

    User.findOne({id:newItem.id}, function (error,foundId){
        if(!error)
        {
            if(foundId === null)
            {
                res.status(400).json("user not found");
            }
            else{               
             
                const foundReport = foundId.report.filter((report) => {return report.year == year && report.month == month;})
                if(foundReport.length!=0)
                {
                    const foundCategory = foundReport[0].category.filter((category) => {return category.name === costCategory;})
                    if(foundCategory.length!=0)
                {
                    let sum = 0;
                    foundCategory[0].cost.push(newItem);
                    for(let i = 0; i < foundCategory[0].cost.length; i++)
                    {
                        sum +=foundCategory[0].cost[i].sum;
                    }
                    foundCategory[0].total = sum;
                }

                else{
                    const category = new Category({
                            name: costCategory,
                            cost: [newItem],
                            total: newItem.sum
                        }
                    )
                    foundReport[0].category.push(category);
                    }
                    
                    let sum = 0;
                    
                    for(let i = 0; i < foundReport[0].category[0].cost.length; i++)
                    {
                        sum +=foundReport[0].category[0].cost[i].sum;
                    }
                    
                    foundReport[0].total = sum;
                }
                else{
                    const category = new Category({
                        name: costCategory,
                        cost: [],
                        total: newItem.sum
                    }
                )
                category.cost.push(newItem);
                    const Report = new Reports({
                            year: year,
                        month:month,
                        category: [category],
                        }
                    )
                    foundId.report.push(Report);
                }
                foundId.save();

                res.status(201).json("created");
            }
        };

    });
});

app.listen(4020, function() {
    console.log("Server started on port 4020");
});
