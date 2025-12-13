import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient"; 
import { getUserFromSession } from "@/lib/auth";
import { getExpenses } from "@/lib/expenses";

export default async function DashboardPage() {
  
  const user = await getUserFromSession();
  
  console.log("SERVER USER:", user);
  
  if (!user) {
    redirect("/Login");
  }

  const expenses = await getExpenses(Number(user.id));
  
  console.log("EXPENSES COUNT:", expenses?.length || 0);

  return <DashboardClient user={user} expenses={expenses} />;
}