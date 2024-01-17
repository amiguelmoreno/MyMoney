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

function CreateTransactionForm({ onCloseModal, type, transaction }) {
  const { deleteTransaction } = useDeleteTransaction();
  const { createTransaction } = useCreateTransaction();
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    createTransaction(data);

    if (transaction) deleteTransaction(transaction.id);

    reset();
    onCloseModal();
    console.log(data);
  }

  return (
    <>
      {type === "create" && <Heading>New transaction</Heading>}
      {type === "edit" && <Heading>Edit transaction</Heading>}
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue={transaction?.amount || 4}
            {...register("amount", {
              required: "This field is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/, // Expresión regular para permitir hasta 2 decimales
                message: "Maximum 2 decimal values",
              },
              min: {
                value: 0.01,
                message: "Capacity should be at least 0.01",
              },
            })}
          />
        </FormRow>

        <FormRow label="Date" error={errors?.date?.message}>
          <Input
            type="date"
            id="date"
            defaultValue={transaction?.date || "2021-10-12"}
            {...register("date", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="To" error={errors?.to?.message}>
          <Input
            type="text"
            id="to"
            defaultValue="Juanca"
            {...register("to", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="From" error={errors?.from?.message}>
          <Input
            type="text"
            id="from"
            defaultValue={transaction?.from || "Migue"}
            {...register("from", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Account" error={errors?.account?.message}>
          <Select
            type="text"
            id="account"
            defaultValue={transaction?.account || "BBVA"}
            {...register("account", {
              required: "This field is required",
            })}
          >
            <option value="BBVA">BBVA</option>
            <option value="ING">ING</option>
            <option value="CAIXA">CAIXA</option>
            <option value="SANTANDER">SANTANDER</option>
          </Select>
        </FormRow>

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
            defaultValue={transaction?.status || "received"}
            {...register("status", {
              required: "This field is required",
            })}
          >
            <option value="received">✅ Received</option>
            <option value="pending">🟠 Pending</option>
            <option value="sent">💸 Sent</option>
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
            <option value="clothing">👕 Clothing and Accessories</option>
            <option value="travel">✈️ Travel and Vacations</option>
            <option value="technology">🔌 Technology</option>
            <option value="debt">💳 Debts and Loans</option>
            <option value="gifts">🎁 Gifts and Donations</option>
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
