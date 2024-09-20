"use client";

import { useState } from "react";
import { TbAlertTriangleFilled } from "react-icons/tb";
import createIdentifier from "@/shared/utils/identifier/create-identifier-util";
import Input from "@/presentation/components/UI/Input";
import Button from "@/presentation/components/UI/Button";

export default function ChangeIdentifier({ me, validateIdentifier, applyChangeIdentifier }) {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [invalidIdentifier, setInvalidIdentifier] = useState(false);
	const [identifier, setIdentifier] = useState(me.prisma.identifier);

	async function handleApplyChange() {
		if (invalidIdentifier)
			return;

		if (identifier.trim().length < 2) {
			setLoading(false);
			setError("Identifier must be atleast 2 length.");
			return;
		}

		if (identifier.trim().length > 64) {
			setLoading(false);
			setError("Identifier must be atleast lower than 64 characters.");
			return;
		}

		setLoading(true);
		setSuccess(false);
		setError('');

		const validIdentifier = await validateIdentifier(identifier);
		if (!validIdentifier) {
			setError(`User identifier ${identifier} already exist.`);
			setLoading(false);
			return;
		}

		const res = await applyChangeIdentifier(me.prisma.gid, identifier);
		if (!res)
			setError("G-ID Invalid.");
		else
			setSuccess(true);
		setLoading(false);
	}

	function handleChangeIdentifier(value) {
		const PRE_IDENTIFIER = createIdentifier(value);
		setIdentifier(PRE_IDENTIFIER);

		if (PRE_IDENTIFIER === "@me")
			setInvalidIdentifier(true);
		else
			setInvalidIdentifier(false);
	}

	return (
		<div>
			<p className="font-semibold">Identifier</p>
			{invalidIdentifier && (
				<div className="rounded-xl bg-amber-100 border border-amber-300 p-4 mt-5">
					<TbAlertTriangleFilled className="text-amber-600 mx-auto" size={20} />
					<p className="text-xs text-center text-amber-600 font-bold select-none">Alert: You can&apos;t use &quot;@me&quot; as a user identifier.</p>
				</div>
			)}
			<p className="text-xs text-red-500 font-semibold select-none">{error}</p>
			{success && (<p className="text-xs text-green-500 font-semibold select-none">Identifier updated. Refresh to apply changes.</p>)}
			<div className="mt-5">
				<Input
					type="text"
					value={identifier}
					onChange={(e) => handleChangeIdentifier(e.target.value)}
					placeholder="e.g. @fulano"
				/>
				<p className="text-xs text-zinc-700 select-none mt-2">
					When you change your <strong>@username identifier</strong>, it is crucial to understand that this decision has <strong>permanent and irreversible consequences</strong> across your account and online presence. Here are the key points you need to be aware of:
				</p>
				<ul className="list-disc ml-5 mt-5">
					<li className="text-xs select-none text-zinc-700">
						<strong>Old URLs Will No Longer Work</strong>: Any URLs, links, or references that used your previous identifier will stop functioning. For example, if you have shared links, profiles, or posts associated with your old identifier, they will not redirect to your new one. This means anyone attempting to visit your previous links will encounter a &apos;page not found&apos; error.
					</li>
					<li className="text-xs select-none text-zinc-700">
						<strong>No Turning Back</strong>: Once the change is made, you <strong>cannot revert</strong> to your previous identifier, especially if it becomes claimed by another user or is deactivated by the system. Your new identifier will be the only one recognized and linked to your account moving forward.
					</li>
				</ul>
				<p className="text-xs text-zinc-700 select-none mt-2">
					Please be certain before proceeding with this change, as it will significantly affect how others find and interact with your content online.
				</p>
				<Button disabled={loading} onClick={handleApplyChange} className="text-sm mt-5 !rounded-full">{loading ? "Wait..." : "Apply Change"}</Button>
			</div>
		</div>
	);
}