import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query);

  const users = [
    { id: 1, name: "Vitor" },
    { id: 2, name: "Poliana" },
    { id: 3, name: "André" },
  ];

  return response.json(users);
};
