"use client";

import type { Statement } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard } from "lucide-react";

export interface StatementViewProps {
  statement: Statement;
}

export function StatementView(props: StatementViewProps) {
  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Investments Section */}
      <Card className="bg-white rounded-lg shadow-lg">
        <CardHeader className="p-4 border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Your Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Investments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.statement.investments.map((investment) => (
              <Card
                key={`investment-${investment.id}`}
                className="transition-transform duration-200 transform hover:scale-105 hover:shadow-lg bg-gray-100 rounded-lg"
              >
                <CardContent className="p-5 flex items-center space-x-4">
                  <div className="bg-gray-200 p-3 rounded-full">
                    {investment.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {investment.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {investment.percentage}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions Section */}
      <Card className="bg-white rounded-lg shadow-lg">
        <CardHeader className="p-4 border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-700">
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="p-4 text-left text-gray-600">
                  Product Description
                </TableHead>
                <TableHead className="p-4 text-right text-gray-600">
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.statement.transactions.map((transaction) => (
                <TableRow
                  key={transaction.transaction_id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <TableCell className="p-4 font-medium text-gray-800">
                    {transaction.product}
                  </TableCell>
                  <TableCell className="p-4 text-right font-semibold text-gray-800">
                    <span className="inline-flex items-center text-green-600">
                      <CreditCard className="h-4 w-4 mr-1" />$
                      {transaction.price}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
