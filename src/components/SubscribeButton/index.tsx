import { signIn, useSession } from "next-auth/client";
import { getStripeJS } from "../../services/stripe-js";
import { api } from "../../services/api";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session]: any = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}

/**
 * *Lógica
 * Para conseguir realizar o pagamento eu tenho que redirecionar o usuário
 * para a pagina de pagamento do stripe(um checkout), p/ isso tenho que utilizar
 * tanto a chave pública quando a chave privada do stripe
 * *Chave privada
 *  a chave privada é usada para criar um stripe checkout session, para a construção
 * desse checkout, o usuário tem que está cadastrado na base de dados do stripe e ao criar
 * essa checkout session tenho como retorno um sessionId.
 * *Chave pública
 * ao criar o checkout session e ter a sessionId preciso retorna o usuário para
 * a pagina de pagamento, nesse momento entra em ação o @stripe/stripe-js que lida com a chave
 * pública do stripe(sdk para o front-end), essa lib me permite criar um objeto
 * stripe e com ele redirecionar o usuário utilizando o stripe.redirectToChecout
 * !Arquivos
 * !api/subscribe: toda a lógica para lidar com o create da session no stribe.
 * !services/stripe-js: função que me retorna o objeto stripe
 */
