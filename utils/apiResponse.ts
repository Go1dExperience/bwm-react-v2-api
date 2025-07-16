export interface ApiResponse<T = any> {
  data: T | null;
  errorCode: number | null;
  message: string | undefined;
}
export const createSuccessResponse = <T>(
  data: T,
  message?: string
): ApiResponse<T> => {
  return {
    data,
    errorCode: null,
    message,
  };
};
export const createErrorResponse = (
	errorCode: number,
	message: string
): ApiResponse<null> => {
	return {
		data: null,
		errorCode,
		message,
	};
};
