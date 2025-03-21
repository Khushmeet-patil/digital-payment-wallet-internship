"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Landmark } from "lucide-react"

interface AddMoneyFormProps {
  onAdd: (data: { amount: string; method: string }) => void
}

export function AddMoneyForm({ onAdd }: AddMoneyFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    accountNumber: "",
    ifscCode: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, method: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const amount = Number.parseFloat(formData.amount)

    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/transactions/add-money', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onAdd({ amount: formData.amount, method: formData.method })

      toast({
        title: "Money added!",
        description: `$${amount.toFixed(2)} has been added to your wallet.`,
      })

      // Reset form
      setFormData({
        amount: "",
        method: "card",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        accountNumber: "",
        ifscCode: "",
      })
    } catch (error) {
      toast({
        title: "Transaction failed",
        description: "There was a problem adding money. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="1"
          required
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Payment Method</Label>
        <RadioGroup value={formData.method} onValueChange={handleMethodChange} className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCard className="mb-3 h-6 w-6" />
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
            <Label
              htmlFor="bank"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Landmark className="mb-3 h-6 w-6" />
              Bank
            </Label>
          </div>
        </RadioGroup>
      </div>

      {formData.method === "card" ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                required
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="123"
                required
                value={formData.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              placeholder="Account Number"
              required
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              name="ifscCode"
              placeholder="IFSC Code"
              required
              value={formData.ifscCode}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Add Money"}
      </Button>
    </form>
  )
}

