import { sql } from '@vercel/postgres';
import {
  User,
  Child,
  Record,
  ChildField,
  ChildrenTableType,
  InvoicesTable,
  ClubChildrenTableType,
  InvoiceForm,
  TopFiveChildren,
  ClubChildrenType,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const data = await sql`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql`
       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
       FROM invoices
       JOIN customers ON invoices.customer_id = customers.id
       ORDER BY invoices.date DESC
       LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData(club: string) {
  noStore();
  try {
    let data
    let childCountPromise;
    let talentosCountPromise;
    let topSectionsPromise;
    let topAttendantPromise;

    if (club === 'ursinhos') {
      childCountPromise = sql`
          SELECT COUNT(*) FROM ursinhos 
    `;
      talentosCountPromise = sql`
          SELECT COUNT(*) 
          FROM sections
          INNER JOIN children ON children.id = sections.child_id
          INNER JOIN ursinhos ON ursinhos.child_id = sections.child_id
    `;
      topSectionsPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN sections ON sections.child_id = children.id
          INNER JOIN ursinhos ON ursinhos.child_id = sections.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
      topAttendantPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN record ON record.child_id = children.id
          INNER JOIN ursinhos ON ursinhos.child_id = record.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
    }
    if (club === 'faisca') {
      childCountPromise = sql`
          SELECT COUNT(*) FROM faisca 
    `;
      talentosCountPromise = sql`
          SELECT COUNT(*) 
          FROM sections
          INNER JOIN children ON children.id = sections.child_id
          INNER JOIN faisca ON faisca.child_id = sections.child_id
    `;
      topSectionsPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN sections ON sections.child_id = children.id
          INNER JOIN faisca ON faisca.child_id = sections.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
      topAttendantPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN record ON record.child_id = children.id
          INNER JOIN faisca ON faisca.child_id = record.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
    }
    if (club === 'flama') {
      childCountPromise = sql`
          SELECT COUNT(*) FROM flama 
    `;
      talentosCountPromise = sql`
          SELECT COUNT(*) 
          FROM sections
          INNER JOIN children ON children.id = sections.child_id
          INNER JOIN flama ON flama.child_id = sections.child_id
    `;
      topSectionsPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN sections ON sections.child_id = children.id
          INNER JOIN flama ON flama.child_id = sections.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
      topAttendantPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN record ON record.child_id = children.id
          INNER JOIN flama ON flama.child_id = record.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
    }
    if (club === 'tocha') {
      childCountPromise = sql`
          SELECT COUNT(*) FROM tocha 
    `;
      talentosCountPromise = sql`
          SELECT COUNT(*) 
          FROM sections
          INNER JOIN children ON children.id = sections.child_id
          INNER JOIN tocha ON tocha.child_id = sections.child_id
    `;
      topSectionsPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN sections ON sections.child_id = children.id
          INNER JOIN tocha ON tocha.child_id = sections.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
      topAttendantPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN record ON record.child_id = children.id
          INNER JOIN tocha ON tocha.child_id = record.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
    }
    if (club === 'jv') {
      childCountPromise = sql`
          SELECT COUNT(*) FROM jv 
    `;
      talentosCountPromise = sql`
          SELECT COUNT(*) 
          FROM sections
          INNER JOIN children ON children.id = sections.child_id
          INNER JOIN jv ON jv.child_id = sections.child_id
    `;
      topSectionsPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN sections ON sections.child_id = children.id
          INNER JOIN jv ON jv.child_id = sections.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
      topAttendantPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN record ON record.child_id = children.id
          INNER JOIN jv ON jv.child_id = record.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
    }
    if (club === 'vq7') {
      childCountPromise = sql`
          SELECT COUNT(*) FROM vq7 
    `;
      talentosCountPromise = sql`
          SELECT COUNT(*) 
          FROM sections
          INNER JOIN children ON children.id = sections.child_id
          INNER JOIN vq7 ON vq7.child_id = sections.child_id
    `;
      topSectionsPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN sections ON sections.child_id = children.id
          INNER JOIN vq7 ON vq7.child_id = sections.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
      topAttendantPromise = sql`
          SELECT children.name, COUNT(*)
          FROM children
          INNER JOIN record ON record.child_id = children.id
          INNER JOIN vq7 ON vq7.child_id = record.child_id
          GROUP BY children.name
          ORDER BY count DESC
          LIMIT 1
    `;
    }

    data = await Promise.all([
      childCountPromise,
      talentosCountPromise,
      topSectionsPromise,
      topAttendantPromise,
    ]);

    const numberOfChildren = Number(data[0]?.rows[0].count ?? '0');
    const numberOfTalentos = Number(data[1]?.rows[0].count ?? '0');
    const topSectionsChildren = String(data[2]?.rows[0]?.name ?? '0');
    const topAttendantChildren = String(data[3]?.rows[0]?.name ?? '0');

    return {
      numberOfChildren,
      numberOfTalentos,
      topSectionsChildren,
      topAttendantChildren,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      numberOfChildren: "0",
      numberOfTalentos: "0",
      topSectionsChildren: "0",
      topAttendantChildren: "0",
    };
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql`
       SELECT
         invoices.id,
         invoices.amount,
         invoices.date,
         invoices.status,
         customers.name,
         customers.email,
         customers.image_url
       FROM invoices
       JOIN customers ON invoices.customer_id = customers.id
       WHERE
         customers.name ILIKE ${`%${query}%`} OR
         customers.email ILIKE ${`%${query}%`} OR
         invoices.amount::text ILIKE ${`%${query}%`} OR
         invoices.date::text ILIKE ${`%${query}%`} OR
         invoices.status ILIKE ${`%${query}%`}
       ORDER BY invoices.date DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchAttendatPages(query: string, club: string) {
  noStore();
  try {
    if (club === 'ursinhos') {
      const count = await sql`SELECT COUNT(*)
    FROM children
    INNER JOIN record ON children.id = record.child_id
    INNER JOIN ursinhos ON children.id = ursinhos.child_id
    WHERE
      children.name ILIKE ${`%${query}%`} OR
      children.birth_date::text ILIKE ${`%${query}%`} OR
      children.affiliation ILIKE ${`%${query}%`} OR
      children.fone::text ILIKE ${`%${query}%`} OR
      record.attendant::text ILIKE ${`%${query}%`}
   `;

      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    }
    if (club === 'faisca') {
      const count = await sql`SELECT COUNT(*)
    FROM children
    INNER JOIN record ON children.id = record.child_id
    INNER JOIN faisca ON children.id = faisca.child_id
    WHERE
      children.name ILIKE ${`%${query}%`} OR
      children.birth_date::text ILIKE ${`%${query}%`} OR
      children.affiliation ILIKE ${`%${query}%`} OR
      children.fone::text ILIKE ${`%${query}%`} OR
      record.attendant::text ILIKE ${`%${query}%`}
   `;

      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    }
    if (club === 'flama') {
      const count = await sql`SELECT COUNT(*)
    FROM children
    INNER JOIN record ON children.id = record.child_id
    INNER JOIN flama ON children.id = flama.child_id
    WHERE
      children.name ILIKE ${`%${query}%`} OR
      children.birth_date::text ILIKE ${`%${query}%`} OR
      children.affiliation ILIKE ${`%${query}%`} OR
      children.fone::text ILIKE ${`%${query}%`} OR
      record.attendant::text ILIKE ${`%${query}%`}
   `;

      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    }
    if (club === 'tocha') {
      const count = await sql`SELECT COUNT(*)
    FROM children
    INNER JOIN record ON children.id = record.child_id
    INNER JOIN tocha ON children.id = tocha.child_id
    WHERE
      children.name ILIKE ${`%${query}%`} OR
      children.birth_date::text ILIKE ${`%${query}%`} OR
      children.affiliation ILIKE ${`%${query}%`} OR
      children.fone::text ILIKE ${`%${query}%`} OR
      record.attendant::text ILIKE ${`%${query}%`}
   `;

      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    }
    if (club === 'jv') {
      const count = await sql`SELECT COUNT(*)
    FROM children
    INNER JOIN record ON children.id = record.child_id
    INNER JOIN jv ON children.id = jv.child_id
    WHERE
      children.name ILIKE ${`%${query}%`} OR
      children.birth_date::text ILIKE ${`%${query}%`} OR
      children.affiliation ILIKE ${`%${query}%`} OR
      children.fone::text ILIKE ${`%${query}%`} OR
      record.attendant::text ILIKE ${`%${query}%`}
   `;

      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    }
    if (club === 'vq7') {
      const count = await sql`SELECT COUNT(*)
    FROM children
    INNER JOIN record ON children.id = record.child_id
    INNER JOIN vq7 ON children.id = vq7.child_id
    WHERE
      children.name ILIKE ${`%${query}%`} OR
      children.birth_date::text ILIKE ${`%${query}%`} OR
      children.affiliation ILIKE ${`%${query}%`} OR
      children.fone::text ILIKE ${`%${query}%`} OR
      record.attendant::text ILIKE ${`%${query}%`}
   `;

      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } else {
      return 0
    }

  } catch (error) {
    console.error('Database Error:', error);
    return 0
    throw new Error('Failed to fetch total number of children.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
       SELECT
         invoices.id,
         invoices.customer_id,
         invoices.amount,
         invoices.status
       FROM invoices
       WHERE invoices.id = ${id};
     `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      //       // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchTopFiveChildren(
  club: string
) {
  noStore();
  try {
    if (club === 'ursinhos') {
      const data = await sql<TopFiveChildren>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         ursinhos.talentos
       FROM children
       INNER JOIN ursinhos ON children.id = ursinhos.child_id
       ORDER BY ursinhos.talentos DESC
       LIMIT 5
     `;

      const children = data.rows.map((invoice) => ({
        ...invoice,
        talentos: formatCurrency(invoice.talentos),
      }));
      return children;
    }
    if (club === 'faisca') {
      const data = await sql<TopFiveChildren>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         faisca.talentos
       FROM children
       INNER JOIN faisca ON children.id = faisca.child_id
       ORDER BY faisca.talentos DESC
       LIMIT 5
     `;
      const children = data.rows.map((invoice) => ({
        ...invoice,
        talentos: formatCurrency(invoice.talentos),
      }));
      return children;
    }
    if (club === 'flama') {
      const data = await sql<TopFiveChildren>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         flama.talentos
       FROM children
       INNER JOIN flama ON children.id = flama.child_id
       ORDER BY flama.talentos DESC
       LIMIT 5
     `;
      const children = data.rows.map((invoice) => ({
        ...invoice,
        talentos: formatCurrency(invoice.talentos),
      }));
      return children;
    }
    if (club === 'tocha') {
      const data = await sql<TopFiveChildren>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         tocha.talentos
       FROM children
       INNER JOIN tocha ON children.id = tocha.child_id
       ORDER BY tocha.talentos DESC
       LIMIT 5
     `;
      const children = data.rows.map((invoice) => ({
        ...invoice,
        talentos: formatCurrency(invoice.talentos),
      }));
      return children;
    }
    if (club === 'jv') {
      const data = await sql<TopFiveChildren>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         jv.talentos
       FROM children
       INNER JOIN jv ON children.id = jv.child_id
       ORDER BY jv.talentos DESC
       LIMIT 5
     `;
      const children = data.rows.map((invoice) => ({
        ...invoice,
        talentos: formatCurrency(invoice.talentos),
      }));
      return children;
    }
    if (club === 'vq7') {
      const data = await sql<TopFiveChildren>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         vq7.talentos
       FROM children
       INNER JOIN vq7 ON children.id = vq7.child_id
       ORDER BY vq7.talentos DESC
       LIMIT 5
     `;
      const children = data.rows.map((invoice) => ({
        ...invoice,
        talentos: formatCurrency(invoice.talentos),
      }));
      return children;
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch top five children.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<ChildrenTableType>`
  		SELECT
  		  children.id,
  		  children.name,
  		  children.image_url
  		FROM children
  		LEFT JOIN invoices ON children.id = invoices.customer_id
  		WHERE
  		  children.name ILIKE ${`%${query}%`} OR
          children.email ILIKE ${`%${query}%`}
  		GROUP BY children.id, children.name, children.email, children.image_url
  		ORDER BY children.name ASC
  	  `;

    const children = data.rows.map((child) => ({
      ...child,
    }));

    return children;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchFilteredChildren(
  query: string,
  currentPage: number,
  club: string
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    if (club === 'ursinhos') {
      const children = await sql<ChildrenTableType>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         children.affiliation,
         children.fone,
         record.attendant
       FROM children
       INNER JOIN record ON children.id = record.child_id
       INNER JOIN ursinhos ON children.id = ursinhos.child_id
       WHERE
         children.name ILIKE ${`%${query}%`} OR
         children.birth_date::text ILIKE ${`%${query}%`} OR
         children.affiliation ILIKE ${`%${query}%`} OR
         children.fone::text ILIKE ${`%${query}%`} OR
         record.attendant ILIKE ${`%${query}%`}
       ORDER BY children.name DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;

      return children.rows;
    }
    if (club === 'faisca') {
      const children = await sql<ChildrenTableType>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         children.affiliation,
         children.fone,
         record.attendant
       FROM children
       INNER JOIN record ON children.id = record.child_id
       INNER JOIN faisca ON children.id = faisca.child_id
       WHERE
         children.name ILIKE ${`%${query}%`} OR
         children.birth_date::text ILIKE ${`%${query}%`} OR
         children.affiliation ILIKE ${`%${query}%`} OR
         children.fone::text ILIKE ${`%${query}%`} OR
         record.attendant ILIKE ${`%${query}%`}
       ORDER BY children.name DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;

      return children.rows;
    }
    if (club === 'flama') {
      const children = await sql<ChildrenTableType>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         children.affiliation,
         children.fone,
         record.attendant
       FROM children
       INNER JOIN record ON children.id = record.child_id
       INNER JOIN flama ON children.id = flama.child_id
       WHERE
         children.name ILIKE ${`%${query}%`} OR
         children.birth_date::text ILIKE ${`%${query}%`} OR
         children.affiliation ILIKE ${`%${query}%`} OR
         children.fone::text ILIKE ${`%${query}%`} OR
         record.attendant ILIKE ${`%${query}%`}
       ORDER BY children.name DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;

      return children.rows;
    }
    if (club === 'tocha') {
      const children = await sql<ChildrenTableType>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         children.affiliation,
         children.fone,
         record.attendant
       FROM children
       INNER JOIN record ON children.id = record.child_id
       INNER JOIN tocha ON children.id = tocha.child_id
       WHERE
         children.name ILIKE ${`%${query}%`} OR
         children.birth_date::text ILIKE ${`%${query}%`} OR
         children.affiliation ILIKE ${`%${query}%`} OR
         children.fone::text ILIKE ${`%${query}%`} OR
         record.attendant ILIKE ${`%${query}%`}
       ORDER BY children.name DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;

      return children.rows;
    }
    if (club === 'jv') {
      const children = await sql<ChildrenTableType>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         children.affiliation,
         children.fone,
         record.attendant
       FROM children
       INNER JOIN record ON children.id = record.child_id
       INNER JOIN jv ON children.id = jv.child_id
       WHERE
         children.name ILIKE ${`%${query}%`} OR
         children.birth_date::text ILIKE ${`%${query}%`} OR
         children.affiliation ILIKE ${`%${query}%`} OR
         children.fone::text ILIKE ${`%${query}%`} OR
         record.attendant ILIKE ${`%${query}%`}
       ORDER BY children.name DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;

      return children.rows;
    }
    if (club === 'vq7') {
      const children = await sql<ChildrenTableType>`
       SELECT
         children.id,
         children.name,
         children.birth_date,
         children.affiliation,
         children.fone,
         record.attendant
       FROM children
       INNER JOIN record ON children.id = record.child_id
       INNER JOIN vq7 ON children.id = vq7.child_id
       WHERE
         children.name ILIKE ${`%${query}%`} OR
         children.birth_date::text ILIKE ${`%${query}%`} OR
         children.affiliation ILIKE ${`%${query}%`} OR
         children.fone::text ILIKE ${`%${query}%`} OR
         record.attendant ILIKE ${`%${query}%`}
       ORDER BY children.name DESC
       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
     `;

      return children.rows;
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch children table.');
  }
}

export async function fetchChildren(
  club: string
) {
  noStore();
  try {
    if (club === 'ursinhos') {
      const children = await sql<ClubChildrenType>`
       SELECT
         children.id,
         children.birth_date,
         children.talentos,
         children.atual_club
       FROM children
       INNER JOIN ursinhos ON children.id = ursinhos.child_id
     `;

      return children.rows;
    }
    if (club === 'faisca') {
      const children = await sql<ClubChildrenType>`
       SELECT
         children.id,
         children.birth_date,
         children.talentos,
         children.atual_club
       FROM children
       INNER JOIN faisca ON children.id = faisca.child_id
     `;

      return children.rows;
    }
    if (club === 'flama') {
      const children = await sql<ClubChildrenType>`
       SELECT
         children.id,
         children.birth_date,
         children.talentos,
         children.atual_club
       FROM children
       INNER JOIN flama ON children.id = flama.child_id
     `;

      return children.rows;
    }
    if (club === 'tocha') {
      const children = await sql<ClubChildrenType>`
       SELECT
         children.id,
         children.birth_date,
         children.talentos,
         children.atual_club
       FROM children
       INNER JOIN tocha ON children.id = tocha.child_id
     `;

      return children.rows;
    }
    if (club === 'jv') {
      const children = await sql<ClubChildrenType>`
       SELECT
         children.id,
         children.birth_date,
         children.talentos,
         children.atual_club
       FROM children
       INNER JOIN jv ON children.id = jv.child_id
     `;

      return children.rows;
    }
    if (club === 'vq7') {
      const children = await sql<ClubChildrenType>`
       SELECT
         children.id,
         children.birth_date,
         children.talentos,
         children.atual_club
       FROM children
       INNER JOIN vq7 ON children.id = vq7.child_id
     `;

      return children.rows;
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch children.');
  }
}

async function getUser(email: string | undefined) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserData() {
  const session = await auth()
  const currentUserData = (await getUser(session?.user?.email?.toString()))
  return currentUserData;
}
