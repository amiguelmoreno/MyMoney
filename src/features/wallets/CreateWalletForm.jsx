import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useForm } from "react-hook-form";
import { useCreateWallet } from "./useCreateWallet";
import { useState } from "react";

function CreateWalletForm({ onCloseModal, wallet }) {
  const { createWallet } = useCreateWallet();
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    // Convertir el campo 'name' a mayúsculas antes de enviarlo
    data.name = data.name.toUpperCase();

    try {
      await createWallet(data);
      reset();
      onCloseModal();
      //console.log(data);
    } catch (error) {
      console.error("Error al crear la cartera:", error.message);
    }
  }

  return (
    <>
      <Heading>New Wallet</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            defaultValue={wallet?.name || "b"}
            {...register("name", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Initial Amount" error={errors?.initialAmount?.message}>
          <Input
            type="text"
            id="initialAmount"
            defaultValue={wallet?.initialAmount || 0}
            {...register("initialAmount", {
              required: "This field is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/, // Expresión regular para permitir hasta 2 decimales
                message: "Maximum 2 decimal values",
              },
              min: {
                value: 0.0,
                message: "Minimum amount should be at least 0.00",
              },
            })}
          />
        </FormRow>

        <FormRow label="Owner" error={errors?.owner?.message}>
          <Input
            type="text"
            id="owner"
            defaultValue={wallet?.owner || "Migue"}
            {...register("owner", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          <Button variation="secondary" type="reset" onClick={onCloseModal}>
            Cancel
          </Button>

          <Button type="submit">Add Wallet</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateWalletForm;
