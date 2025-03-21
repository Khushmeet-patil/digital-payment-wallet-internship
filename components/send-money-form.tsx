"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface SendMoneyFormProps {
  onSend: (data: { recipient: string; amount: string; note: string }) => void
  maxAmount: number
}

export function SendMoneyForm({ onSend, maxAmount }: SendMoneyFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    note: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

    if (amount > maxAmount) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance to complete this transaction.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // const response = await fetch('/api/transactions/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSend(formData)

      toast({
        title: "Money sent!",
        description: `$${amount.toFixed(2)} has been sent to ${formData.recipient}.`,
      })

      // Reset form
      setFormData({
        recipient: "",
        amount: "",
        note: "",
      })
    } catch (error) {
      toast({
        title: "Transaction failed",
        description: "There was a problem sending money. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Email or Phone</Label>
        <Input
          id="recipient"
          name="recipient"
          placeholder="example@email.com"
          required
          value={formData.recipient}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="1"
          max={maxAmount.toString()}
          required
          value={formData.amount}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground">Available balance: ${maxAmount.toFixed(2)}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Input id="note" name="note" placeholder="What's this for?" value={formData.note} onChange={handleChange} />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Send Money"}
      </Button>
    </form>
  )
}

