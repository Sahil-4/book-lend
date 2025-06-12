export const formatTime = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  const now = new Date();

  // Set hours, minutes, seconds, and milliseconds to 0 for accurate date comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  const messageDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate(),
  );

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  };

  if (messageDay.getTime() === today.getTime()) {
    // Today
    return `Today at ${messageDate.toLocaleTimeString("en-US", timeOptions)}`;
  } else if (messageDay.getTime() === yesterday.getTime()) {
    // Yesterday
    return `Yesterday at ${messageDate.toLocaleTimeString("en-US", timeOptions)}`;
  } else {
    // Other dates: e.g., "Mar 15, 2024 at 10:30 AM"
    const fullDateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return messageDate.toLocaleString("en-US", fullDateOptions);
  }
};
