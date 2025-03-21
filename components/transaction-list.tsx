"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
  recipient?: string
  sender?: string
}

interface TransactionListProps {
  limit?: number
}

// Mock data - in a real app, this would come from your API
const transactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    amount: 500,
    description: "Added money to wallet",
    date: "2024-03-20T10:30:00Z",
  },
  {
    id: "2",
    type: "debit",
    amount: 150,
    description: "Payment to Sarah Johnson",
    date: "2024-03-19T14:45:00Z",
    recipient: "Sarah Johnson",
  },
  {
    id: "3",
    type: "credit",
    amount: 75,
    description: "Received from Michael Brown",
    date: "2024-03-18T09:15:00Z",
    sender: "Michael Brown",
  },
  {
    id: "4",
    type: "debit",
    amount: 35.5,
    description: "Mobile Recharge",
    date: "2024-03-17T16:20:00Z",
  },
  {
    id: "5",
    type: "debit",
    amount: 120,
    description: "Electricity Bill Payment",
    date: "2024-03-15T11:10:00Z",
  },
]

export function TransactionList({ limit }: TransactionListProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      {displayTransactions.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No transactions found</div>
      ) : (
        displayTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-2 ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}>
                {transaction.type === "credit" ? (
                  <ArrowDown className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowUp className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-muted-foreground">{formatDate(transaction.date)}</div>
              </div>
            </div>
            <div className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
              {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
            </div>
          </div>
        ))
      )}
      {limit && transactions.length > limit && (
        <div className="text-center">
          <a href="/dashboard/transactions" className="text-sm text-primary hover:underline">
            View all transactions
          </a>
        </div>
      )}
    </div>
  )
}

