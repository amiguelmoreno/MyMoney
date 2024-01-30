import { generateUniqueID } from "../src/utils/helpers";
import supabase from "./supabase";

export async function getTransactions() {
  const { data, error } = await supabase.from("transactions").select("*");

  if (error) {
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return data;
}

export async function createTransaction(newTransaction) {
  console.log(newTransaction);
  let query = supabase.from("transactions");

  query = query.insert([{ ...newTransaction }]);

  const { data: newTransactionCreated, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be created");
  }

  /*  console.log(newTransactionCreated);
  console.log("newtrans");
  console.log(newTransaction); */

  // Obtiene la cartera asociada a la transacción por el campo 'name'
  const { data: wallet } = await supabase
    .from("wallets")
    .select("id")
    .eq("name", newTransaction.account) // Asociar transacciones por el campo 'account'
    .single();

  if (!wallet) {
    throw new Error(
      "No se pudo encontrar la cartera asociada a esta transacción."
    );
  }

  // Asigna el wallet_id a la transacción
  await supabase
    .from("transactions")
    .update({ wallet_id: wallet.id })
    .eq("id", newTransactionCreated.id);

  //console.log("Transacción asignada a la cartera con éxito.");

  return newTransactionCreated;
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

export async function duplicateTransaction(originTransaction) {
  let query = supabase.from("transactions");

  query = query.insert([{ ...originTransaction, id: generateUniqueID() }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be created");
  }

  console.log(data);

  return data;
}

export async function updateTransaction(id, newTransaction) {
  console.log("this is the data", { ...newTransaction });

  // Realiza una actualización en la tabla de transacciones

  const { data, error } = await supabase
    .from("transactions")
    .update(newTransaction)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error al actualizar la transacción:", error.message);
    return null;
  }

  console.log(data);
  // Devuelve los datos actualizados
  return data;
}
