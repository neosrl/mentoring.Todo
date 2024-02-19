const dateFormat = (createdAt: string) => {
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(createdAt));
};

export default dateFormat;

// https://velog.io/@jntantmsemt/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%82%A0%EC%A7%9C-%ED%98%95%EC%8B%9D-%EB%B3%80%ED%99%98-new-Intl.DateTimeFormat-feat.supabase
