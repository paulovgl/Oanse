import { sql } from '@vercel/postgres';
import {
  User,
  Child,
  Record,
  ChildField,
  ChildrenTableType,
  InvoicesTable,
  ClubChildrenTableType,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

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

export async function fetchCardData() {
  noStore();
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
          FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
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
    throw new Error('Failed to fetch total number of children.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql`
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

export async function fetchChildren() {
  try {
    const data = await sql<ChildField>`
        SELECT
          id,
          name
        FROM children
        ORDER BY name ASC
      `;

    const children = data.rows;
    return children;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all children.');
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

export async function getUser(email: string | undefined) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
