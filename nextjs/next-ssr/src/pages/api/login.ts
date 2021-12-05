import { NextApiResponse, NextApiRequest } from 'next';
import { withIronSessionApiRoute } from "iron-session/next";
import ironConfig from "../../util/iron-config";

export default withIronSessionApiRoute(login, ironConfig);

async function login(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;

    if (username === "user1@use.it" && password === "123456") {
        const user = {
            id: 1,
            name: "User"
        };
        req.session.user = user;
        await req.session.save();
        res.status(200).json(user);
        return;
    };
    res.status(401).json({message: "Unauthenticated"});
};