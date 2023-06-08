import asyncHandler from "express-async-handler";
import { Doctor } from "../../models/doctor.js";
import { UserDetails } from "../../models/UserDetails.js";


//private by admin -> api/admin/users
export const get_all_users = asyncHandler(async (req, res) => {
    const users = await UserDetails.find({ role: 'user', isDoctor: false });
    res.status(200).json(users);
});

//private by admin -> api/admin/doctors
export const get_all_doctors = asyncHandler(async (req, res) => {
    // const doctors = await Doctor.find({},{createdAt:0,updatedAt:0,__v:0}).populate({path:'user',select:'name -_id'});
    // const doctors = await Doctor.find({},{createdAt:0,updatedAt:0,__v:0}).populate('user',['name','email']);
    // const doctors = await Doctor.find({},{createdAt:0,updatedAt:0,__v:0}).explain('queryPlanner');
    const doctors = await Doctor.find({}).populate({ path: 'user', select: 'name' });
    res.status(200).json(doctors);
});

//private by admin -> api/admin/approved-doctors
export const get_all_approved_doctors = asyncHandler(async (req, res) => {
    try {
        const doctors = await Doctor.find(
          
            { status: 'approved', user: { $ne: req.user._id } })
            .populate('user');
        res.status(200).json(doctors);

    } catch (error) {
        console.log(error)
        res.json('error')
    }
});

//@todo private by admin -> api/admin/approve-all-as-doctor


//private by admin -> api/admin/approve-as-doctor/:id
export const approveAsDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { status: 'approved' });

    //send approval notification to the doctor
    const user = await UserDetails.findById(doctor.user);
    const unseenNotifications = user.unseenNotifications;

    unseenNotifications.push({
        type: 'doctor-approval',
        message: `Your application for doctor is approved!`,
    });
    user.isDoctor = true;

    await user.save();
    res.status(200).json({ success: true });
});