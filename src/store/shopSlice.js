import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id: "",
    name: "",
    email: "",
    shopBannerImage: "",
    shopLogo: "",
    shopName: "",
    description: "",
    mobile: null,
    accessToken: "",
    refresh_token: "",
    verify_email: false,
    address_line: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    last_login_date: "",
    status: "Active",
    myOrders: [],
    forgot_password_otp: null,
    forgot_password_expiry: "",
    role: "SHOPOWNER"
}

const shopSlice = createSlice({
    name: 'shop',
    initialState: initialValue,
    reducers: {
        setShopDetails: (state, action) => {
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.shopBannerImage = action.payload?.shopBannerImage
            state.shopLogo = action.payload?.shopLogo
            state.shopName = action.payload?.shopName
            state.description = action.payload?.description
            state.mobile = action.payload?.mobile
            state.accessToken = action.payload?.accessToken
            state.refresh_token = action.payload?.refresh_token
            state.verify_email = action.payload?.verify_email
            state.address_line = action.payload?.address_line
            state.city = action.payload?.city
            state.state = action.payload?.state
            state.country = action.payload?.country
            state.pincode = action.payload?.pincode
            state.last_login_date = action.payload?.last_login_date
            state.status = action.payload?.status
            state.myOrders = action.payload?.myOrders || []
            state.role = action.payload?.role
        },
        updateShopImages: (state, action) => {
            if (action.payload?.banner) {
                state.shopBannerImage = action.payload.banner
            }
            if (action.payload?.logo) {
                state.shopLogo = action.payload.logo
            }
        },
        updateShopStatus: (state, action) => {
            state.status = action.payload
        },
        addOrder: (state, action) => {
            state.myOrders.push(action.payload)
        },
        logoutShop: (state) => {
            return initialValue
        }
    }
})

export const { setShopDetails, updateShopImages, updateShopStatus, addOrder, logoutShop } = shopSlice.actions

export default shopSlice.reducer