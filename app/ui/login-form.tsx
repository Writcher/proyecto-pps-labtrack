import { doLogin } from "../actions";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
    return (
        <form action={doLogin} className="flex gap-5">
            <button type="submit" name="action" value="google" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-gray-100 border-2 border-orange-400 px-6 py-3 h-[75px] text-sm font-medium text-gray-600 transition-colors hover:bg-orange-300 md:text-base">
                <span>
                    Con Google
                </span>
                <ArrowRightIcon className="w-5 h-5 shrink-0"/>
            </button>
            <button type="submit" name="action" value="github" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-purple-400 border-2 border-purple-500 px-6 py-3 h-[75px] text-sm font-medium text-white transition-colors hover:bg-purple-300 md:text-base">
                <span>
                    Con Github 
                </span>
                <ArrowRightIcon className="w-5 h-5 shrink-0"/>
            </button>
        </form>
    )
}