interface sourceType{
  id: null;
  name: string
}

export interface ApiDataEverything{
  author: string;
  content: null;
  description: null;
  publishedAt: string;
  source: sourceType;
  title: string;
  url: string;
  urlToImage: string;
  map?: null
}