"use client";
import { LoginForm } from "@/components/login-form";
import { signIn, signUp } from "@/lib/db/auth";

export default function Page() {
	const onSignup = (id: string, password: string) => signUp(id, password).then(user => { if (user) location.href = "/"; });
	const onSignin = (id: string, password: string) => signIn(id, password).then(user => { if (user) location.href = "/"; });

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm onSignup={onSignup} onSignin={onSignin} />
			</div>
		</div>
	)
}
