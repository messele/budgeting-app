import _ from "lodash";
import AppLayout from "~/components/AppLayout";
import BudgetAdd from "~/components/budgetAdd";
import BudgetList from "~/components/BudgetList";

export default function budgets() {

  return <AppLayout title={"budgets"}>
          <BudgetAdd/>
          <BudgetList/>
        </AppLayout>
}
