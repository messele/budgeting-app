import { GraphqlController } from "./GraphqlController.js";

export default class Schedule extends GraphqlController {   

    getType = () => `
        type schedule {
            budget_id: Int
            start_date: String
            end_date: String
            frequency: Int
            next_date: String
        }

        type frequency {
            id: ID
            name: String
            description: String
            days_interval: Int
        }
    `;

    getQuery = () => `
        """Fetches schedule by budget ID"""
        schedule(budget_id: Int!): schedule

        """Fetches all schedule frequency types"""
        scheduleFrequencyTypes: [frequency]
    `;

    getMutation = () => `
        """Creates a new budget schedule"""
        createBudgetSchedule(budget_id: Int!, start_date: String, end_date: String, frequency: Int, next_date: String): schedule

        """Updates an existing budget schedule"""
        updateBudgetSchedule(id: ID!, start_date: String, end_date: String, frequency: Int, next_date: String) : schedule

        """Deletes an existing budget schedule"""
        deleteBudgetSchedule(id: ID!): schedule  

        """Creates a new schedule frequency type"""
        createScheduleFrequency(budget_id: Int!, name: String!, description: String, days_interval: Int!): frequency
        
        """Updates an existing schedule frequency type"""
        updateScheduleFrequency(id: ID!, name: String, description: String, days_interval: Int): frequency
        
        """Deletes an existing schedule frequency type"""
        deleteScheduleFrequency(id: ID!): frequency
    `;

    getResolvers = () => ({
        schedule: async ({ budget_id }) => {
            const result = await this.execute(
                "SELECT budget_id, start_date, end_date, frequency, next_date FROM budget_schedule WHERE budget_id = $1",
                [budget_id]
            );
            return result[0];
        },
        scheduleFrequencyTypes: async () =>
            await this.execute(
                "SELECT id, name, description, days_interval FROM budget_frequency_type"
            ),
        createBudgetSchedule: async ({ budget_id, start_date, end_date, frequency, next_date }) => {
            const result = await this.execute(
                "INSERT INTO budget_schedule (budget_id, start_date, end_date, frequency, next_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [budget_id, start_date, end_date, frequency, next_date]
            );
            return result[0];
        },
        createScheduleFrequency: async ({budgetId, name, description, days_interval }) => {      
            const result = await this.execute(
                "INSERT INTO budget_frequency_type (budget_id, name, description, days_interval) VALUES ($1, $2, $3, $4) RETURNING *",
                [budgetId, name, description, days_interval]
            );
            return result[0];
        },
        updateBudgetSchedule: async ({ id, start_date, end_date, frequency, next_date })=> {
            const result = await this.execute(
                "UPDATE budget_schedule SET start_date = $1, end_date = $2, frequency = $3, next_date = $4 WHERE id = $5 RETURNING *",
                [start_date, end_date, frequency, next_date, id]
            );
            return result[0];
        
        },

        deleteBudgetSchedule: async ({ id }) => {
            const result = await this.execute(
                "DELETE FROM budget_schedule WHERE id = $1 RETURNING *",
                [id]
            );
            return result[0];
        },

    });

}