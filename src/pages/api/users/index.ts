import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Vitor" },
    { id: 2, name: "Poliana" },
    { id: 3, name: "André" },
  ];

  return response.json(users);
};

/**
 * *Para usar sub routes eu tenho que criar uma pasta, sendo index.ts a listagem all
 * *e a rota especifica = [param].ts[x], posso usar [...params] e todas as rotas passadas
 * * depois da index serão adicionadas em um array request.query
 */
