"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, Download, Search, Wallet } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { useState } from "react"

interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
  recipient?: string
  sender?: string
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
  {
    id: "6",
    type: "credit",
    amount: 1000,
    description: "Salary Deposit",
    date: "2024-03-10T09:00:00Z",
    sender: "ABC Company",
  },
  {
    id: "7",
    type: "debit",
    amount: 45.75,
    description: "Grocery Shopping",
    date: "2024-03-08T15:30:00Z",
  },
  {
    id: "8",
    type: "debit",
    amount: 9.99,
    description: "Subscription Payment",
    date: "2024-03-05T08:15:00Z",
  },
  {
    id: "9",
    type: "credit",
    amount: 50,
    description: "Refund",
    date: "2024-03-03T14:20:00Z",
  },
  {
    id: "10",
    type: "debit",
    amount: 25,
    description: "Food Delivery",
    date: "2024-03-01T19:45:00Z",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // This would come from your API in a real app
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PayWallet</span>
          </Link>
          <UserNav user={user} />
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Transaction History</h1>
              <p className="text-muted-foreground">View and manage your transaction history</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="credit">Money In</SelectItem>
                <SelectItem value="debit">Money Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No transactions found</div>
              ) : (
                <div className="space-y-6">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-full p-2 ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDown className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUp className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{formatDate(transaction.date)}</div>
                          {transaction.recipient && (
                            <div className="text-xs text-muted-foreground">To: {transaction.recipient}</div>
                          )}
                          {transaction.sender && (
                            <div className="text-xs text-muted-foreground">From: {transaction.sender}</div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 md:px-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">© 2024 PayWallet. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

