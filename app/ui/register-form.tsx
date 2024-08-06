import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { fetchLab } from "../lib/data";

export default async function RegisterForm() {
    const lab = await fetchLab();

    return (
        <div className="flex flex-col gap-5 justify-center">
            <form className="flex flex-col justify-center">
                <div className="flex flex-row gap-5 justify-center">
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-gray-700 text-center mb-2">Nombre y Apellido</label>
                        <input
                            type="string"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingresa tu nombre y apellido"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="legajo" className="block font-medium text-gray-700 text-center mb-2">Legajo</label>
                        <input
                            type="string"
                            id="legajo"
                            name="legajo"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingresa tu legajo"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="mb-4">
                        <label htmlFor="lab" className="block font-medium text-gray-700 text-center mb-2">Laboratorio</label>
                        <select id="labSelect" name="userType" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center" required>
                            <option value="" className="sm:text-sm text-center">Seleciona un laboratorio</option>
                            {lab.map(lab => (
                                <option key={lab.id} value={lab.id}>
                                    {lab.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-700 text-center mb-2">Correo Electronico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingressa tu email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-medium text-gray-700 text-center mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 text-center mb-2">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center"
                            placeholder="Repite tu contraseña"
                            required
                        />
                    </div>
                    <button type="submit" className="flex flex-1 self-start justify-center items-center gap-5 rounded-lg bg-orange-400 px-6 py-3 h-[75px] text-sm font-medium text-white transition-colors hover:bg-orange-300 md:text-base w-full">
                        <span>
                            Registrarse
                        </span>
                        <ArrowRightIcon className="w-5 h-5 shrink-0"/>
                    </button>
                </div>
            </form>
        </div>
    )
}