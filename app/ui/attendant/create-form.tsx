'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CalendarIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createChild } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import React from 'react';
import clsx from 'clsx';

export default function Form({ currentUserClub }: { currentUserClub: string }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createChild, initialState);

  return (
    <form action={dispatch}>
      <div className={clsx("rounded-md p-4 md:p-6", {
        'bg-red-300': currentUserClub === 'ursinhos',
        'bg-yellow-300': currentUserClub === 'faisca',
        'bg-green-300': currentUserClub === 'flama',
        'bg-blue-300': currentUserClub === 'tocha',
        'bg-gray-300': currentUserClub === 'jv',
        'bg-gray-400': currentUserClub === 'vq7',
      })}>
        {/* Child Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nome da Criança
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Digite o nome completo"
                aria-describedby="name-error"
                className={clsx("peer block w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-600", {
                  'bg-red-200': currentUserClub === 'ursinhos',
                  'bg-yellow-200': currentUserClub === 'faisca',
                  'bg-green-200': currentUserClub === 'flama',
                  'bg-blue-200': currentUserClub === 'tocha',
                  'bg-gray-200': currentUserClub === 'jv',
                  'bg-gray-400': currentUserClub === 'vq7',
                })}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Child Birth Date */}
        <div className="mb-4">
          <label htmlFor="birthDate" className="mb-2 block text-sm font-medium">
            Data de Nascimento da Criança
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                defaultValue=""
                placeholder="Digite o nascimento em DD/MM/AAAA"
                aria-describedby="birthDate-error"
                className={clsx("peer block w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-600", {
                  'bg-red-200': currentUserClub === 'ursinhos',
                  'bg-yellow-200': currentUserClub === 'faisca',
                  'bg-green-200': currentUserClub === 'flama',
                  'bg-blue-200': currentUserClub === 'tocha',
                  'bg-gray-200': currentUserClub === 'jv',
                  'bg-gray-400': currentUserClub === 'vq7',
                })}
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="birthDate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.birthDate &&
              state.errors.birthDate.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Child Fone */}
        <div className="mb-4">
          <label htmlFor="fone" className="mb-2 block text-sm font-medium">
            Telefone do Responsável
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fone"
                name="fone"
                type="tel"
                placeholder="Digite o telefone 85999999999"
                aria-describedby="fone-error"
                className={clsx("peer block w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-600", {
                  'bg-red-200': currentUserClub === 'ursinhos',
                  'bg-yellow-200': currentUserClub === 'faisca',
                  'bg-green-200': currentUserClub === 'flama',
                  'bg-blue-200': currentUserClub === 'tocha',
                  'bg-gray-200': currentUserClub === 'jv',
                  'bg-gray-400': currentUserClub === 'vq7',
                })}
              />
              <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="fone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fone &&
              state.errors.fone.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Child Obs */}
        <div className="mb-4">
          <label htmlFor="obs" className="mb-2 block text-sm font-medium">
            Observações
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="obs"
                name="obs"
                rows={5}
                aria-describedby="obs-error"
                className={clsx("peer block w-full rounded-md border py-2 text-sm outline-2 placeholder:text-gray-600", {
                  'bg-red-200': currentUserClub === 'ursinhos',
                  'bg-yellow-200': currentUserClub === 'faisca',
                  'bg-green-200': currentUserClub === 'flama',
                  'bg-blue-200': currentUserClub === 'tocha',
                  'bg-gray-200': currentUserClub === 'jv',
                  'bg-gray-400': currentUserClub === 'vq7',
                })}
              />
            </div>
          </div>
          <div id="obs-error" aria-live="polite" aria-atomic="true">
            {state.errors?.obs &&
              state.errors.obs.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Child Saved */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            É Salva(o)?
          </legend>
          <div className={clsx("rounded-md border border-gray-500 px-[14px] py-3", {
            'bg-red-200': currentUserClub === 'ursinhos',
            'bg-yellow-200': currentUserClub === 'faisca',
            'bg-green-200': currentUserClub === 'flama',
            'bg-blue-200': currentUserClub === 'tocha',
            'bg-gray-200': currentUserClub === 'jv',
            'bg-gray-400': currentUserClub === 'vq7',
          })}>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="sim"
                  name="saved"
                  type="radio"
                  value="sim"
                  aria-describedby="saved-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="sim"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Sim <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="nao"
                  name="saved"
                  type="radio"
                  value="nao"
                  aria-describedby="saved-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="nao"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Não <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="saved-error" aria-live="polite" aria-atomic="true">
            {state.errors?.saved &&
              state.errors.saved.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Child Affiliation */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Filiação
          </legend>
          <div className={clsx("rounded-md border border-gray-500 px-[14px] py-3", {
            'bg-red-200': currentUserClub === 'ursinhos',
            'bg-yellow-200': currentUserClub === 'faisca',
            'bg-green-200': currentUserClub === 'flama',
            'bg-blue-200': currentUserClub === 'tocha',
            'bg-gray-200': currentUserClub === 'jv',
            'bg-gray-400': currentUserClub === 'vq7',
          })}>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  id="pais"
                  name="affiliation"
                  type="radio"
                  value="Pais"
                  aria-describedby="affiliation-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pais"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Pais <UserIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="mae"
                  name="affiliation"
                  type="radio"
                  value="Mãe"
                  aria-describedby="affiliation-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="mae"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Só a Mãe <UserIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pai"
                  name="affiliation"
                  type="radio"
                  value="Pai"
                  aria-describedby="affiliation-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pai"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Só o Pai <UserIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="avos"
                  name="affiliation"
                  type="radio"
                  value="Avós"
                  aria-describedby="affiliation-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="avos"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Avós <UserIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="responsavel"
                  name="affiliation"
                  type="radio"
                  value="Responsável"
                  aria-describedby="affiliation-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="responsavel"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Responsáveis <UserIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="affiliation-error" aria-live="polite" aria-atomic="true">
            {state.errors?.affiliation &&
              state.errors.affiliation.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Child Atual Club */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Qual o clube a criança irá começar?
          </legend>
          <div className={clsx("rounded-md border border-gray-500 px-[14px] py-3", {
            'bg-red-200': currentUserClub === 'ursinhos',
            'bg-yellow-200': currentUserClub === 'faisca',
            'bg-green-200': currentUserClub === 'flama',
            'bg-blue-200': currentUserClub === 'tocha',
            'bg-gray-200': currentUserClub === 'jv',
            'bg-gray-400': currentUserClub === 'vq7',
          })}>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  id="ursinhos"
                  name="atualClub"
                  type="radio"
                  value="ursinhos"
                  aria-describedby="atualClub-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="ursinhos"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Ursinhos <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="faisca"
                  name="atualClub"
                  type="radio"
                  value="faisca"
                  aria-describedby="atualClub-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="faisca"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Faisca <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="flama"
                  name="atualClub"
                  type="radio"
                  value="flama"
                  aria-describedby="atualClub-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="flama"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Flama <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="tocha"
                  name="atualClub"
                  type="radio"
                  value="tocha"
                  aria-describedby="atualClub-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="tocha"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Tocha <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="jv"
                  name="atualClub"
                  type="radio"
                  value="jv"
                  aria-describedby="atualClub-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="jv"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white"
                >
                  JV <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="vq7"
                  name="atualClub"
                  type="radio"
                  value="vq7"
                  aria-describedby="atualClub-error"

                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="vq7"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  VQ7 <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="atualClub-error" aria-live="polite" aria-atomic="true">
            {state.errors?.atualClub &&
              state.errors.atualClub.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div id="general-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && state.errors?.birthDate && state.errors?.fone && state.errors?.saved && state.errors?.affiliation && state.errors?.atualClub &&
              <p className="mt-2 text-sm text-red-500" key={state.message}>
                {state.message}
              </p>
            }
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/attendant"
          className={clsx("flex h-10 items-center rounded-lg px-4 text-sm font-medium text-black transition-colors", {
            'bg-red-300 hover:bg-red-200': currentUserClub === 'ursinhos',
            'bg-yellow-300 hover:bg-yellow-200': currentUserClub === 'faisca',
            'bg-green-300 hover:bg-green-200': currentUserClub === 'flama',
            'bg-blue-300 hover:bg-blue-200': currentUserClub === 'tocha',
            'bg-gray-300 hover:bg-gray-200': currentUserClub === 'jv',
            'bg-gray-400 hover:bg-gray-200': currentUserClub === 'vq7',
          })}
        >
          Cancelar
        </Link>
        <Button className={clsx('', {
          'bg-red-600 hover:bg-red-500 focus-visible:outline-red-500 active:bg-red-600': currentUserClub === 'ursinhos',
          'bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-500 active:bg-yellow-600': currentUserClub === 'faisca',
          'bg-green-600 hover:bg-green-500 focus-visible:outline-green-500 active:bg-green-600': currentUserClub === 'flama',
          'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-500 active:bg-blue-600': currentUserClub === 'tocha',
          'bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-500 active:bg-gray-600': currentUserClub === 'jv',
          'bg-gray-700 hover:bg-gray-500 focus-visible:outline-gray-500 active:bg-gray-600': currentUserClub === 'vq7',
        })} type="submit">Adicionar Criança</Button>
      </div>
    </form>
  );
}