import { Timestamp as FirestoreTimestamp } from "@firebase/firestore";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const formatTimestamp = (timestamp: FirestoreTimestamp) => {
  return timestamp.toDate().toLocaleDateString();
};

export { formatDate, formatTimestamp };
