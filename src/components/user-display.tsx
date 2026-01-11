"use client";
import { useAuth } from "@/lib/client/auth";
import { signOut } from "@/lib/db/auth";

export default function UserDisplay() {
	const user = useAuth();

	const onSignIn = () => location.href = "/login";
	const onSignOut = () => signOut().then(() => location.href = "/login");

	return (
		<div>
			{!user && <p>Not signed in. <a className="hover:underline" onClick={onSignIn}>Click here to sign in</a></p>}
			{user && <p>Signed in as {user.id}. <a className="hover:underline" onClick={onSignOut}>Click here to sign out</a></p>}
		</div>
	);
}