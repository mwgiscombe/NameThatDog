const express = require ('express')
const router = express.Router()

const {
    getUsers,
    getHighScore,
    saveScore
} = require('../controllers/user.controllers')


router.get('/', getUsers)
router.get('/highscore', getHighScore)
router.post('/save', saveScore)


module.exports = router