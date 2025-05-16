import { moods } from "@/constants";

export const getCoverImage = (mood: string) => {
    switch (mood) {
      case 'Happy':
        return moods[0];
      case 'Sad':
        return moods[1];
      case 'Calm':
        return moods[3];
      case 'Anxious':
        return moods[2];
      default:
        return moods[0];
    }
  };

  export function formatReadableDate(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

