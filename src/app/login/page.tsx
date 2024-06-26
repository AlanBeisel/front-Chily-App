import { LoginForm } from '@/app/components/login/login';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen w-full h-full bg-red-500 items-center justify-start text-white font-semibold pt-[64px]">
      <h1 className="text-[40px]">Donde chily</h1>
      <h2 className="text-[24px] mt-[15px] mb-[52px]">Iniciar Sesión</h2>
      <LoginForm />
    </div>
  );
}
