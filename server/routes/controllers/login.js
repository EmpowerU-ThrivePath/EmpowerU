import express from 'express'

var router = express.Router()

//creating profile
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        const newProfile = new req.models.Profile({
            fname: req.body.fname,
            lname: req.body.lname,
            pronouns: req.body.prnouns,
            email: req.body.email,
            grad_year: req.body.grad_year,
            intended_career: req.body.intended_career,
            password: req.body.password,
            avatar: req.body.avatar,
            hasCompletedQuiz: false  // Explicitly set to false for new users
        })

        await newProfile.save()
        res.send({ "status": "success" })

    } catch (error) {
        console.log("Error creating profile", error)
        res.status(500).json({ "status": "error", "error": error })
    }
})

//verify if logged in
router.get('/loggedin', async (req, res) => {
    if (req.session.userId) {
      const user = await req.models.Profile.findOne({ _id: req.session.userId})
      console.log("User quiz status:", user.hasCompletedQuiz);
      res.send({
        loggedIn: true, 
        userId: req.session.userId,
        hasCompletedQuiz: user.hasCompletedQuiz || false
      })
    } else {
        console.log("KICKED OUT")
        res.send({loggedIn: false})
    }
})

// login
router.post('/', async (req, res) => {
    console.log("login info", req.body)
    const { email, password } = req.body;
    try {
        const user = await req.models.Profile.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        } else {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    return res.status(500).json({ "status": "error", "error": err });
                }
                if (isMatch) {
                    req.session.userId = user._id
                    console.log("check", req.session.userId)
                    console.log("session info", req.session)
                    res.send({ 
                        "status": "success", 
                        "userId": user._id,
                        "hasCompletedQuiz": user.hasCompletedQuiz || false 
                    })
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

router.delete("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Logout error:", err)
        return res.status(500).send("Could not log out")
      }
  
      res.clearCookie("connect.sid", {
        path: "/"
      })
        res.send({ message: "Logged out successfully" })
    })
  })

  router.post('/update', async (req, res) => {
    try {
      console.log("update request received", req.body);
      const user = await req.models.Profile.findOne({ _id: req.body.userId.user })
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" })
      }
  
      user.comparePassword(req.body.currentPass, async (err, isMatch) => {
        if (err) {
          return res.status(500).json({ status: "error", error: err })
        }
        if (!isMatch) {
          return res.status(400).json({ status: "error", message: "Invalid password" })
        }
        user.password = req.body.newPass;
        try {
          await user.save();
          return res.json({ status: "success" })
        } catch (saveErr) {
          return res.status(500).json({ status: "error", error: saveErr })
        }
      });
      
    } catch (error) {
      console.log("Error updating password", error)
      return res.status(500).json({ status: "error", error: error })
    }
  })

export default router;