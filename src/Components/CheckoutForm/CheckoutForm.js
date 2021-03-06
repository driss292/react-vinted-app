import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../CheckoutForm/checkoutForm.scss";
import axios from "axios";

const CheckoutForm = ({ product, amount, userId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log(product, amount, userId);

      const cardElements = elements.getElement(CardElement);

      //je fais une demande de token vers Stripe. Si ok, stripeResponse contient objet avec clé token (entre autres)
      const stripeResponse = await stripe.createToken(cardElements, {
        name: Cookies.get("userIdentity"),
      });
      // console.log(stripeResponse);

      const response = await axios.post(
        "https://vinted-backend-14022022.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: product,
          amount: amount + 0.4 + 0.8,
        }
      );

      // console.log(response.data.response.status);

      if (response.data.response.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="payment-form-container">
          <CardElement className="card-element" />
          <button type="submit">Payer</button>
        </form>
      ) : (
        <div className="payment-successful">
          <span>Paiement effectué !</span>
          <Link to="/" className="payment-successful-home">
            Retour à l'accueil ?
          </Link>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
