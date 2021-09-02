function reverseStr(str) {
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  const reversedString = reverseStr(str);
  return str === reversedString;
}

function convertDateToStr(date) {
  const dateStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  if (date.year < 10) {
    dateStr.year = '0' + date.year;
  } else {
    dateStr.year = date.year.toString();
  }
  return dateStr;
}

function getAllDateFormats(date) {
  const dateAsStr = convertDateToStr(date);

  const ddmmyyyy = dateAsStr.day + dateAsStr.month + dateAsStr.year;
  const mmddyyyy = dateAsStr.month + dateAsStr.day + dateAsStr.year;
  const yyyymmdd = dateAsStr.year + dateAsStr.month + dateAsStr.day;
  const ddmmyy = dateAsStr.day + dateAsStr.month + dateAsStr.year.slice(-2);
  const mmddyy = dateAsStr.month + dateAsStr.day + dateAsStr.year.slice(-2);
  const yymmdd = dateAsStr.year.slice(-2) + dateAsStr.month + dateAsStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  const listOfPalindromes = getAllDateFormats(date);

  let isPalindromeCheck = false;

  for (let palindrome of listOfPalindromes) {
    if (isPalindrome(palindrome)) {
      isPalindromeCheck = true;
      break;
    }
  }
  return isPalindromeCheck;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 4 === 0) return true;
  if (year % 100 === 0) return false;
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let ctr = 0;
  let nextDate = getNextDate(date);

  while (1) {
    ctr++;
    const checkPal = checkPalindromeForAllFormats(nextDate);
    if (checkPal) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate];
}

const dateInput = document.querySelector('#birth-date');
const checkBtn = document.querySelector('#check-btn');
const outputEl = document.querySelector('#output-section');

function clickHandler() {
  var bdayStr = dateInput.value;

  if (bdayStr !== '') {
    const listOfBday = bdayStr.split('-');

    const date = {
      day: Number(listOfBday[2]),
      month: Number(listOfBday[1]),
      year: Number(listOfBday[0]),
    };
    
    const resultPalindrome = checkPalindromeForAllFormats(date);

    if(resultPalindrome){
      outputEl.innerText = 'Your birthday is a palindrome!🔥🚀'
    }
    else{
      const [count, nextDate] = getNextPalindromeDate(date);
      outputEl.innerText = `You missed it by ${count} days. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}😔`;
    }
  }
}

checkBtn.addEventListener('click', clickHandler);
