'use client';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function ExpenseCalendar({ availableDates, onSelect }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-gray-900 cursor-pointer border-gray-700 text-gray-100 hover:bg-gray-700"
        >
          <CalendarIcon className="mr-2 cursor-pointer h-4 w-4" />
          Jump to date
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 cursor-pointer bg-gray-900 border-gray-800">
        <Calendar
          mode="single"
          onSelect={(date) => {
            if (!date) return;

            const normalized = date.toISOString().split('T')[0];
            if (availableDates.has(normalized)) {
              onSelect(normalized);
            }
          }}
          disabled={(date) => {
            const normalized = date.toISOString().split('T')[0];
            return !availableDates.has(normalized);
          }}
          modifiers={{
            hasExpense: (date) =>
              availableDates.has(date.toISOString().split('T')[0])
          }}
          modifiersClassNames={{
            hasExpense:
              'bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600'
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
