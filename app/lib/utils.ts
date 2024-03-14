import { SetStateAction } from 'react';
import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).replace("R", "T");
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'pt-BR',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function formatPhoneNumber(phoneNumber: string | number) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  var match = cleaned.match(/(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return "";
}

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

const generateFirstSaturday = () => {
  const atualYear = new Date().getFullYear();
  let firstDayOnYear = new Date(`01/01/${atualYear}`)
  const dayName = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");

  let isSaturday = 0
  while (isSaturday < 1) {
    const otherDate = new Date(firstDayOnYear);
    otherDate.setDate(firstDayOnYear.getDate() + 1);
    firstDayOnYear = otherDate;

    if (dayName[firstDayOnYear.getDay()] === 'sábado') {
      isSaturday = 1;
    }
  }
  return firstDayOnYear;
}

export const generateSaturdays = () => {
  const dayName = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");

  let firstSaturday = generateFirstSaturday()
  const saturdays = [formatDateToLocal(firstSaturday.toDateString())]

  while (firstSaturday < new Date(`12/01/${firstSaturday.getFullYear()}`)) {
    const otherDate = new Date(firstSaturday);
    otherDate.setDate(firstSaturday.getDate() + 7);
    firstSaturday = otherDate;
    if (dayName[firstSaturday.getDay()] === 'sábado') {
      saturdays.push(formatDateToLocal(firstSaturday.toDateString()))
    }
  }

  return saturdays;
}