"use client";

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChromeIcon, GithubIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "./ModalActions";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.status === 200) {
        toast({
          variant: "default",
          title: "Registered!",
        });
        setTimeout(() => {
          router.refresh();
        }, 500);
        loginModal.onClose();
      }

      if (callback?.error || callback?.error?.length) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-primary p-4  dark:bg-primary-foreground">
              <code className="text-primary-foreground dark:text-gray-300">
                {callback?.error
                  ? JSON.stringify(callback?.error, null, 2)
                  : JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Label>Email</Label>
      <Input id="email" disabled={isLoading} required />
      <Label>Password</Label>
      <Input id="password" type="password" disabled={isLoading} required />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button variant="outline" onClick={() => signIn("google")}>
        <ChromeIcon className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button variant="outline" onClick={() => signIn("github")}>
        <GithubIcon className="mr-2 h-4 w-4" />
        Continue with Github
      </Button>
      <div
        className="
     text-center font-light text-neutral-500"
      >
        <p>
          Primera vez?
          <span
            onClick={onToggle}
            className="
            cursor-pointer
            text-primary
            hover:underline
          "
          >
            {" "}
            Creee una cuenta
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      onToggle={onToggle}
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      description="Login to your account."
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
