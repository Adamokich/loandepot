export const PHONE_NUMBER_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export const CITY_SELECT_OPTIONS = [
  {
    label: "City",
    value: "City",
    disabled: true,
  },
  {
    label: "NewYork",
    value: "NewYork",
    disabled: false,
  },
  {
    label: "Moscow",
    value: "Moscow",
    disabled: false,
  },
  {
    label: "Liverpool",
    value: "Liverpool",
    disabled: false,
  },
] as const;

export const MUTABLE_CITY_SELECT_OPTIONS = [
  {
    label: "City",
    value: "City",
    disabled: true,
  },
  {
    label: "NewYork",
    value: "NewYork",
    disabled: false,
  },
  {
    label: "Moscow",
    value: "Moscow",
    disabled: false,
  },
  {
    label: "Liverpool",
    value: "Liverpool",
    disabled: false,
  },
];
