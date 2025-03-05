import { baseConst } from '@utils/constants/base_const';
import { DateTime, Duration, DurationUnits } from 'luxon';

class Common {
  formats;
  constructor(format = baseConst.formatsUS) {
    this.formats = format;
  }

  /**
   * @public
   * @description Get the current date in ISO format
   * @returns {String} Current date in ISO format (e.g., 2022-01-21T15:57:18+02:00)
   */
  getCurrentDate() {
    return DateTime.now().toISO();
  }

  /**
   * @public
   * @description Convert a date to the specified format
   * @param {Object} options - Formatting options
   * @param {String|Date} options.date - Date to be formatted
   * @param {String} options.inputFormat - Initial date format
   * @param {String} options.outputFormat - Desired output format
   * @param {String} options.locales - Locale (e.g., "en-US", "en-GB")
   * @param {String} options.timeZone - Time zone (e.g., "America/New_York")
   * @returns {String} Formatted date
   */
  getFormattedDate({
    date = DateTime.now().toISO(),
    inputFormat,
    outputFormat,
    locales = 'en-US',
    timeZone,
  }: {
    date?: string | Date;
    inputFormat?: string;
    outputFormat: string;
    locales?: string;
    timeZone?: string;
  }): string {
    const dt = DateTime.fromISO(date.toString(), { zone: timeZone }) || DateTime.fromFormat(date.toString(), inputFormat, { zone: timeZone });
    return dt.setLocale(locales).toFormat(outputFormat);
  }

  /**
   * @public
   * @description Get the time difference between two dates
   * @param {Object} options - Options for calculating the difference
   * @param {String|Date} options.startDate - Start date
   * @param {String|Date} options.endDate - End date
   * @param {String} options.dateFormat - Date format
   * @param {String} options.measure - Unit of measurement ("seconds", "minutes", "hours", "days", "weeks", "months", "years")
   * @returns {Duration} Time difference in the specified unit
   */
  getTimeDifference(options: { startDate: string | Date; endDate: string | Date; dateFormat: string; measure: DurationUnits }): Duration {
    const { startDate, endDate, dateFormat, measure = 'minutes' } = options;
    const validMeasures: DurationUnits[] = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];

    // Validate measure input
    if (!validMeasures.includes(measure)) {
      throw new Error(`Measure should be selected from: ${validMeasures.join(', ')}`);
    }

    // Convert start and end dates to DateTime objects
    const start = startDate instanceof Date ? DateTime.fromJSDate(startDate) : DateTime.fromFormat(startDate, dateFormat);
    const end = endDate instanceof Date ? DateTime.fromJSDate(endDate) : DateTime.fromFormat(endDate, dateFormat);

    // Calculate the difference and return the result in the specified measure
    const difference = end.diff(start, measure);
    return difference;
  }

  /**
   * @public
   * @description Add a specified amount of time to a date
   * @param {String|Date} date - Initial date
   * @param {number} value - Number of units to add
   * @param {String} measure - Unit of measurement (e.g., "days", "hours")
   * @returns {String} Updated date in ISO format
   */
  addTime(date: string, value: number, measure: string) {
    return DateTime.fromISO(date)
      .plus({ [measure]: value })
      .toISO();
  }

  /**
   * @public
   * @description Subtract a specified amount of time from a date
   * @param {String} date - Initial date
   * @param {number} value - Number of units to subtract
   * @param {String} measure - Unit of measurement ('seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years')
   * @returns {String} Updated date in ISO format
   */
  subtractTime(date: string, value: number, measure: string) {
    const measureList = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
    if (!measureList.includes(measure)) {
      throw new Error(`Measure should be selected from: ${measureList.join(', ')}`);
    }
    return DateTime.fromISO(date)
      .minus({ [measure]: value })
      .toISO();
  }

  /**
   * @public
   * @description Get the weekday of a given date
   * @param {String|Date} date - Date to analyze
   * @returns {String} Name of the weekday (e.g., "Monday")
   */
  getWeekday(date = DateTime.now().toISO()) {
    return DateTime.fromISO(date).toFormat('cccc');
  }

  /**
   * @public
   * @description Get the current time in seconds
   * @param {number} timeInMsec - Time in milliseconds (default is the current date)
   * @returns {number} Time in seconds
   */
  getTimeInSeconds(timeInMsec = Date.now()) {
    return Math.round(timeInMsec / 1000);
  }

  /**
   * @public
   * @description Convert a date string to Unix seconds
   * @param {string} timeAsString - Date in ISO string format
   * @returns {number} Time in Unix seconds
   */
  convertTimeStringToSeconds(timeAsString: string) {
    return DateTime.fromISO(timeAsString).toSeconds();
  }

  /**
   * @public
   * @description Convert a time string to minutes
   * @param {string} timeAsString - Time in format "hh:mm a"
   * @returns {number} Time in minutes
   */
  convertTimeStringToMinutes(timeAsString: string) {
    return Math.floor(DateTime.fromFormat(timeAsString, 'hh:mm a').toMillis() / 60000);
  }

  /**
   * @public
   * @description Get the current time in minutes
   * @param {number} dateInMsec - Time in milliseconds (default is the current date)
   * @returns {number} Time in minutes
   */
  getTimeInMinutes(dateInMsec = Date.now()) {
    return Math.floor(dateInMsec / 60000);
  }
}

export default Common;
