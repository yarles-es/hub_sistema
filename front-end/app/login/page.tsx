"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import useAlert from "@/hooks/useAlert";
import { useCheckAuth } from "@/hooks/useCheckAuth";

const LoginPage = () => {
  const { isAuthenticated, login, logout } = useCheckAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const alert = useAlert();

  const togglePasswordVisibility = (status: boolean) => {
    setPasswordVisible(status);
  };

  const validateLogin = () => {
    if (loginName === "") {
      alert("O campo de usuário não pode estar vazio", "error");
      return false;
    }

    if (password === "") {
      alert("O campo de senha não pode estar vazio", "error");
      return false;
    }
    return true;
  };

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    name === "login" ? setLoginName(value) : setPassword(value);
  };

  const singIn = () => {
    if (!validateLogin()) return;
    login(loginName, password);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 1 ) Fecha o teclado antes de tudo
    (document.activeElement as HTMLElement | null)?.blur();
    // 2 ) Aguarda o teclado desaparecer
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 200);

    singIn();
  };

  useEffect(() => {
    return () => {
      setLoginName("");
      setPassword("");
    };
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col lg:justify-center lg:items-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="fixed top-5 right-5 z-50">
        <DarkModeSwitcher />
      </div>
      <div className="flex flex-wrap items-center lg:flex-col xl:flex-row lg:justify-center border-x-body bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="w-screen flex xl:hidden justify-center">
          <Image
            className="block"
            priority
            src={"/erp-academia/images/logo/nova_meta.png"}
            alt="Logo"
            width={250}
            height={250}
          />
        </div>
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Image
              priority
              className="block"
              src={"/erp-academia/images/logo/nova_meta.png"}
              alt="Logo"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="w-screen border-stroke flex justify-center dark:border-strokedark lg:max-w-150 xl:w-1/2 xl:border-l-2">
          <div className="w-full flex flex-col lg:justify-center p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-4 lg:mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Central
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    name="login"
                    onChange={handleLogin}
                    type="email"
                    placeholder="Digite seu email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#a4a0a0"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Senha
                </label>
                <div className="relative">
                  <input
                    autoComplete="off"
                    name="password"
                    onChange={handleLogin}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4 cursor-pointer">
                    {!passwordVisible ? (
                      <div onClick={() => togglePasswordVisibility(true)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#a4a0a0"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="1"
                            ry="1"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    ) : (
                      <div onClick={() => togglePasswordVisibility(false)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#3fb2d1"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="1"
                            ry="1"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                        </svg>
                      </div>
                    )}
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Login"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
