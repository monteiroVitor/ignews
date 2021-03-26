import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "../styles/pages/home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IZ2tgH26DacvQYB3xL13GE5");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

/**
 * * tudo adicionado na tag head é indexado no head do arquivo _document
 *
 * SSR : server side rendering: export const getServerSideProps: GetServerSideProps = async () => return
 * * importante para indexar dados que precisam ser buscados em uma api, ex: preço de um produto
 * * OBS: se o preço não mudar muito SSG é uma opção
 * SSG: Static Site Generation: getStaticProps: GetStaticProps = async () => return {... , revalidate: }
 * * Pertime ao next renderizar e salvar o contexto de uma página (html estático), quando ela for acessada por outro
 * * usuário a página não sera renderizada novamente.
 */
