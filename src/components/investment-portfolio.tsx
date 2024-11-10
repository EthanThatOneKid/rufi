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
  Lock,
  LockOpen,
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

function getCurrentPercentage(investment: Investment | AdjustedInvestment) {
  return "adjustedPercentage" in investment
    ? investment.adjustedPercentage
    : investment.percentage;
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
  return Math.floor(
    Math.max(
      0,
      Math.min(100, percentage - percentageDifference / (percentagesLength - 1))
    )
  );
}

function adjustInvestments(
  investments: Investment[] | AdjustedInvestment[],
  id: string,
  value: number
): AdjustedInvestment[] {
  const adjustedInvestmentIndex = investments.findIndex(
    (investment) => investment.id === id
  );
  if (adjustedInvestmentIndex === -1) {
    throw new Error(`Investment with id ${id} not found`);
  }

  // Calculate the proportional difference between the new value and the current value
  // to adjust the other investments accordingly such that they total` 100%.
  const difference = value - investments[adjustedInvestmentIndex].percentage;
  const { length: unlockedInvestmentsLength } = investments.filter(
    (investment) => !("isLocked" in investment && investment.isLocked)
  );
  const adjustedInvestments = investments.map((investment) => {
    const isLocked = ("isLocked" in investment && investment.isLocked) ?? false;
    return {
      ...investment,
      adjustedPercentage:
        investment.id === id
          ? value
          : isLocked
          ? getCurrentPercentage(investment)
          : adjustInvestment(
              investment.percentage,
              difference,
              Math.max(unlockedInvestmentsLength, 1)
            ),
      isLocked,
    };
  });

  const total = adjustedInvestments.reduce(
    (acc, investment) => acc + investment.adjustedPercentage,
    0
  );
  if (total < 100) {
    adjustedInvestments[adjustedInvestmentIndex].adjustedPercentage +=
      100 - total;
  }

  return adjustedInvestments;
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
  investments?: Investment[];
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
      return prevInvestments.toSorted((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else {
          return b.percentage - a.percentage;
        }
      });
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

  function handleToggleLockAt(index: number) {
    setAdjustedInvestments((prevAdjustedInvestments) => {
      if (prevAdjustedInvestments === null) {
        return null;
      }

      const adjustedInvestment = prevAdjustedInvestments[index];
      const isLocked = !adjustedInvestment.isLocked;
      return prevAdjustedInvestments.map((investment, i) => {
        return i === index ? { ...investment, isLocked } : investment;
      });
    });
  }

  function SaveOrCancelChanges() {
    return (
      <div className="bg-card rounded-lg p-4 shadow-sm">
        <Button onClick={handleConfirmChanges}>
          <span className="mr-2">Save changes</span>
        </Button>

        <Button variant="outline" onClick={handleCancelChanges}>
          <span className="mr-2">Cancel changes</span>
        </Button>

        <p className="text-muted-foreground text-sm mt-2">
          Confirm or cancel your changes.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Round-Up for Impact</h1>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          Adjust the sliders to change investment percentages.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={adjustedInvestments !== null}
            >
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

      {adjustedInvestments !== null && <SaveOrCancelChanges />}

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
                {adjustedInvestments !== null ? (
                  getDifference(adjustedInvestments[i]) === 0 ? (
                    <em>Unchanged</em>
                  ) : getDifference(adjustedInvestments[i]) > 0 ? (
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
                )}{" "}
                {adjustedInvestments?.[i]?.adjustedPercentage ??
                  investment.percentage}
                %{" "}
                {adjustedInvestments !== null && (
                  <Button onClick={() => handleToggleLockAt(i)}>
                    {adjustedInvestments?.[i]?.isLocked ? (
                      <Lock className="h-6 w-6" />
                    ) : (
                      <LockOpen className="h-6 w-6" />
                    )}
                  </Button>
                )}
              </span>
            </div>
            <Slider
              disabled={adjustedInvestments?.[i]?.isLocked}
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

      {adjustedInvestments !== null && <SaveOrCancelChanges />}
    </div>
  );
}
