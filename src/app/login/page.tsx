import { LoginForm } from '@/app/components/login/login';

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full h-full bg-red-400 items-center justify-center p-4 text-white font-semibold text-[48px] pt-[98px]">
      <h1 className="flex flex-row">Donde Chily</h1>
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <LoginForm />
    </div>
  );
}
