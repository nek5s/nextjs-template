import UserDisplay from "@/components/user-display";
import { getUser } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function Page() {
	const user = await getUser();
	if (!user) return redirect("/login");

	return (
		<div>
			<UserDisplay />

			<p>This is the home page.</p>
		</div>
	);
}
