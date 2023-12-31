import supabase from "./supabase";

export async function createTransaction(newTransaction) {
  let query = supabase.from("transactions");

  query = query.insert([{ ...newTransaction }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be created");
  }

  return data;
}

export async function getTransactions() {
  const { data, error } = await supabase.from("transactions").select("*");

  if (error) {
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return data;
}

export async function deleteTransaction(id) {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be deleted");
  }

  return data;
}
