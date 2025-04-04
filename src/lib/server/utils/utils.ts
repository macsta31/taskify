export const utils = {
  tryCatch: async <T, I, E = Error>(
    callback: (...args: I[]) => Promise<T>,
    ...args: I[]
  ): Promise<[T | null, E | null]> => {
    try {
      const response = await callback(...args);
      return [response, null];
    } catch (err) {
      return [null, err as E];
    }
  },
};

export type Response<T, E = Error> = {
    data: T,
    error: E
}
