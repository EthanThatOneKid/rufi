"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Bitcoin,
  DollarSign,
  Euro,
  Gem,
  PoundSterling,
} from "lucide-react";

interface Investment {
  id: number;
  name: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

export function InvestmentPortfolioComponent() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: 1,
      name: "Bitcoin",
      percentage: 30,
      color: "bg-orange-500",
      icon: <Bitcoin className="h-6 w-6" />,
    },
    {
      id: 2,
      name: "US Dollars",
      percentage: 25,
      color: "bg-green-500",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      id: 3,
      name: "Euros",
      percentage: 20,
      color: "bg-blue-500",
      icon: <Euro className="h-6 w-6" />,
    },
    {
      id: 4,
      name: "British Pounds",
      percentage: 15,
      color: "bg-purple-500",
      icon: <PoundSterling className="h-6 w-6" />,
    },
    {
      id: 5,
      name: "Diamonds",
      percentage: 10,
      color: "bg-pink-500",
      icon: <Gem className="h-6 w-6" />,
    },
  ]);

  const adjustPercentage = (id: number, newPercentage: number) => {
    const oldPercentage =
      investments.find((inv) => inv.id === id)?.percentage || 0;
    const difference = newPercentage - oldPercentage;

    setInvestments((prevInvestments) => {
      const updatedInvestments = prevInvestments.map((inv) => {
        if (inv.id === id) {
          return { ...inv, percentage: newPercentage };
        } else {
          const scale = (100 - newPercentage) / (100 - oldPercentage);
          return { ...inv, percentage: Math.round(inv.percentage * scale) };
        }
      });

      // Adjust for any rounding errors to ensure total is always 100
      const total = updatedInvestments.reduce(
        (sum, inv) => sum + inv.percentage,
        0
      );
      if (total !== 100) {
        const lastInvestment =
          updatedInvestments[updatedInvestments.length - 1];
        lastInvestment.percentage += 100 - total;
      }

      return updatedInvestments;
    });
  };

  const sortInvestments = (sortBy: "name" | "percentage") => {
    setInvestments((prevInvestments) => {
      const sortedInvestments = [...prevInvestments];
      sortedInvestments.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return b.percentage - a.percentage;
        }
      });
      return sortedInvestments;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Investment Portfolio</h1>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          Adjust the sliders to change investment percentages
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => sortInvestments("name")}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortInvestments("percentage")}>
              Percentage
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ul className="space-y-6">
        {investments.map((investment) => (
          <li key={investment.id} className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-full ${investment.color}`}>
                  {investment.icon}
                </div>
                <span className="font-medium">{investment.name}</span>
              </div>
              <span className="font-bold text-lg">
                {investment.percentage}%
              </span>
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[investment.percentage]}
              onValueChange={([value]) =>
                adjustPercentage(investment.id, value)
              }
              className="w-full"
              aria-label={`Adjust percentage for ${investment.name}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
