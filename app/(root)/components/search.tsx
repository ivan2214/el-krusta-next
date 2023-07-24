"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { InputHTMLAttributes, useState } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Search({ className, ...rest }: SearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handler for handling user input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita la acción por defecto del formulario (evitar redirección)
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      name: searchQuery,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    if (searchQuery !== "") {
      // Guardar la posición actual del scroll antes de redirigir
      const scrollY = window.scrollY;

      router.push(url);

      // Volver a la posición original del scroll después de la redirección
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 300);
    }
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    if (searchQuery === "" || searchQuery === null || !searchQuery) {
      setSearchQuery("");
      router.push("/");
    }

    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 300);
  }, [searchQuery]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleInputChange}
        type="search"
        placeholder="Search..."
        className={cn("md:flex md:w-[100px] lg:w-[200px]", className)}
        {...rest}
      />
    </form>
  );
}
