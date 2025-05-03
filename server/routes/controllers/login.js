import express from 'express'

var router = express.Router()

//creating profile
router.post('/signup', async (req, res) => {
    try {
        console.log("im here")
            console.log(req.body)
            const newProfile = new req.models.Profile({
                fname: req.body.fname,
                lname: req.body.lname,
                pronouns: req.body.prnouns,
                email: req.body.email,
                grad_year: req.body.grad_year,
                intended_career: req.body.intended_career,
                password: req.body.password,
                signed_in: req.body.signed_in
            })

            await newProfile.save()
            res.send({ "status": "success" })
        
    } catch (error) {
        console.log("Error creating profile", error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const user = await req.models.Profile.findOne({email: email});
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        } else {     
            user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return res.status(500).json({ "status": "error", "error": err });
            }
            if (isMatch) {
                res.send({ "status": "success", "userId" : user._id }) 
                console.log("worked!")
            } else {
                return res.status(400).json({ message: 'Invalid password' });
            }
        })
    }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ "status": "error", "error": error });
    }
    
})

export default router;