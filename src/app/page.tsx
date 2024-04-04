"use client";
import Image from "next/image";

import React, { useState, useCallback } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { pokemon, PokemonType } from "./data";
import { useTranslation } from "next-i18next";

// Define the type for pokemonRates
type PokemonRate = {
  label: string;
  value: number;
};

export default function Home() {
  const { t } = useTranslation();
  const [pokemonType1, setPokemonType1] = useState("No");
  const [pokemonType2, setPokemonType2] = useState("No");
  const [pokemonTackleList, setPokemonTackleList] = useState<PokemonRate[]>([]);

  const getPokemonType = useCallback(() => {
    console.log(pokemonType1, pokemonType2);
  }, [pokemonType1, pokemonType2]);

  const calculateBestPokemonType = useCallback(() => {
    console.log("Your opponents type is: ", pokemonType1, pokemonType2);

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
      console.log(pokemonType1Rate, pokemonType2Rate);
      let totalRate = 1 * pokemonType1Rate * pokemonType2Rate;
      pokemonRates.push({ label: pokemon.label, value: totalRate });
    });

    // Sort pokemonRates in descending order based on the value
    pokemonRates.sort((a: PokemonRate, b: PokemonRate) => b.value - a.value);
    console.log(pokemonRates);
    setPokemonTackleList(pokemonRates);
  }, [pokemonType1, pokemonType2]);

  return (
    <NextUIProvider>
      <main className="dark flex min-h-screen flex-col items-center justify-normal pt-24">
        <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-center">
            Enter the type of pokemon that you are attacking&nbsp; {t("hello")}
          </p>
          <div className="flex flex-col lg:flex-row lg:w-3/5">
            <Autocomplete
              defaultItems={pokemon}
              label="Pokemon Type 1"
              placeholder="Select a Pokemon Type"
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
                <AutocompleteItem key={pokemon.value} className="text-black bg-white text-center">
                  {pokemon.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              defaultItems={pokemon}
              label="Pokemon Type 2"
              placeholder="Select a Pokemon Type"
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
                <AutocompleteItem key={pokemon.value} className="text-black bg-white text-center">
                  {pokemon.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
        <Button
          onClick={calculateBestPokemonType}
          className="min-h-12 lg:h-auto m-2 text-center w-4/5 flex justify-center lg:self-auto lg:w-1/2"
        >
          Calculate
        </Button>
        {pokemonTackleList.map((item, index) => (
          <div
            key={index}
            className="m-2 flex flex-row text-center align-middle justify-center items-center w-4/5 self-center lg:self-auto lg:w-1/2 bg-gray-200 rounded-lg p-4 shadow-lg dark:bg-gray-800"
          >
            <Image
              className="mr-4"
              src={`/image/Icon_${item.label}.webp`}
              width={28}
              height={28}
              alt={item.label}
            />
            <p className="font-bold text-lg mr-4">{item.label}</p>
            <p className={`font-semibold ${item.value < 1 ? "text-red-500" : "text-green-500"}`}>
              {item.value}
            </p>
          </div>
        ))}
      </main>
    </NextUIProvider>
  );
}
