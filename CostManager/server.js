require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
const cors = require('cors')

app.use(cors())

mongoose.connect("mongodb+srv://" + process.env.password +"@cluster0.rfa43.mongodb.net/Costs");

const costsSchema = {
    id:String,
    description:String,
    sum:Number,
    year:String,
    month:String
};
const reportSchema = {
    year:String,
    month:String,
    cost : []
};
const categorySchema = {
    name:String,
    cost: [costsSchema],
    total: Number
};

const Cost = mongoose.model("costs", costsSchema);
const Reports = mongoose.model("reports", reportSchema);


const Category = mongoose.model("category", categorySchema);


const userSchema = new mongoose.Schema ({
    id:String,
    first_Name:String,
    last_Name: String,
    BirthDay:Date,
    marital_status:String,
    category: [categorySchema],
    report : [reportSchema]
});

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
                        for (let j = 0; j < foundUser.report[i].cost.length; j++) {
                            if (foundUser.report[i].cost[j].year === year && foundUser.report[i].cost[j].month === month) {
                                arr.push({
                                    description: foundUser.report[i].cost[j].description,
                                    sum: foundUser.report[i].cost[j].sum
                                });
                                totalSum += foundUser.report[i].cost[j].sum;

                            }
                        }
                    }

                }
                arr.push({
                    totalSum:totalSum
                });

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
        category: [],
        report : []

    });
    User.findOne({id:user.id},function (error,foundUser){
        if(!error)
        {
            if(foundUser != null)
            {

                res.status(400).json("user not found")///msg here to client
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
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const year = dateObj.getUTCFullYear();

    const newItem = new Cost({
        id:costId,
        description:costDescription,
        sum:totalSum,
        year:year,
        month:month
    });

    User.findOne({id:newItem.id}, function (error,foundId){
        if(!error)
        {
            if(foundId === null)
            {
                res.status(400).json("user not found")
            }
            else{
                const temp = foundId.category.filter((category) => {return category.name === costCategory;})
                if(temp.length!=0)
                {
                    let sum = 0;
                    temp[0].cost.push(newItem);
                    for(let i = 0; i < temp[0].cost.length; i++)
                    {
                        sum +=temp[0].cost[i].sum;
                    }
                    temp[0].total = sum;
                }
                else{
                    const category = new Category({
                            name: costCategory,
                            cost: [newItem],
                            total: newItem.sum
                        }
                    )
                    foundId.category.push(category);
                }
                const reportTemp = foundId.report.filter((report) => {return report.year == year && report.month == month;})
                if(reportTemp.length!=0)
                {
                    let sum = 0;
                    reportTemp[0].cost.push(newItem);
                    for(let i = 0; i < reportTemp[0].cost.length; i++)
                    {
                        sum +=reportTemp[0].cost[i].sum;
                    }
                    reportTemp[0].total = sum;
                }
                else{
                    const Report = new Reports({
                            year: year,
                        month:month,
                            cost: [newItem],
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

app.listen(4000, function() {
    console.log("Server started on port 4000");
});
