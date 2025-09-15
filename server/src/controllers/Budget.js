// import { pool } from "./db";

import { GraphqlController } from "./GraphqlController.js";

// GraphQL Schema
// This defines the structure of our API: the types and the queries.

export default class Budget extends GraphqlController {
  getType = () => `
      type budget {
        id: ID!
        name: String
        description: String
        amount: Float
        currency: String
        category: String
        crte_dttm: String
        end_dttm: String
        status: String
        details: String
    }`;

  getQuery = () => `
      """Fetches a budget by their ID"""
      budget(id: ID!): budget

      """Fetches all budgets"""
      budgets: [budget]
    `;

  getMutation = () => ` 
    """Creates a new budget"""
    createbudget(name: String!, description: String, amount: Float, currency: String, category: String): budget

    """Updates an existing budget"""
    update(id:ID!, description:String, amount: Float, currency: String, category: String): budget

    """Deletes an existing budget"""
    deletebudget(id: ID!): budget 
    `;

  getResolvers = () => ({
    budgets: async () =>
      await this.execute(
        `SELECT crte_dttm, end_dttm, id, name, description, amount, status FROM public.budget`
      ),
    budget: async ({ id }) => {
      const result = await this.execute("Select * from budget where id = $1", [
        id,
      ]);
      return result[0];
    },
    createbudget: async ({ name, description, amount, currency, category }) => {
      const result = await this.execute(
        `INSERT INTO budget (name, description, amount, currency, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, description, amount, currency, category]
      );
      return result[0];
    },
  });
}
