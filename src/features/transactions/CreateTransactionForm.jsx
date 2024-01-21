import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/SelectForm";
import Heading from "../../ui/Heading";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import { useCreateTransaction } from "./useCreateTransaction";
import { useDeleteTransaction } from "./useDeleteTransaction";
import { useWallets } from "../wallets/useWallets";
import SpinnerMini from "../../ui/Spinner";

function CreateTransactionForm({ onCloseModal, type, transaction }) {
  const { deleteTransaction } = useDeleteTransaction();
  const { createTransaction } = useCreateTransaction();
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { isLoading, wallets } = useWallets();
  const currentDate = new Date().toISOString().split("T")[0];

  console.log(type);

  async function onSubmit(data) {
    data.account = data.account.toUpperCase();
    if (data.type === "expense") data.amount = -data.amount;

    try {
      createTransaction(data);

      if (transaction) deleteTransaction(transaction.id);

      reset();
      onCloseModal();
      console.log(data);
    } catch (error) {
      console.error("Error creating transacction:", error.message);
    }
  }

  return (
    <>
      {type === "create" && <Heading>New transaction</Heading>}
      {type === "edit" && <Heading>Edit transaction</Heading>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Type" error={errors?.income?.message}>
          <Select
            type="text"
            id="type"
            defaultValue={transaction?.type || "income"}
            {...register("type", {
              required: "This field is required",
            })}
          >
            <option value="income">💰 Income</option>
            <option value="expense">💸 Expense</option>
          </Select>
        </FormRow>
        <FormRow label="Concept" error={errors?.concept?.message}>
          <Input
            type="text"
            id="concept"
            defaultValue={transaction?.concept || "b"}
            {...register("concept", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Amount" error={errors?.amount?.message}>
          <Input
            type="text"
            id="amount"
            defaultValue={
              type === "edit" ? -transaction?.amount : transaction?.amount || 4
            }
            {...register("amount", {
              required: "This field is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/, // Expresión regular para permitir hasta 2 decimales
                message: "Maximum 2 decimal values",
              },
              min: {
                value: 0.01,
                message: "Amount should be at least 0.01",
              },
            })}
          />
        </FormRow>

        <FormRow label="Date" error={errors?.date?.message}>
          <Input
            type="date"
            id="date"
            max={currentDate}
            defaultValue={transaction?.date || "2024-01-12"}
            {...register("date", {
              required: "This field is required",
            })}
          />
        </FormRow>

        {isLoading ? (
          <SpinnerMini></SpinnerMini>
        ) : (
          <FormRow label="Account" error={errors?.account?.message}>
            <Select
              type="text"
              id="account"
              defaultValue={transaction?.account}
              {...register("account", {
                required:
                  "This field is required. If you don't have a wallet create one",
              })}
            >
              {wallets?.map((wallet) => (
                <option value={wallet.name.toLowerCase()} key={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </Select>
          </FormRow>
        )}

        <FormRow
          label="Transaction details"
          error={errors?.description?.message}
        >
          <Textarea
            type="number"
            id="description"
            placeholder="Some details about the transaction..."
            {...register("description", {})}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message}>
          <Select
            type="text"
            id="status"
            defaultValue={transaction?.status || "finished"}
            {...register("status", {
              required: "This field is required",
            })}
          >
            <option value="completed">✅ Completed</option>
            <option value="pending">🟠 Pending</option>
          </Select>
        </FormRow>

        <FormRow label="Category" error={errors?.status?.category}>
          <Select
            type="text"
            id="category"
            defaultValue={transaction?.category || "groceries"}
            {...register("category", {
              required: "This field is required",
            })}
          >
            <option value="groceries">🛒 Groceries</option>
            <option value="housing">🏠 Housing</option>
            <option value="transportation">🚗 Transportation</option>
            <option value="health">🏥 Health</option>
            <option value="entertainment">🎬 Entertainment</option>
            <option value="education">📚 Education</option>
            <option value="clothing">👕 Clothing</option>
            <option value="travels">✈️ Travels</option>
            <option value="technology">🔌 Technology</option>
            <option value="debts">💳 Debts</option>
            <option value="gifts">🎁 Gifts</option>
          </Select>
        </FormRow>

        <FormRow>
          <Button variation="secondary" type="reset" onClick={onCloseModal}>
            Cancel
          </Button>

          {type === "create" && <Button type="submit">Add Transaction</Button>}
          {type === "edit" && <Button type="submit">Edit Transaction</Button>}
        </FormRow>
      </Form>
    </>
  );
}

export default CreateTransactionForm;
