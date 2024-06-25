import { LoginForm } from '@/app/components/login/login';

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full h-full bg-red-500 items-center justify-center p-4 text-white font-semibold text-[48px] pt-[98px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <LoginForm />
    </div>
  );
}
