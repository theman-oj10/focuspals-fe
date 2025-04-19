export type ContentType =
  | 'text'
  | 'diagram'
  | 'flipCard'
  | 'video'
  | 'audio'
  | 'quiz'
  | 'miniGame';

export interface ContentUpdate {
  id: string;
  type: ContentType;
  data: any;
}
