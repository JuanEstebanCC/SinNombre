const { Router } = require("express");
const router = Router();

const User = require("../../models/User");

//Assign medicine to my patients
router.put("/assign_medicine", async (req, res) => {
  try {
    const {
      patient_email,
      medicineName,
      how_many,
      how_often,
      diagnostic,
    } = req.body;
    const assignedMedicine = await User.update(
      { email: patient_email },
      {
        $push: {
          medicines: {
            nameMedicine: medicineName,
            how_many: how_many,
            how_often: how_often,
            diagnostic: diagnostic,
          },
        },
      }
    );

    res.send(assignedMedicine);
  } catch (err) {
    next(err);
  }
});

// Delete medicine
router.delete("/deleteMedicine", async (req, res) => {
  try {
    const { id_user, id_medicine } = req.body;

    await User.findById(id_user, (err, deletedMedicine) => {
      if (!err) {
        deletedMedicine.medicines.remove({ _id: id_medicine });
        deletedMedicine.save();
        res.send("ok");
      }
      console.log(err);
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/* See all my patientes */
router.get("/my_patientes", async (req, res, next) => {
  const { email } = req.query;

  try {
    const patients = await User.find({ assignedDoctor: email });
    res.send(patients);
  } catch (err) {
    next(err);
  }
});

//Assign diet to my patients
router.put("/assign_diet", async (req, res, next) => {
  try {
    const { patient_name, dietType } = req.body;
    const assignedDiet = await User.update(
      { full_name: patient_name },
      {
        $set: { dietType: dietType },
      }
    );

    res.send(assignedDiet);
  } catch (error) {
    console.log(error);
    next(err);
  }
});

//My patents
router.get("/my_patients", async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await User.find({ assignedDoctor: email });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

