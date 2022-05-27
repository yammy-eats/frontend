import React from "react";
import {useForm} from "react-hook-form";

interface ILoginForm {
    email?: string;
    password?: string;
}

export const Login = () => {
    const {register, getValues , formState : {errors}, handleSubmit} = useForm<ILoginForm>();
    const onSubmit = () => {
        console.log(getValues())
    }
    return (
        <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
                <h3 className="text-2xl text-gray-800">Log In</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
                    <input {...register("email", {
                        required : "Email is required"
                    })}
                        required
                        placeholder="Email" className="input"/>
                    {errors.email?.message && (<span className="font-medium text-red-500">{errors.email?.message}</span>)}
                    <input {...register("password", {
                        required : "Password is required", minLength : 10
                    })}
                           required
                           placeholder="Password" className="input"/>
                    {errors.password?.type ==="minLength" && (<span className="font-medium text-red-500">비밀번호는 10자이상 입력해주세요</span>)}

                    <button className="btn mt-4">
                    Log In
                </button>
                </form>
            </div>
        </div>
    )
}