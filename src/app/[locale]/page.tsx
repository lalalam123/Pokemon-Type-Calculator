"use client";
import Image from "next/image";

import React, { useState, useCallback } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { pokemon, PokemonType } from "./data";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

// Define the type for pokemonRates
type PokemonRate = {
  label: string;
  value: number;
};

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const translated = useTranslations("Index");
  const [pokemonType1, setPokemonType1] = useState("No");
  const [pokemonType2, setPokemonType2] = useState("No");
  const [pokemonTackleList, setPokemonTackleList] = useState<PokemonRate[]>([]);

  const calculateBestPokemonType = useCallback(() => {
    // console.log("Your opponents type is: ", pokemonType1, pokemonType2);

    let pokemonRates: PokemonRate[] = [];

    pokemon.forEach((pokemon: PokemonType) => {
      // Calculate the rate for the first Pokemon type
      let pokemonType1Rate = 1;
      if (pokemonType1 !== "No") {
        const typeKey = pokemonType1.toLowerCase() as keyof PokemonType;
        pokemonType1Rate = pokemon[typeKey] as number;
      }
      // Calculate the rate for the second Pokemon type
      let pokemonType2Rate = 1;
      if (pokemonType2 !== "No" && pokemonType2 !== pokemonType1) {
        const typeKey = pokemonType2.toLowerCase() as keyof PokemonType;
        pokemonType2Rate = pokemon[typeKey] as number;
      }
      // console.log(pokemonType1Rate, pokemonType2Rate);
      let totalRate = 1 * pokemonType1Rate * pokemonType2Rate;

      if (totalRate !== 1) {
        totalRate = Math.round(totalRate * 100) / 100;
      }
      pokemonRates.push({ label: pokemon.label, value: totalRate });
    });

    // Sort pokemonRates in descending order based on the value
    pokemonRates.sort((a: PokemonRate, b: PokemonRate) => b.value - a.value);
    // console.log(pokemonRates);
    setPokemonTackleList(pokemonRates);
  }, [pokemonType1, pokemonType2]);

  return (
    <NextUIProvider>
      <main className="dark flex min-h-screen flex-col items-center justify-normal pt-24">
        <Button
          onClick={() => {
            if (window.location.pathname === "/en") {
              router.push("/cn");
            } else {
              router.push("/en");
            }
          }}
          className="m-2"
        >
          {translated("changeLanguage")}
        </Button>
        <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-center">
            {translated("instruction")}
          </p>
          <div className="flex flex-col lg:flex-row lg:w-3/5">
            <Autocomplete
              defaultItems={pokemon}
              label={translated("pokemonType1")}
              placeholder={translated("selectPokemonTypePlaceholder")}
              value={pokemonType1}
              onSelectionChange={(value) => {
                if (value === null) {
                  setPokemonType1("No");
                } else {
                  setPokemonType1(value.toString());
                }
              }}
              className="m-2 text-center w-4/5 self-center lg:self-auto lg:w-1/2"
              isClearable={true}
            >
              {(pokemon) => (
                <AutocompleteItem
                  key={pokemon.value}
                  className="text-gray-700 bg-gray-200 text-center rounded-lg shadow-lg p-2 border-b border-gray-400"
                >
                  {translated(pokemon.label.toLowerCase())}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              defaultItems={pokemon}
              label={translated("pokemonType2")}
              placeholder={translated("selectPokemonTypePlaceholder")}
              value={pokemonType2}
              onSelectionChange={(value) => {
                if (value === null) {
                  setPokemonType2("No");
                } else {
                  setPokemonType2(value.toString());
                }
              }}
              className="m-2 text-center w-4/5 self-center lg:self-auto lg:w-1/2"
              isClearable={true}
            >
              {(pokemon) => (
                <AutocompleteItem
                  key={pokemon.value}
                  className="text-gray-700 bg-gray-200 text-center rounded-lg shadow-lg p-2 border-b border-gray-400"
                >
                  {translated(pokemon.label.toLowerCase())}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
        <Button
          onClick={calculateBestPokemonType}
          className="min-h-12 lg:h-auto m-2 text-center w-4/5 flex justify-center lg:self-auto lg:w-1/2"
        >
          {translated("calculate")}
        </Button>
        {pokemonTackleList.map((item, index) => (
          <div
            key={index}
            className="m-2 flex flex-row text-center align-middle justify-start items-center w-4/5 self-center lg:self-auto lg:w-1/2 bg-gray-200 rounded-lg p-4 shadow-lg dark:bg-gray-800"
          >
            <Image
              className="mr-4"
              src={`/image/Icon_${item.label}.webp`}
              width={28}
              height={28}
              alt={item.label}
            />
            <p className="text-white flex-grow font-bold text-lg mr-4">
              {translated(item.label.toLowerCase())}
            </p>
            <p
              className={`flex-grow text-right font-semibold ${
                item.value < 1 ? "text-red-500" : "text-green-500"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </main>
      <footer className="flex flex-col sm:flex-row justify-center items-center w-full h-auto border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-300 text-center">{translated("createdBy")}</p>
        <a
          href="https://github.com/lalalam123/Pokemon-Type-Calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-blue-500 hover:underline mr-3 text-center"
        >
          {translated("creator")}
        </a>
        <p className="text-gray-600 dark:text-gray-300 text-center">{translated("haveQuestion")}</p>
        <a
          href="https://github.com/lalalam123/Pokemon-Type-Calculator/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-blue-500 hover:underline mr-3 text-center"
        >
          {translated("giveAdvice")}
        </a>
        <p className="text-gray-600 dark:text-gray-300 text-center">{translated("or")}</p>
        <a
          href="mailto:jerrychan2206@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-blue-500 hover:underline mr-3 text-center"
        >
          {translated("contactMe")}
        </a>
      </footer>
    </NextUIProvider>
  );
}
