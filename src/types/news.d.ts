interface RecentNews {
  newsId: number;
  regionList: string[];
  climateList: string[];
  newsTitle: string;
}

interface News {
  climateList: string[];
  regionList: string[];
  newsTitle: string;
  newsUrl: string;
  newsImageUrl: string;
  newsBody: string;
  newsDate: string;
}
