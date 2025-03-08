import React from "react"
import { Link } from "react-router-dom"

function RegisterPage() {
    return (
        <div>
            <h2>Register</h2>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    )
}

export default RegisterPage