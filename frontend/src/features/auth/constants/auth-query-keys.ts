export enum AuthQueryKey {
  Me = 'auth-me',
}

export const authQueryKeys = {
  all: ['auth'] as const,
  me: () => [...authQueryKeys.all, AuthQueryKey.Me] as const,
};
