interface ListModel<T> {
  /// Total row of the list on the database.
  count: number;

  /// A URL to get more data from the server.
  next?: string | null;

  /// List data with custom model.
  results: T[];

  /// Add parameters when searching or filtering.
  params?: { [key: string]: any } | null;

  /// Waiting for server.
  isLoading?: boolean | null;

  /// Loading more data from the server.
  isLoadingMore?: boolean | null;

  /// Refreshing from the server.
  isRefreshing?: boolean | null;

  /// Error message from the server.
  errorMessage?: string | null;
}

export default ListModel;
