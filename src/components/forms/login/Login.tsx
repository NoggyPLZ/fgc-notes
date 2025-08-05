'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../ui/Button"
import { useForm } from "react-hook-form";
import { TLoginSchema, loginSchema } from "@/lib/types";

type LoginProps = {
    handleClick:(e:any) => void
}

export default function Login(props:LoginProps){
    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting},
        reset,
        getValues,
    } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema)
    });
    const {handleClick} = props;

    const onSubmit = async (data:TLoginSchema) =>{
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    
    return( 
        <div onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[600px] mx-auto gap-5">
            Login
            <form className="flex flex-col gap-5">
                
                <input {...register('email')} placeholder="email" type="email" className=" border-1 border-gray-300 rounded-2xl p-5" />
                {errors.email && (
                    <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
                <input {...register('password')} placeholder="password" type="password" className=" border-1 border-gray-300 rounded-2xl p-5"/>
                {errors.password && (
                    <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
                <Button type="submit" style={'primary'} disabled={isSubmitting} >Log In</Button>
                <Button style={'secondary'} onClick={handleClick} value={'signup'}>Need an account? Sign up</Button>
            </form>
        </div>
    )
}