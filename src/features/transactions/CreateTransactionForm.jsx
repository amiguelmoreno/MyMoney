import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/SelectForm";
import Heading from "../../ui/Heading";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../../services/apiTransactions";
import toast from "react-hot-toast";

function CreateTransactionForm({ onCloseModal }) {
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("New transaction successfully created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onCloseModal();
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
    console.log(data);
  }

  return (
    <>
      <Heading>New transaction</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Concept" error={errors?.concept?.message}>
          <Input
            type="text"
            id="concept"
            defaultValue="a"
            {...register("concept", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Amount" error={errors?.amount?.message}>
          <Input
            type="text"
            id="amount"
            defaultValue={4}
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
            defaultValue="2021-10-12"
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
            defaultValue="Migue"
            {...register("from", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Account" error={errors?.account?.message}>
          <Select
            type="text"
            id="account"
            defaultValue="BBVA"
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
            defaultValue="FASDFHASKL F FHASDFASD S DASDFA SDAS"
            {...register("description", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message}>
          <Select
            type="text"
            id="status"
            {...register("status", {
              required: "This field is required",
            })}
          >
            <option value="Received">✅ Received</option>
            <option value="Pending">🟠 Pending</option>
            <option value="Sent">💸 Sent</option>
          </Select>
        </FormRow>

        <FormRow>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button type="submit">Add Transaction</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateTransactionForm;
