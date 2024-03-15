'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { ClubChildrenType } from './definitions';
import { formatDateToLocal, generateSaturdays } from './utils';

const FormSchema = z.object({
  id: z.string(),
  childId: z.string(),
  name: z.string({
    invalid_type_error: 'Coloque um nome.',
    required_error: 'O campo nome é obrigatório',
  }).min(3, "Nome é obrigatório"),
  atualClub: z.enum(['ursinhos', 'faisca', 'flama', 'tocha', 'jv', 'vq7'], {
    invalid_type_error: 'Selecione um clube.',
  }),
  birthDate: z.string({
    invalid_type_error: 'Coloque uma data.',
    required_error: 'O campo data é obrigatório',
  }).min(3, "Data de Nascimento é obrigatório"),
  affiliation: z.enum(['Pais', 'Mãe', 'Pai', 'Avós', 'Responsável'], {
    invalid_type_error: 'Selecione uma filiação.',
  }),
  fone: z.string({
    invalid_type_error: 'Coloque um número.',
    required_error: 'O campo fone é obrigatório',
  }).min(3, "Telefone é obrigatório"),
  obs: z
    .string({
      invalid_type_error: 'Coloque um texto.',
    })
    .optional(),
  saved: z.enum(['sim', 'nao'], {
    invalid_type_error: 'Campo obrigatório.',
  }),
});
const CreateChild = FormSchema.omit({ id: true, childId: true });
const UpdateChild = FormSchema.omit({ id: true, childId: true });

export type State = {
  errors?: {
    name?: string[];
    atualClub?: string[];
    birthDate?: string[];
    affiliation?: string[];
    fone?: string[];
    obs?: string[];
    saved?: string[];
  };
  message?: string | null;
};

// CREATE
// export async function createInvoice(prevState: State, formData: FormData) {
//   // Validate form using Zod
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }

//   // Prepare data for insertion into the database
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0];

//   // Insert data into the database
//   try {
//     await sql`
//       INSERT INTO invoices (customer_id, amount, status, date)
//       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;
//   } catch (error) {
//     // If a database error occurs, return a more specific error.
//     return {
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }

