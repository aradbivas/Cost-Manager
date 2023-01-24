const Report = require('../Model/ReportModel')
const {getReportValidation, addItemValidationValidation} = require("../middleware/Validation");
const {number} = require("joi");
const { ObjectId } = require('mongodb');

//get by month and year

const getItemsByMonthAndYear = async (req,res) =>
{

    const year = req.params.year;
    const month = req.params.month;
    try
    {
        const report = await Report.findOne({user_id:req.user ,year: year, month: month});
        const arr = []
        let total = 0;
        if(report !== null && report.category.length !== 0)
        {
            for (let i = 0; i < report.category.length; i++) {

                for (let j = 0; j < report.category[i].cost.length; j++) {
                    arr.push({
                        reportId:report.category[i].cost[j].id,
                        description: report.category[i].cost[j].description,
                        sum: report.category[i].cost[j].sum,
                        category: report.category[i].name,
                        totalForCategory: report.category[i].total
                    });
                }


            }
            total = report.month_total;
            return res.status(200).json({array:arr, total: total});

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
    const category = ({
        name: categoryName,
        cost: [newItem],
        total: newItem.sum
    })
    try {
        const report = await Report.findOne({user_id:req.user, year: year, month: month}).exec();
        if(report !== null)
        {
            const foundCategory = report.category.filter(category => category.name === categoryName)
            if(foundCategory.length != 0)
            {
                foundCategory[0].cost.push(newItem);
                foundCategory[0].total += Number(newItem.sum);
                report.month_total += Number(newItem.sum);

                await report.save();
                return res.status(201).json("Item added successfully");
            }
            else
            {

                try {
                    report.category.push(category);
                    report.month_total += Number(newItem.sum);

                    await report.save()
                    return res.status(201).json('Item added successfully')
                } catch (err) {
                    res.status(400).json({error: err.message})
                }
            }
        }
        else {
            try {
                await Report.create({user_id,year, month, category, month_total:newItem.sum})

                return res.status(201).json("Item added successfully")
            } catch (err) {
                res.status(400).json({error: err.message})
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteItem = async (req,res) =>
{
    const year = req.body.year;
    const month = req.body.month;
    const categoryName = req.body.category;
    const itemId = req.body.itemId;
    const total = req.body.total;
    try {
        const report = await Report.findOne({year:year,month:month, user_id:req.user ,'category.cost._id': ObjectId(itemId) });
        if(report)
        {
            const categoryByName = report.category.filter(category => category.name === categoryName)
            const costItem =categoryByName[0].cost.filter(cost => cost.id === itemId);
            const costValue = costItem[0].sum;
            const categoryIndex = report.category.findIndex((category) => {
                return category.cost.some((cost) => cost._id.equals(ObjectId(itemId)));
            });
            if(categoryByName[0].cost.length === 1)
            {
                await Report.updateOne({ 'category.cost._id': ObjectId(itemId) }, { $pull: { category: { _id: ObjectId(report.category[categoryIndex]._id) } } })
                report.month_total -= costValue;
                await report.save();
                return res.status(200).json({itemId, total:report.month_total});
            }
            else
            {
                await Report.updateOne({ 'category.cost._id': ObjectId(itemId) }, { $inc: { [`category.${categoryIndex}.total`]: -costValue, month_total: -costValue}});
                report.month_total -= costValue;
                report.category[categoryIndex].total -= costValue;
                await Report.updateOne({ 'category.cost._id': itemId }, { $pull: { 'category.$.cost': { _id: itemId } } })
                return res.status(200).json({itemId, total:report.month_total});

            }
        }
    }
    catch (err)
    {
        res.status(400).json(err.message)

    }
}
module.exports=
    {
        addItem,
        getItemsByMonthAndYear,
        deleteItem
    }