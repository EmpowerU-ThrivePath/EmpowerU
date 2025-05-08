import express from 'express'

var router = express.Router()

// //get user profile info
// router.get('/', async (req, res) => {
//     console.log("received user profile request")
//     try {
//         const userId = req.query.userId
//         const user = await req.models.Profile.findOne({ _id: userId })
//         res.json(user)

//     } catch (error) {
//         console.log("Error fetching user", error)
//         res.status(500).json({ "status": "error", "error": error })
//     }
// })

//add message
router.post('/message', async (req, res) => {
    console.log("adding message", req.body)
    try {
        console.log(req.body)
        const newMessage = new req.models.Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })

        await newMessage.save()
        res.send({ "status": "success" })

    } catch (error) {
        console.log("Error sending message", error)
        res.status(500).json({ "status": "error", "error": error })
    }
})



export default router;