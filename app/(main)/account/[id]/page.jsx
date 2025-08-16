import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  // Validate and extract the account ID
  const accountId = await params?.id;
  if (!accountId) notFound();

  const accountData = await getAccountWithTransactions(accountId);
  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0).toUpperCase() + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance || 0).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count?.transactions || 0} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
