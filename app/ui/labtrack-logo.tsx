import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function LabTrackLogo() {
    return (
        <div className="flex flex-row text-white items-center">
            <AcademicCapIcon className="h-10 w-10 rotate-[15deg] text-orange-400"/>
            <div className="text-blue-900 text-[30px] font-medium px-2">
                LabTrack
            </div>
        </div>
    )
}