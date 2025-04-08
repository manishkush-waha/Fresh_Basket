
import mongoose from "mongoose";

const shopOwner = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    shopBannerImage: {
        type: String,
        default: ""
    },
    shopLogo: {
        type: String,
        default: ""
    },
    shopName: {
        type: String,
        required: [true, "Provide shop name"]
    },
    description: {
        type: String,
        required: [true, "Provide shop description"]
    },
    mobile: {
        type: Number,
        default: null
    },
    accessToken: {
        type: String,
        default: ""
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    address_line: {
        type: String,
        required: [true, "Provide address line"]
    },
    city: {
        type: String,
        required: [true, "Provide city"]
    },
    state: {
        type: String,
        required: [true, "Provide state"]
    },
    country: {
        type: String,
        default: "India"
    },
    pincode: {
        type: Number,
        required: [true, "Provide pincode"]
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    myOrders: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'order'
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: ""
    },
    role: {
        type: String,
        default: "SHOPOWNER"
    },
    shopOwner: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    ],
}, {
    timestamps: true
})

const shopOwnerModel = mongoose.models.shopOwner || mongoose.model("shopOwner", shopOwner)

export default shopOwnerModel