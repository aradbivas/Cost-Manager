const mongoose = require("mongoose");

const costsSchema = {
    description:String,
    sum:Number,
};
const categorySchema = {
    name:String,
    cost: [costsSchema],
    total: Number
};

const reportSchema = {
    year:
        {
            type: String,
            required: true
        },
    month:        {
        type: String,
        required: true
    },
    user_id:
        {
            type:String,
            required:true
        },
    category: [categorySchema]

};

module.exports = mongoose.model("Report", reportSchema);
