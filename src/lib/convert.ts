import { Timestamp as FirestoreTimestamp } from "@firebase/firestore";

const formatTimestamp = (timestamp: FirestoreTimestamp) => {
  return timestamp.toDate().toLocaleDateString();
};

export { formatTimestamp };
