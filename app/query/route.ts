import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listInvoices() {
  // run your query
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

export async function GET() {
  try {
    const data = await listInvoices();
    return Response.json(data);
  } catch (error) {
    // send the error to the client so you can see what is wrong
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
