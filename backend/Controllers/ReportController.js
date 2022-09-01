const Report = require('../Model/ReportModel')
const {getReportValidation, addItemValidationValidation} = require("../middleware/Validation");

//get by month and year

const getItemsByMonthAndYear = async (req,res) =>
{
    // const {error} = getReportValidation(req.body);
    // if(error)
    // {
    //     return res.status(400).send({error: error.details[0].message});
    // }
    const year = req.params.year;
    const month = req.params.month;
    console.log(year +month)
    try
    {
        const report = await Report.findOne({user_id:req.user ,year: year, month: month});
        const arr = []
        let totalSum = 0;
        if(report !== null)
        {
            for (let i = 0; i < report.category.length; i++) {

                for (let j = 0; j < report.category[i].cost.length; j++) {
                    arr.push({
                        description: report.category[i].cost[j].description,
                        sum: report.category[i].cost[j].sum,
                        category: report.category[i].name
                    });
                    totalSum += report.category[i].cost[j].sum;
                }
            }
            arr.push({totalSum: totalSum});
            return res.status(200).json(arr);

        }
        else
        {
            return res.status(400).json('no data on year/month')

        }
    }
    catch (err)
    {
        return res.status(400).json({ error: err.message })
    }
}

//add item
const addItem = async (req, res) =>
{
    const {error} = addItemValidationValidation(req.body);
    if(error)
    {
        return res.status(400).send({error: error.details[0].message});
    }
    const {description, sum, category: categoryName}= req.body;
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    const user_id = req.user;
    const newItem = {
        description:description,
        sum:sum,
    };
    try {
        const report = await Report.findOne({user_id:req.user, year: year, month: month}).exec();
        if(report !== null)
        {
            const foundCategory = report.category.filter(category => category.name === categoryName)
            if(foundCategory.length != 0)
            {
                let sum = 0;
                foundCategory[0].cost.push(newItem);
                for(let i = 0; i < foundCategory[0].cost.length; i++)
                {
                    sum +=foundCategory[0].cost[i].sum;
                }
                foundCategory[0].total = sum;
                await report.save();
                return res.status(201).json("Item added successfully");
            }
            else
            {
                const category = ({
                    name: categoryName,
                    cost: [newItem],
                    total: newItem.sum
                })
                try {
                    report.category.push(category);
                    await report.save()

                    return res.status(201).json('Item added successfully')
                } catch (err) {
                    res.status(400).json({error: err.message})
                }
            }
        }
        else {
            const category = ({
                name: categoryName,
                cost: [newItem],
                total: newItem.sum
            })
            try {
                await Report.create({user_id,year, month, category})
                return res.status(201).json("Item added successfully")
            } catch (err) {
                res.status(400).json({error: err.message})
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports=
    {
        addItem,
        getItemsByMonthAndYear,
    }