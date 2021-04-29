import { Schedule } from './schedule.model';

export interface Movie {
  id: number;
  title: string;
  category: string;
  categoryId: number;
  summary: string;
  releasedDate: string;
  imgSrc: string;
  videoYoutube: string;
  schedules?: Schedule[];
  schedulesGroups?: Schedule[][];
}
