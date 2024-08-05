import LabTrackLogo from "../ui/labtrack-logo";
import LoginForm from "../ui/login-form";

export default function Login() {
    return (
        <div className="flex h-screen bg-cover items-center justify-center bg-gray-200 bg-opacity-70" style={{ backgroundImage: "url('/research-background.png')" }}>
            <div className="absolute inset-0 bg-black opacity-10"/>
            <div className="relative flex flex-col bg-gray-100 bg-opacity-100 md:border-l-4 md:border-r-4 md:border-blue-900 shadow-xl items-center h-screen w-screen md:w-[65%]">
                <div className="flex shrink-0 p-6 items-end items-center justify-center rounded-lg bg-gray-200 p-6 h-[15%] mt-6">
                    <LabTrackLogo />
                </div>
                <div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
  }