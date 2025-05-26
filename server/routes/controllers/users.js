import express from 'express'

var router = express.Router()

//get user profile info
router.get('/', async (req, res) => {
    console.log("received user profile request")
    try {
        const userId = req.query.userId
        const user = await req.models.Profile.findOne({ _id: userId })
        res.json(user)

    } catch (error) {
        console.log("Error fetching user", error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

//change user profile info
router.post('/change', async (req, res) => {
    console.log("changes", req.body)
    try {
        await req.models.Profile.updateOne({ _id: req.body._id },
            {
              $set: {
                fname: req.body.fname,
                lname: req.body.lname,
                pronouns: req.body.pronouns,
                email: req.body.email,
                grad_year: req.body.grad_year,
                intended_career: req.body.intended_career
              }
            })
        res.send({ "status": "success" })

    } catch (error) {
        console.log("Error creating profile", error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

export default router;