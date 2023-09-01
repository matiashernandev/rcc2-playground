import { useState } from "react"

import Cards from "react-credit-cards-2"
import "react-credit-cards-2/dist/es/styles-compiled.css"
import "./App.css"
import { useForm } from "react-hook-form"

function App() {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }))
  }

  return (
    <div style={{ background: "red" }}>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={onSubmit}>
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
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default App
