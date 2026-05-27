const User = require('../models/user.models')


const getUsers = async(req, res) =>{
    try{
        const users = await User.find().select('username score')
        if (!users){
            return res.status(404).json({
                status: 'FAILED',
                message: 'No users round here'
            })
        }

        

        res.json({
            status: 'SUCCESS',
            users
        })
    }catch(error){
        return res.status(500).json({
        status: 'FAILED',
        message: 'someething went wrong'
    })
}
}

const getHighScore = async(req, res) =>{
    try{
        const highScores = await User.find().select('username score').sort({score: -1})
        const highScore = highScores
        if (!highScores){
            return res.status(404).json({
                status: 'FAILED',
                message: 'No users round here'
            })
        }

        

        res.json({
            status: 'SUCCESS',
            highScore
        })
    }catch(error){
        return res.status(500).json({
        status: 'FAILED',
        message: 'someething went wrong'
    })
}
}

const saveScore = async(req, res) =>{
    try{
        const {username, score} = req.body
        const userData={
            username,
            score
        }

        await User.create(userData)

        res.json({
            status: 'SUCCESS',
            message: 'User and score saved!'
        })
    }catch(error){
        return res.status(500).json({
        status: 'FAILED',
        message: 'user and score not saved'
    })
}
}

module.exports = {
    getUsers,
    getHighScore,
    saveScore
}