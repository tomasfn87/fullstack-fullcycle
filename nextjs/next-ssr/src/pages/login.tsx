import { FormEvent } from "react";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

const LoginPage = () => {
    const router = useRouter();

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        const username = (
            document.querySelector("#username") as HTMLInputElement
        ).value;
        const password = (
            document.querySelector("#password") as HTMLInputElement
        ).value;

        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/login",
                { 
                    username,
                    password
                }
            );
            console.log(data);
            router.push("/users")
        } catch (err) {
            console.error(err);
            alert("Invalid login");
        }
    }

    return (
        <div>
            <h2>Login with User and Password</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="#username">Enter User:</label>
                <br />
                <input id="username" type="text" placeholder="user" />
                <br/><br/>
                <label htmlFor="#username">Enter Password:</label>
                <br />
                <input id="password" type="password" placeholder="password" />
                <br/><br/>
                <button type="submit">Fazer login</button>
            </form>
        </div>
    );
};

export default LoginPage;