//   // Revalidate the cache for the invoices page and redirect the user.
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }
export async function createChild(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateChild.safeParse({
    name: formData.get('name'),
    atualClub: formData.get('atualClub'),
    birthDate: formData.get('birthDate'),
    affiliation: formData.get('affiliation'),
    fone: formData.get('fone'),
    obs: formData.get('obs'),
    saved: formData.get('saved'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos em branco. Erro ao adicionar a criança.',
    };
  }

  // Prepare data for insertion into the database
  const { name, atualClub, birthDate, affiliation, fone, obs, saved } =
    validatedFields.data;
  const isSaved = saved == 'sim' ? true : false;

  // Insert data into the database
  try {
    const createdChildId = await sql<ClubChildrenType>`
      INSERT INTO children (name, talentos, atual_club, birth_date, affiliation, fone, obs, saved)
      VALUES (${name}, ${0}, ${atualClub}, ${birthDate}, ${affiliation}, ${fone}, ${obs}, ${isSaved})
      RETURNING id as child_id
    `;
    const data = createdChildId.rows;
    createRecord(data);
    createClubTable(data, atualClub)
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Erro ao adicionar a criança.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/attendant');
  redirect('/dashboard/attendant');
}

export async function createRecord(data: ClubChildrenType[] | ClubChildrenType) {
  // Prepare data for insertion into the database
  const date = new Date().toISOString().split('T')[0];
  const saturdays = generateSaturdays();
  let atualSaturday = '';

  // To know if today is a saturday
  for (let index = 0; index < saturdays.length; index++) {
    const saturday = saturdays[index];
    if (formatDateToLocal(date) === saturday) {
      atualSaturday = saturday;
      break;
    }
  }

  // Get the next saturday if today is not saturday
  if (formatDateToLocal(date) !== atualSaturday) {
    let todayDate = new Date();
    const dayName = new Array(
      'domingo',
      'segunda',
      'terça',
      'quarta',
      'quinta',
      'sexta',
      'sábado',
    );

    let isSaturday = 0;
    while (isSaturday < 1) {
      const otherDate = new Date(todayDate);
      otherDate.setDate(todayDate.getDate() + 1);
      todayDate = otherDate;

      if (dayName[todayDate.getDay()] === 'sábado') {
        atualSaturday = todayDate.toDateString();
        isSaturday = 1;
      }
    }
  }

  // Get the child Id
  let id
  if (Array.isArray(data)) {
    id = data.map((value) => {
      return value.child_id;
    })
  } else {
    id = data.child_id
  }

  // Insert data into the database
  try {
    await sql`
      INSERT INTO record (child_id, date, attendant)
      VALUES (${id.toString()}, ${atualSaturday}, ${'pending'})
      ON CONFLICT DO NOTHING
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Erro ao adicionar a presença da criança.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/attendant');
  redirect('/dashboard/attendant');
}

export async function createClubTable(data: ClubChildrenType[], club: string) {
  // Prepare data for insertion into the database
  // Get the child Id
  const id = data.map((value) => {
    return value.child_id
  });
  const talentos = data.map((value) => {
    return value.talentos
  });

  // Insert data into the database
  try {
    if (club === 'ursinhos') {
      await sql`
      INSERT INTO ursinhos (child_id, talentos)
      VALUES (${id.toString()}, ${Number(talentos)})
    `
    }
    if (club === 'faisca') {
      await sql`
      INSERT INTO faisca (child_id, talentos)
      VALUES (${id.toString()}, ${Number(talentos)})
    `
    }
    if (club === 'flama') {
      await sql`
      INSERT INTO flama (child_id, talentos)
      VALUES (${id.toString()}, ${Number(talentos)})
    `
    }
    if (club === 'tocha') {
      await sql`
      INSERT INTO tocha (child_id, talentos)
      VALUES (${id.toString()}, ${Number(talentos)})
    `
    }
    if (club === 'jv') {
      await sql`
      INSERT INTO jv (child_id, talentos)
      VALUES (${id.toString()}, ${Number(talentos)})
    `
    }
    if (club === 'vq7') {
      await sql`
      INSERT INTO vq7 (child_id, talentos)
      VALUES (${id.toString()}, ${Number(talentos)})
    `
    }
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Erro ao adicionar a criança no clube.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/attendant');
  redirect('/dashboard/attendant');
}

// UPDATE
// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;

//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }

//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }
export async function updateChild(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateChild.safeParse({
    name: formData.get('name'),
    atualClub: formData.get('atualClub'),
    birthDate: formData.get('birthDate'),
    affiliation: formData.get('affiliation'),
    fone: formData.get('fone'),
    obs: formData.get('obs'),
    saved: formData.get('saved'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos em branco. Erro ao atualizar a criança.',
    };
  }

  const { name, atualClub, birthDate, affiliation, fone, obs, saved } =
    validatedFields.data;

  try {
    await sql`
      UPDATE children
      SET name = ${name}, atual_club = ${atualClub}, birth_date = ${birthDate}, affiliation = ${affiliation}, fone = ${fone}, obs = ${obs}, saved = ${saved}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Erro ao atualizar a criança.' };
  }

  revalidatePath('/dashboard/attendant');
  redirect('/dashboard/attendant');
}

export async function updateAttendant(
  id: string,
  action: 'pending' | 'attendant',
) {
  try {
    await sql`UPDATE record SET attendant = ${action} WHERE child_id = ${id}`;
    revalidatePath('/dashboard/attendant');
    return { message: 'Presença Atualizada.' };
  } catch (error) {
    return { message: 'Database Error: Erro ao atualizar a presença.' };
  }
}

// DELETE
// export async function deleteInvoice(id: string) {
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice.' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice.' };
//   }
// }
export async function deleteChild(id: string) {
  try {
    await sql`DELETE FROM children WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Crinaça Deletada.' };
  } catch (error) {
    return { message: 'Database Error: Erro ao deletar a criança.' };
  }
}

// AUTH
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
