import { Container, Stack } from "@mui/material"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import Cards from "react-credit-cards-2"
import "react-credit-cards-2/dist/es/styles-compiled.css"
import { Controller, useForm } from "react-hook-form"

function App() {
  const [state, setState] = useState({ focus: "" })

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }))
  }

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      number: "",
      expiry: "",
      cvc: "",
    },
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  {
    console.log(errors.number)
  }

  return (
    <Container
      width={"100%"}
      sx={{
        bgcolor: "primary.dark",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 10,
        }}
      >
        <Cards
          name={watch("name")}
          number={watch("number")}
          expiry={watch("expiry")}
          cvc={watch("cvc")}
          focused={state.focus}
        />
        <Stack
          component="form"
          width={500}
          spacing={2}
          m={2}
          onSubmit={onSubmit}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                variant="outlined"
                onFocus={handleInputFocus}
                fullWidth
                {...field}
              />
            )}
          />
          {/* //TODO validations onChage (?) */}
          <Controller
            name="number"
            control={control}
            render={({ field }) => (
              <TextField
                label="Number"
                variant="outlined"
                onFocus={handleInputFocus}
                type="number"
                inputProps={{
                  maxLength: 16,
                }}
                fullWidth
                {...field}
              />
            )}
            rules={{
              /*  maxLength: {
                value: 16,
                message: "El número debe tener como máximo 16 caracteres.",
              },
              pattern: {
                value: /[0-9]{4}/,
                minLength: 4,
                maxLength: 4,
                message: "error",
              }, */
              validate: (value) =>
                value.length > 5 || "Los passwords no coinciden",
            }}
          />

          {errors.number && <span>{errors.number.message}</span>}
          <Controller
            name="expiry"
            control={control}
            render={({ field }) => (
              <TextField
                label="Expiry"
                variant="outlined"
                onFocus={handleInputFocus}
                fullWidth
                {...field}
              />
            )}
          />

          <Controller
            name="cvc"
            control={control}
            render={({ field }) => (
              <TextField
                label="cvc"
                variant="outlined"
                onFocus={handleInputFocus}
                fullWidth
                {...field}
              />
            )}
          />

          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default App
