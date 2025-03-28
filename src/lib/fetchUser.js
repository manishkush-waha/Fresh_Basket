"use client"
import jwt from 'jsonwebtoken'

export async function fetchUser(accessToken) {
    console.log(process.env.JWT_SECRET_KEY_ACCESS_TOKEN);
    const jsldk = 'askdj234k234laskdja293749823skdjaklsjdl234923d234'
    
    const varifyToken = jwt.verify(accessToken, jsldk);
    const decodedToken = jwt.decode(accessToken);

    const currentTime = new Date().getTime();
    if (decodedToken) {
        // if (decodedToken.exp )
        console.log(varifyToken, decodedToken, currentTime);
    } else {
        console.log("nahi mila");
    }
}