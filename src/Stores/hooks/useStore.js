import { useObserver } from "mobx-react";

import Store from "../rootStore";

export const useStore = () => Store;

export const useIsAuthorized = () => {
  const store = useStore();

  return useObserver(() => store.userStore.isAuthorized);
};

export const useIsUserLoading = () => {
  const store = useStore();

  return useObserver(() => store.userStore.loading);
};
