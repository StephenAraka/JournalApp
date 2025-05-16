import backArrow from "@/assets/icons/back-arrow.png";
import checkmark from "@/assets/icons/check.png";
import chevronLeft from "@/assets/icons/chevron-left.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import plus from "@/assets/icons/plus.png";
import profile from "@/assets/icons/profile.png";
import check from "@/assets/images/check.png";
import anxious from "@/assets/images/moods/anxious.png";
import calm from "@/assets/images/moods/calm.png";
import happy from "@/assets/images/moods/happy.png";
import sad from "@/assets/images/moods/sad.png";
import noResult from "@/assets/images/no-result.png";

export const images = {
  check,
  noResult,
};

export const moods = [
  happy,
  sad,
  anxious,
  calm,
];

export const icons = {
  backArrow,
  checkmark,
  chevronLeft,
  email,
  eyecross,
  google,
  home,
  list,
  plus,
  profile,
};

export const onboarding = [
  {
    id: 1,
    title: "The perfect ride is just a tap away!",
    description:
      "Your journey begins with Ryde. Find your ideal ride effortlessly.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Best car in your hands with Ryde",
    description:
      "Discover the convenience of finding your perfect ride with Ryde",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Your ride, your way. Let's go!",
    description:
      "Enter your destination, sit back, and let us take care of the rest.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};
