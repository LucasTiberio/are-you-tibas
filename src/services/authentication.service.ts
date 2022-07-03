import { NextApiRequest, NextApiResponse } from "next";
import { Profile } from "../models/Profile.model";
import ApiError from "../utils/ApiError";
import TibasToken from "../utils/TibasToken";

export const login = async (req: NextApiRequest, res: NextApiResponse): Promise<void | null> => {
    try {
        const { login, password } = req.body;
        if (!login || !password) throw 'invalid body'

        const profile = await Profile.findOne({ login }).exec()

        if (!profile || (profile.password !== password && !profile.validPassword(password)))
        throw new ApiError(422, 'Invalid email or password')

        const tibasToken = new TibasToken().generate(profile.mapper());

        res.status(202).json({ tibasToken })
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const verify = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    const { tibasToken } = req.body;

    try {
        return res.status(202)
    } catch (error) {
        return res.status(500).json(error);
    }
}