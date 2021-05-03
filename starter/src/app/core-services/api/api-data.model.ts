export interface ApiData<DataType> {
  data: DataType;
  error?: {
    message: string;
  };
}
