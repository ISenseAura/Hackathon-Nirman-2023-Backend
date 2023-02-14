const firebase = require("../firebase-init");

let database = require("../database");
// signup
exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      this.updateUser(req,res);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// signin
exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// verify email
// this work after signup & signin
exports.verifyEmail = (req, res) => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function () {
      return res.status(200).json({ status: "Email Verification Sent!" });
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/too-many-requests") {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// forget password
exports.forgetPassword = (req, res) => {
  if (!req.body.email) {
    return res.status(422).json({ email: "email is required" });
  }
  firebase
    .auth()
    .sendPasswordResetEmail(req.body.email)
    .then(function () {
      return res.status(200).json({ status: "Password Reset Email Sent" });
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        return res.status(500).json({ error: errorMessage });
      } else if (errorCode == "auth/user-not-found") {
        return res.status(500).json({ error: errorMessage });
      }
    });
};


exports.updateUser = (req,res) => {
    const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: req.body.username,
  photoURL: "https://example.com/jane-q-user/profile.jpg",
  id : req.body.id,
  fname : req.body.fname,
  lname : req.body.lname,
  isStudent : req.body.isStudent,
  isAlumni : req.body.isAlumni
}).then(function (data) {

    database.ref("users").set({[req.body.email]:req.body}, function(error) {
        if (error) {
          // The write failed...
          console.log("Failed with error: " + error)
        } else {
          // The write was successful...
          console.log("success")
        }
    })
    return res.status(200).json({ status: firebase.auth().currentUser });
  })
  .catch(function (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    if (errorCode === "auth/too-many-requests") {
      return res.status(500).json({ error: errorMessage });
    }
  });
}


exports.deleteUser = (req,res) => {
    const user = firebase.auth().currentUser;

    user.delete().then(() => {
        res.json(200);
      }).catch((error) => {
       res.json(400);
      });
      
}
