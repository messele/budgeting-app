import { GraphqlController } from "./GraphqlController.js";

export default class Transaction extends GraphqlController {
  getType = () => `
    type transaction {
        id: ID
        budget_id: Int
        description: String
        type: String!
        amount: Float!
        currency: String!
        actualAmount:Float
        actualCurrency: String
        details: String
        crte_dttm: String!
    }`;

  getQuery = () => `
   """Fetches a transaction by their ID"""
    transaction(id: ID!): transaction

    """Fetches all transactions Budjet id"""
    transactions(budget_id: Int): [transaction]

  `;

  getMutation = () => `
     """Creates a new transaction"""
    createTransaction(budget_id: Int!, type:String!,description: String, amount: Float!, currency: String!, actualAmount: Float, actualCurrency: String, details: String): transaction
  
    """Deletes an existing transaction"""
    deleteTransaction(id: ID!): transaction
    `;

  getResolvers = () => ({
    transactions: async ({ budget_id }) =>
      await this.execute(
        "SELECT id, crte_dttm, budget_id, description, amount, currency FROM budget_transaction WHERE budget_id = $1",
        [budget_id]
      ),

    transaction: async ({ id }) => {
      const result = await this.execute(
        "SELECT * FROM budget_transaction WHERE id = $1",
        [id]
      );ß
      return result[0];
    },
    createTransaction: async ({ budget_id, description, type, amount, currency, actualAmount, actualCurrency, }) => {
      const result = await this.execute(
        "INSERT INTO budget_transaction (budget_id, description, type, amount, currency, actual_amount, actual_currency) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *",
        [budget_id, description, type, amount, currency, actualAmount, actualCurrency]
      );
      return result[0];
    },
    deleteTransaction: async ({ id }) => {  
        const result = await this.execute(
            "DELETE FROM budget_transaction WHERE id = $1 RETURNING *",
            [id]
        );
        return result[0];
    }
  });
}
