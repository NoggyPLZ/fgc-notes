"use client"
import Login from "./login/Login"
import Signup from "./signup/Signup"
import Button from "../ui/Button"
import { useState } from "react"

type ToggleFormType = 'signup' | 'login' | null;

export default function ToggleLogin(){
    const [toggleForm, setToggleForm] = useState<ToggleFormType>(null)

    const handleClick = (e:any) =>{
        const value: ToggleFormType = e.target.value;
        setToggleForm(value);
    }

    return (
        <div>
            {!toggleForm &&
            <div className="w-[600px] flex flex-col p-5 rounded-2xl mx-auto gap-5">
                <Button onClick={handleClick} value="login" style="primary">Log in</Button>
                <Button onClick={handleClick} value="signup" style="secondary">Sign Up</Button>
            </div>
            }

            {toggleForm === 'login' && <Login handleClick={handleClick}/>}
            {toggleForm === 'signup' && <Signup handleClick={handleClick}/>}
        </div>
    )
}