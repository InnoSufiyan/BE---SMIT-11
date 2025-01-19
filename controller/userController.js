import Users from "../models/Users.js"
import { redis } from '../index.js'

export const getUsers = async (req, res) => {
    const redisDataWithOutParse = await redis.get("users")

    const redisData = JSON.parse(redisDataWithOutParse)
    console.log(redisData, "==>> redisData")
    if (redisData) {
        console.log("===>> redis main data mil gaya, redis se show karwa raha hun")
        return res.send(redisData)
    }
    console.log("===>> redis main data nahin mila, mongodb jaa raha hun")
    const users = await Users.find()
    res.send(users)
    redis.set("users", JSON.stringify(users))
}
export const getUser = async (req, res) => {
    const { id } = req.params
    const singleUserData = await redis.get(id)

    const singleUser = JSON.parse(singleUserData)

    if (singleUser) {
        console.log("==>> redis main data mil gaya")
        return res.send(singleUser)
    }
    console.log("==>> redis main data nahin mila")

    const user = await Users.findById(id)
    redis.setex(id, 180, JSON.stringify(user))
    res.send(user)
}   

export const addUser = (req, res) => {
    redis.del("users")
}