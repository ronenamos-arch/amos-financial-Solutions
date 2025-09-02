import { BarChart, Percent, LineChart, DollarSign } from 'lucide-react';

export const calculatorsData = [
  {
    id: 'vat-calculator',
    title: 'מחשבון מע"מ',
    description: 'חשבו בקלות מע"מ וגלו את מחיר המוצר כולל או ללא מע"מ.',
    icon: Percent,
    file: '/calculators/vat-calculator.html'
  },
  {
    id: 'loan-repayment-calculator',
    title: 'מחשבון החזרי הלוואה',
    description: 'חשבו את ההחזרים החודשיים, הריבית הכוללת ולוח סילוקין עבור הלוואות.',
    icon: BarChart,
    file: '/calculators/loan-repayment-calculator.html'
  },
  {
    id: 'compound-interest-calculator',
    title: 'מחשבון ריבית דריבית',
    description: 'ראו כיצד כספכם גדל לאורך זמן עם ריבית דריבית.',
    icon: LineChart,
    file: '/calculators/compound-interest-calculator.html'
  },
  {
    id: 'salary-net-gross',
    title: 'מחשבון שכר נטו-ברוטו',
    description: 'חשבו את שכר הנטו שלכם משכר הברוטו, כולל מיסים והפרשות.',
    icon: DollarSign,
    file: '/calculators/salary-net-gross.html'
  }
];