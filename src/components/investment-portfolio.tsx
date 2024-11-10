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
  id: string;
  title: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

interface AdjustedInvestment extends Investment {
  isLocked: boolean;
  adjustedPercentage: number;
}

/**
 * adjustInvestment calculates the next investment percentage based on the
 * percentage difference and the total number of percentages.
 */
function adjustInvestment(
  percentage: number,
  percentageDifference: number,
  percentagesLength: number
) {
  return Math.max(
    0,
    Math.min(100, percentage - percentageDifference / (percentagesLength - 1))
  );
}

function adjustInvestments(
  investments: Investment[] | AdjustedInvestment[],
  id: string,
  value: number
): AdjustedInvestment[] {
  const investment = investments.find((investment) => investment.id === id);
  if (investment === undefined) {
    throw new Error(`Investment with id ${id} not found`);
  }

  // Calculate the proportional difference between the new value and the current value
  // to adjust the other investments accordingly such that they total` 100%.
  const difference = value - investment.percentage;
  return investments.map((investment) => {
    return {
      ...investment,
      adjustedPercentage:
        investment.id === id
          ? value
          : adjustInvestment(
              investment.percentage,
              difference,
              investments.length
            ),
      isLocked: ("isLocked" in investment && investment.isLocked) ?? false,
    };
  });
}

function getDifference(adjustedInvestment: AdjustedInvestment) {
  return adjustedInvestment.percentage - adjustedInvestment.adjustedPercentage;
}

const exampleInvestments: Investment[] = [
  {
    id: "1",
    title: "Bitcoin",
    percentage: 30,
    color: "bg-orange-500",
    icon: <Bitcoin className="h-6 w-6" />,
  },
  {
    id: "2",
    title: "US Dollars",
    percentage: 25,
    color: "bg-green-500",
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    id: "3",
    title: "Euros",
    percentage: 20,
    color: "bg-blue-500",
    icon: <Euro className="h-6 w-6" />,
  },
  {
    id: "4",
    title: "British Pounds",
    percentage: 15,
    color: "bg-purple-500",
    icon: <PoundSterling className="h-6 w-6" />,
  },
  {
    id: "5",
    title: "Diamonds",
    percentage: 10,
    color: "bg-pink-500",
    icon: <Gem className="h-6 w-6" />,
  },
];

export interface InvestmentPortfolioProps {
  investments: Investment[];
}

export function InvestmentPortfolio(props: InvestmentPortfolioProps) {
  const [investments, setInvestments] = useState<Investment[]>([
    ...(props.investments ?? exampleInvestments),
  ]);

  /**
   * adjustedInvestments is used to store the adjusted investment percentages.
   *
   * When null, the component is not being modified.
   */
  const [adjustedInvestments, setAdjustedInvestments] = useState<
    AdjustedInvestment[] | null
  >(null);

  function sortInvestments(sortBy: "title" | "percentage") {
    setInvestments((prevInvestments) => {
      const sortedInvestments = [...prevInvestments];
      sortedInvestments.sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else {
          return b.percentage - a.percentage;
        }
      });

      return sortedInvestments;
    });
  }

  function handlePercentageChange(id: string, value: number) {
    setAdjustedInvestments((prevAdjustedInvestments) =>
      adjustInvestments(prevAdjustedInvestments ?? investments, id, value)
    );
  }

  function handleConfirmChanges() {
    if (adjustedInvestments !== null) {
      setInvestments(
        adjustedInvestments.map((investment) => ({
          ...investment,
          percentage: investment.adjustedPercentage,
        }))
      );
    }
    setAdjustedInvestments(null);
  }

  function handleCancelChanges() {
    setAdjustedInvestments(null);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Round-Up for Impact</h1>

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
            <DropdownMenuItem onClick={() => sortInvestments("title")}>
              Title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortInvestments("percentage")}>
              Percentage
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ul className="space-y-6">
        {investments.map((investment, i) => (
          <li key={investment.id} className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-full ${investment.color}`}>
                  {investment.icon}
                </div>
                <span className="font-medium">{investment.title}</span>
              </div>
              <span className="font-bold text-lg">
                {adjustedInvestments?.[i]?.adjustedPercentage ??
                  investment.percentage}
                %{" "}
                {adjustedInvestments !== null ? (
                  getDifference(adjustedInvestments[i]) > 0 ? (
                    <span className="text-red-500">
                      (-{getDifference(adjustedInvestments[i])}%)
                    </span>
                  ) : (
                    <span className="text-green-500">
                      (+{Math.abs(getDifference(adjustedInvestments[i]))}%)
                    </span>
                  )
                ) : (
                  ""
                )}
              </span>
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[
                adjustedInvestments?.[i]?.adjustedPercentage ??
                  investment.percentage,
              ]}
              onValueChange={([value]) =>
                handlePercentageChange(investment.id, value)
              }
              className="w-full"
              aria-label={`Adjust percentage for ${investment.title}`}
            />
          </li>
        ))}
      </ul>

      {adjustedInvestments !== null && (
        <div>
          {/* Confirmation dialog */}
          <button onClick={handleConfirmChanges}>Confirm</button>
          <button onClick={handleCancelChanges}>Cancel</button>
        </div>
      )}
    </div>
  );
}
