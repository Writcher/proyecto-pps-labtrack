import LabTrackLogo from "../ui/labtrack-logo";
import RegisterForm from "../ui/register-form";

export default function Register() {
    return (
        <div className="flex h-screen bg-cover items-center justify-center bg-gray-200 bg-opacity-70" style={{ backgroundImage: "url('/research-background.png')" }}>
            <div className="absolute inset-0 bg-black opacity-10"/>
            <div className="relative flex flex-col bg-gray-100 bg-opacity-100 md:border-l-4 md:border-r-4 md:border-blue-900 shadow-xl items-center h-screen w-screen md:w-[65%]">
                <div className="flex shrink-0 p-6 items-end items-center justify-center rounded-lg bg-gray-200 border-2 border-gray-300 p-6 h-[100px] mt-6">
                    <LabTrackLogo />
                </div>
                <div className="flex flex-col shrink-0 items-end items-center justify-center rounded-lg bg-gray-200 border-2 border-gray-300 p-6 mt-6 gap-6 md:w-[50%]">
                    <h2 className="flex text-center text-blue-900 text-xl md:text-3xl font-medium"> Registro </h2>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
  }