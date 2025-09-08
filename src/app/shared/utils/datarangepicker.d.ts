import * as moment from 'moment';

declare module 'jquery' {
  interface DateRangePickerOptions {
    opens?: string;
  }

  type DateRangePickerCallback = (
    start: moment.Moment,
    end: moment.Moment,
    label: string
  ) => void;

  interface JQuery {
    daterangepicker(
      options?: DateRangePickerOptions,
      callback?: DateRangePickerCallback
    ): JQuery;
  }
}