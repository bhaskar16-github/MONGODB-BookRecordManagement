const { UserModel, BookModel } = require("../models");

exports.getAllUsers = async (req,res) =>{
    const users = await UserModel.find();

    if (users.length === 0){
        return res.status(404).json({
            success: false,
            message: "User Not Found..!",
        });
    }

    res.status(200).json({
        success: true,
        data: users
    });
};

exports.getSingleUserbyId = async(req,res)=>{
    const {id}= req.params;

    const user = await UserModel.findById({_id:id});

    if(!user){
        res.status(404).json({
            success: false,
            message: "This user Id Not Found..!"
        });
    }

    res.status(200).json({
        success: true,
        data: user,
    });
};

exports.deleteUser = async (req,res)=> {
    const {id}= req.params;

    const user = await UserModel.deleteOne({_id:id});

    if(!user){
        res.status(404).json({
            success: false,
            message: "This user Id Not Found..!"
        });
    }

    res.status(200).json({
        success: true,
        message: "User Deleted..!",
    });
};

exports.updateUserById = async (req,res)=>{
    const{id}= req.params;
    const {data}= req.body;

    const userUpadatedData = await UserModel.findOneAndUpdate(
        {
            _id:id
        },
        
        {
            $set: {
                ...data,
            },
        },
            {
                new: true,
            }
    );

    return res.status(200).json({
        success: true,
        data: userUpadatedData,
    });
};

exports.createNewUser = async(req,res)=>{
    const {
            name, surname, email, subscriptionType, subscriptionDate,
          } = req.body;

          const newUser = await UserModel.create({
            name, surname, email, subscriptionType, subscriptionDate,
          });

          return res.status(201).json({
            success: true,
            message: "User Created Successfully..",
            data: newUser,
          });
};

exports.getSubscriptionDetailsById = async (req,res)=>{
    const {id}= req.params;

    const user = await UserModel.findById(id);

    if(!user)
        return res.status(404).json({
            success: false,
            message: "User Not Found..!",
        });

        const getDateInDays = (data="")=>{
            let date;
            if (data === ""){
                date = new Date();
            } else {
                date = new Date(data);
            }
            let days = Math.floor(date / (1000*60*60*24));
            return days;
        };
        const subscriptionType = (date)=>{
            if (user.subscriptionType === "Basic"){
                date = date + 90;
            }else if(user.subscriptionType === "Standard"){
                date = date + 180;
            }else if(user.subscriptionType === "Premium"){
                date = date + 365;
            }
            return date;
        };

        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate);

        const data = {
            ...user,
            subscriptionExpired: subscriptionExpiration < currentDate,


            daysLeftForExpiration:
            subscriptionExpiration<= currentDate
            ?0
            :subscriptionExpiration - currentDate,


            fine:
            returnDate < currentDate
            ?subscriptionExpiration <= currentDate
            ?200
            :100
         :0,
        };
        return res.status(200).json({
            success: true,
            data
        });
};

