

export const getPagination = (page: string, size: string): { limit: number, offset: number } => {

  const limit = size ? Number(size) : 5;
  const offset = Number(page) * limit
  return {
    limit,
    offset
  }

}