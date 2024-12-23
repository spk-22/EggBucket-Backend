import express from "express"
import { initializeApp } from "firebase/app"
import admin from "firebase-admin"
import NotFound from "./errors/notFound.js"
import dotenv from "dotenv"
import cors from "cors"
import customerRouter from "./routes/customerRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import deliveryPartnerRouter from "./routes/deliveryPartnerRouter.js"
import adminRouter from "./routes/adminRoutes.js"
import errorHandler from "./middleware/errorHandler.js"
dotenv.config()

const firebaseConfig = JSON.parse(process.env.FIREBASE_API_KEY)
initializeApp(firebaseConfig)
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "b2c-main",
    private_key_id: "19aeea50cf6376c66ed6d542062b90d307a0d923",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLjZ9M9qUbwadU\ns8Zxk90Mo6YjUIJwwhJuUBSFKBYgu4LAwCvdo7Zrvnwpc1YRBCYnuPLLzrY92zl8\n1nK+mk1rL9efT0Zu5H6fTI7a6GFsSMIrh0IFBlE1bAhxrpkXFq2IEsEj9HcLqim/\n50giNVd9wYS1TGChDLo6HIku5zF9UAZBT6slXNExA3cTglNoagoVCv/z6zi5QJMT\nwV97sjHyBjrYVyxmoB/FxahuGUNZt5CbKhH72PoUjBoeY+ziGiulqxwOp3ZU7pDA\nBaObf+VAlwKcAcEA48/zMgxIZBdG/a/9JvGD1qmjz9R3RmHRhawWTIIQYXsM03MQ\nj04h8p9hAgMBAAECggEABPHIdeOHNt7j3vCvqhCCtQlj9AWKPZu6H6n4poXVJRqD\nmtrpDsJhroI3o8bJ1ZXe0573bmy62m8/NaF8ltV1QaOtewKUr+kDUw7y2oL8qmWJ\nYz/ZsIc5JP9za4DZS7QA7lSF2b/nL7gSuTcF9nyKcXiEw1fCAHd9vB+FqVWByzB6\noQaHxq6u/mauMRX844gOxpbLp4anFAr+el22nZnrFMRHP7XP73+jVJub0nbpZExn\noqsJoH5QxVNKrqntVyhtJkry73k5GiytzT9sHboqVutCk8VIemJnUuM7w7tXPxMs\nxDeowIyoYYVTXWzgOLVjT6URZk3lUu77G3X6CYqSZwKBgQDqXe8NHmqHRVtDYT8d\nccKUxQ7MFOiTmhM4hawB9j6e0liqVcyxD0aps0YYntAZw1KjC5ksO/oi1MsO657v\nfPuXtN9yPG6ioLMKnAiXgLffwqwlkTN+G50aAAzcN906aIekQTKA4r512HJK4nGc\nn8NvURGJWCt4/VDBQ9f1qUrpSwKBgQDeV5BER228RPVydWcn47kSNAvjF86iFGHh\nqqHTmCUERKs/hG8cnngWUv4jniOC7Zg+7XybGh7oY2q9yNmODm+V3u4KOJ1GsMG2\n6dZuITjYcVKRgqYylQ0dyTWcS4bpM80YncUz2rbxCeMZaXsj1cs0LgIi1iVBGT58\noC9qxh76gwKBgQCbmJ16wjTLdfpvM4Lpk3sxtdprF36JcANOxUA7VTahztjazXfG\nHXQ2ejURZ26VjB2y7aJVwcQBl/DwCPJN4VZPk9+9Qe3ZvoLfilQR8X0h62bK0imz\nkbWta1ceZWBUxM04+agD9YWpS3gly0zORStFHjdcTdMe0l7o0JfyGuEHHQKBgQDS\nc29KMZHcsijgvd92EkYKxNi7ir07DK/ZOfkSnt/qulSdOm0xWY2xE70ZWYWjV+DT\nL1bSOFco/3D5UjMaEu/rm6cUZaH4VzYEPDGK7EcyF5FfyZomJo7Tsq/b0GFSOoXW\n1v7hphOi8wjR9NVpheNg8Gt1Ldz1UT+kFrrLBdwsoQKBgCIG1T+sLRKOi+sJf2aO\neT3SEJqF085lXwbVhUA76zf0PMMKGbmN5x/P6WULiybWJD5lzL9guqo8xMXVvunR\nhFspT7nyTPD/74TLK3dBA/MsdfxHbtfLSDaFk9Oe443XEiFzv4yyjJGKB5mHkhes\nOi9DRpVB1/imG22deK1PEYHV\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-hmp97@b2c-main.iam.gserviceaccount.com",
    client_id: "108416560128203101015",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hmp97%40b2c-main.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  })
})
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/customer", customerRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/deliveryPartner", deliveryPartnerRouter)
app.use("/api/v1/admin", adminRouter)

app.all("*", () => {
  throw new NotFound("Invalid route")
})

app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
