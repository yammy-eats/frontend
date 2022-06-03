import React, {useEffect} from "react";
import {gql, useApolloClient, useMutation} from "@apollo/client";
import {verifyEmail, verifyEmailVariables} from "../../__generated__/verifyEmail";
import {useMe} from "../../hooks/useMe";
import {useNavigate} from "react-router-dom";

const VERIFY_EMAIl_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
            ok
            error
        }
    }
`

export const ConfirmEmail = () => {
    const {data : userData} = useMe();
    const client = useApolloClient();
    const navigate = useNavigate();
    const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIl_MUTATION)
    useEffect(() => {
        const [_, code] = window.location.href.split("code=");
        verifyEmail({
            variables: {
                input: {
                    code,
                }
            }
        }).then(res =>{
            if(res.data?.verifyEmail?.ok) {
                client.writeFragment({
                    id:`User:${userData?.me.id}`,
                    fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                    `,
                    data: {
                        verified: true
                    }
                })
                navigate("/");
            }
        })
    })

    return (
        <div className="mt-52 flex flex-col items-center justify-center">
            <h2 className="text-lg mb-1 font-medium">이메일 확인 중...</h2>
            <h4 className="text-gray-700 text-sm">페이지를 닫지 마세요...</h4>
        </div>
    )
}