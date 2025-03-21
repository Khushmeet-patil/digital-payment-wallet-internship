import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CreditCard, Send, Shield, Smartphone, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">PayWallet</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    The Simplest Way to Pay and Get Paid
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Send money, pay bills, recharge mobile, and more with our secure digital wallet.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=550&width=450"
                  alt="PayWallet App"
                  className="rounded-lg object-cover"
                  width={450}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your money in one place.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Send className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-bold">Send & Receive Money</h3>
                  <p className="text-muted-foreground">
                    Transfer money instantly to anyone with a PayWallet account or bank account.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Smartphone className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-bold">Mobile Recharge</h3>
                  <p className="text-muted-foreground">
                    Recharge your mobile phone or pay your bills with just a few taps.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <CreditCard className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-bold">Add Money</h3>
                  <p className="text-muted-foreground">
                    Add money to your wallet using debit card, credit card, or bank transfer.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Shield className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-bold">Secure Transactions</h3>
                  <p className="text-muted-foreground">
                    All transactions are encrypted and secured with industry-standard protocols.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">PayWallet</span>
          </div>
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

