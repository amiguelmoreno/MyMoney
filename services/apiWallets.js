import supabase from "./supabase";

export async function getWallets() {
  const { data, error } = await supabase.from("wallets").select("*");

  if (error) {
    console.error(error);
    throw new Error("Wallets could not be loaded");
  }

  return data;
}

export async function createWallet(newWallet) {
  let query = supabase.from("wallets");

  const existingWallet = await supabase
    .from("wallets")
    .select()
    .eq("name", newWallet.name)
    .single();

  if (existingWallet.data) {
    const errorMessage = `That wallet already exists. Please, choose another name`;
    throw new Error(errorMessage);
  }

  query = query.insert([{ ...newWallet }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Wallet could not be created");
  }

  return data;
}

export async function getTransactionsFromWallet(wallet_id) {
  try {
    // Perform the query to get transactions for a specific wallet
    const { data: transactionsFromWallet, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("wallet_id", wallet_id);

    if (error) {
      throw error;
    }

    return transactionsFromWallet;
  } catch (error) {
    console.error("Error fetching transactions for the wallet:", error.message);
  }
}

export async function deleteWalletAndTransactions(walletId) {
  try {
    // Elimina las transacciones asociadas a la wallet
    const { data: transactions, error: transactionsError } = await supabase
      .from("transactions")
      .delete()
      .eq("wallet_id", walletId);

    if (transactionsError) {
      console.error("Error al eliminar transacciones:", transactionsError);
      return;
    }

    // console.log("Transacciones eliminadas:", transactions);

    // Finalmente, elimina la wallet
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .delete()
      .eq("id", walletId);

    if (walletError) {
      console.error("Error al eliminar wallet:", walletError);
      return;
    }

    //console.log("Wallet eliminada:", wallet);
    return wallet;
  } catch (error) {
    console.error("Error inesperado:", error.message);
  }
}
