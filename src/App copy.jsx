import { useState } from "react"

import Cards from "react-credit-cards-2"
import "react-credit-cards-2/dist/es/styles-compiled.css"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useForm, Controller } from "react-hook-form"

function App() {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  })

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }))
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
    },
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Paper elevation={2} style={{ background: "" }}>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <Box component="form" sx={{ background: "" }} onSubmit={onSubmit}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <TextField variant="outlined" {...field} />}
        />

        <input
          {...register("name")}
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          {...register("cardNumber")}
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          {...register("expiryDate", {
            required: {
              value: true,
              message: "La fecha de expiración es requerida.",
            },
          })}
          type="tel"
          name="expiry"
          placeholder="MM/YY"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {errors.expiryDate && <span>{errors.expiryDate.message}</span>}
        <input
          {...register("cvc", {
            validate: (value) =>
              value.length === 3 || "Debe contener 3 números",
          })}
          type="number"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {errors.cvc && <span>{errors.cvc.message}</span>}
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </Box>
    </Paper>
  )
}

export default App
