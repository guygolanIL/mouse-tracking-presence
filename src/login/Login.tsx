import { useState } from "react";
import "./Login.css";

export function Login(props: { onLogin: (user: string) => void }) {
    const [name, setName] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.onLogin(name);
    };
    return <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    maxLength={5}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
}