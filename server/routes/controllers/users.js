import express from 'express'

var router = express.Router()

//get user profile info
router.get('/', async (req, res) => {
    console.log("received user profile request")
    try {
        const userId = req.query.userId
        console.log("this is passed query", userId)
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
                grad_month: req.body.grad_month,
                grad_year: req.body.grad_year,
                intended_career: req.body.intended_career,
                avatar: req.body.avatar
              }
            })
        res.send({ "status": "success" })

    } catch (error) {
        console.log("Error creating profile", error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

router.delete('/', async (req, res) => {
  console.log("deletinggg");
  try {
    const userId = req.query.userId
    console.log("userrr", userId)
    await req.models.Profile.deleteOne({ _id: userId })
    res.send({ status: "success" })
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ status: "error", error });
  }
})


export default router;