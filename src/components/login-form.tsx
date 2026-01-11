"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

export function LoginForm({ className, onSignup, onSignin, ...props }: React.ComponentProps<"div"> & { onSignup: (id: string, password: string) => void, onSignin: (id: string, password: string) => void }) {
	const [id, setId] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isSignup, setIsSignup] = React.useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSignup) onSignup(id, password);
		else onSignin(id, password);
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>{isSignup ? "Sign up" : "Login"}</CardTitle>
					<CardDescription>Enter your credentials to {isSignup ? "create an account" : "sign in"}</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="id">ID</FieldLabel>
								<Input id="id" type="text" required value={id} onChange={e => setId(e.target.value)} />
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
							</Field>
							<Field>
								<Button type="submit">{isSignup ? "Sign up" : "Log in"}</Button>
								<FieldDescription className="text-center">
									{!isSignup && <>Don&apos;t have an account? <a href="#" onClick={() => setIsSignup(true)}>Sign up instead</a></>}
									{isSignup && <>Already have an account? <a href="#" onClick={() => setIsSignup(false)}>Log in instead</a></>}
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
