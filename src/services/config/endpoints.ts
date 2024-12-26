export const API_ENDPOINTS = {
  /**
   * NOTE: Controller 하나 당 하나의 객체를 만들고, 그 객체 안에 API 경로를 함수로 정의한다.
   */
  PET: {
    "": "/pet",
    FIND_BY_STATUS: "/pet/findByStatus",
    PET_ID: (petId: number) => `/pet/${petId}`,
    UPLOAD_IMAGE: (petId: number) => `/pet/${petId}/uploadImage`,
  },

  STORE: {
    INVENTORY: "/store/inventory",
    ORDER: "/store/order",
    ORDER_ORDERID: (orderId: number) => `/store/order/${orderId}`,
  },

  USER: {
    "": "/user",
    CREATE_WITH_ARRAY: "/user/createWithArray",
    CREATE_WITH_LIST: "/user/createWithList",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    USERNAME: (username: string) => `/user/${username}`,
  },
} as const;

export type APIEndPoint = typeof API_ENDPOINTS;
