const ironConfig = {
    password: '12345678123456781234567812345678',
    cookieName: 'iron-session-cookie',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production' ? true : false
    },
};

declare module 'iron-session' {
    interface IronSessionData {
        user?: {
            id: number,
            name: string
        };
    }
};

export default ironConfig;