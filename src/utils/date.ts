import locale from "date-fns/locale/en-US";
import { formatDistanceToNow } from "date-fns";

export const timeAgo = (
  d: number,
  opts: { short: boolean } = { short: true }
) => {
  return formatDistanceToNow(d, {
    addSuffix: !opts.short,
    locale: {
      ...locale,
      formatDistance: opts.short ? formatDistance : locale.formatDistance,
    },
  });
};
const formatDistance = (token: string, count: string) =>
  formatDistanceLocale[token as keyof typeof formatDistanceLocale].replace(
    "{{count}}",
    count
  );

const formatDistanceLocale = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};
