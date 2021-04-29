/* Cinema */

interface Movie {
  id: number;
  title: string;
  category: string;
  categoryId: number;
  summary: string;
  releasedDate: string;
  imgSrc: string;
  videoYoutube: string;
  schedulesIds?: number[];
}

interface Theater {
  id: number;
  title: string;
  address: string;
  logoSrc: string;
  schedulesIds?: number[];
}

interface Category {
  id: number;
  title: string;
}

interface Schedule {
  id: number;
  hour: string;
  movieId: number;
  theaterId: number;
  movie?: Movie | null;
  theater?: Theater | null;
}

interface Reservation {
  movieTitle: string;
  theaterTitle: string;
  scheduleId: number;
  scheduleHour: string;
}

interface Slide {
  id: number;
  movieId: number;
  imgSrc: string;
  imgSrcFull: string;
  imgAlt: string;
}

interface MovieWithSchedules extends Movie {
  schedules?: Schedules[];
}

interface TheaterWithSchedules extends Theater {
  schedules?: Schedules[];
}

/* Account */

interface User {
  id: number;
  email: string;
  hash: string;
}

interface UserInput {
  email: string;
  password: string | { password1: string, password2: string };
}

interface LoginResponse {
  token: string;
  email: string;
}

/* General */

interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    code?: number;
    errors?: string[];
  };
}
