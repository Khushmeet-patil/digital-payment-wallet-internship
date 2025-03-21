"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownUp, CreditCard, History, LogOut, Plus, Send, User, Wallet } from "lucide-react"
import { TransactionList } from "@/components/transaction-list"
import { SendMoneyForm } from "@/components/send-money-form"
import { AddMoneyForm } from "@/components/add-money-form"
import { UserNav } from "@/components/user-nav"

export default function Dashboard() {
  const [balance, setBalance] = useState(1250.75)

  // This would come from your API in a real app
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

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
        <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Balance</CardTitle>
                <CardDescription>Your current wallet balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
              </CardContent>
            </Card>
            <nav className="grid gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Wallet className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Link href="/dashboard/transactions">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <History className="h-4 w-4" />
                  Transactions
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="w-full justify-start gap-2 text-red-500">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </nav>
          </div>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-1 h-24">
                    <Send className="h-5 w-5" />
                    <span>Send Money</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-1 h-24">
                    <Plus className="h-5 w-5" />
                    <span>Add Money</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-1 h-24">
                    <ArrowDownUp className="h-5 w-5" />
                    <span>Transfer</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center gap-1 h-24">
                    <CreditCard className="h-5 w-5" />
                    <span>Pay Bills</span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="md:col-span-1 lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionList limit={3} />
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="send" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="send">Send Money</TabsTrigger>
                <TabsTrigger value="add">Add Money</TabsTrigger>
              </TabsList>
              <TabsContent value="send" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Send Money</CardTitle>
                    <CardDescription>Send money to friends, family, or businesses.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SendMoneyForm
                      onSend={(data) => {
                        // In a real app, this would call an API
                        setBalance((prev) => prev - Number.parseFloat(data.amount))
                      }}
                      maxAmount={balance}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="add" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Money</CardTitle>
                    <CardDescription>Add money to your wallet using a card or bank account.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AddMoneyForm
                      onAdd={(data) => {
                        // In a real app, this would call an API
                        setBalance((prev) => prev + Number.parseFloat(data.amount))
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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

